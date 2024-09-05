import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    priority: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (editing) {
        await fetch(`http://localhost:5000/projects/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
      } else {
        await fetch("http://localhost:5000/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving project:", error);
      // Optionally, show a message to the user about the error
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const loadProject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      setProject({
        name: data.name,
        priority: data.priority,
        description: data.description,
      });
      setEditing(true);
    } catch (error) {
      console.error("Error loading project:", error);
      // Optionally, handle the error (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    if (params.id) {
      loadProject(params.id);
    }
  }, [params.id]);

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
            {editing ? "Editar proyecto" : "Crear proyecto"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Ingresa el nombre del proyecto"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="name"
                value={project.name}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Ingresa la prioridad"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="priority"
                value={project.priority}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Ingresa la descripción"
                multiline
                rows={4}
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                name="description"
                value={project.description}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !project.name || !project.priority || !project.description
                }
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
