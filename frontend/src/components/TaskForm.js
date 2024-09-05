import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {
  const [task, setTask] = useState({
    name: "",
    projectId: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:5000/projects");
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();

    if (params.id) {
      const fetchTask = async () => {
        const res = await fetch(`http://localhost:5000/tasks/${params.id}`);
        const data = await res.json();
        setTask({
          name: data.name,
          projectId: data.projectId,
        });
        setEditing(true);
      };

      fetchTask();
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (editing) {
        await fetch(`http://localhost:5000/tasks/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
      } else {
        await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });
      }

      navigate("/task/view");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid2 item xs={3}>
        <Card
          sx={{ mt: 5 }}
          style={{
            backgroundColor: "#1e272e",
            padding: "1rem",
          }}
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar Tarea" : "Crear Tarea"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Ingresa el nombre de la tarea"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="name"
                value={task.name}
                onChange={handleChange}
              />

              <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
                <InputLabel id="project-label">
                  Selecciona un proyecto
                </InputLabel>
                <Select
                  labelId="project-label"
                  name="projectId"
                  value={task.projectId}
                  onChange={handleChange}
                  label="Selecciona un proyecto"
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!task.name || !task.projectId}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
