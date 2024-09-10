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


export default function ComputerForm() {
  const [computer, setComputers] = useState({
    name: "",
    photo: "",
    laboratoriesId: "",
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [laboratories, setLaboratories] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchLaboratories = async () => {
      const res = await fetch("http://localhost:5000/laboratory");
      const data = await res.json();
      setLaboratories(data);
    };

    fetchLaboratories();

    if (params.id) {
      const fetchComputer = async () => {
        const res = await fetch(`http://localhost:5000/computers/${params.id}`);
        const data = await res.json();
        setComputers({
          name: data.name,
          laboratoriesId: data.laboratoriesId,
        });
        setEditing(true);
      };

      fetchComputer();
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (editing) {
        await fetch(`http://localhost:5000/computers/${params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(computer),
        });
      } else {
        await fetch("http://localhost:5000/computers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(computer),
        });
      }

      navigate("/computer/view");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setComputers({ ...computer, [e.target.name]: e.target.value });

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
            {editing ? "Editar Computador" : "Crear Computador"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Ingresa el nombre del computador"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="name"
                value={computer.name}
                onChange={handleChange}
              />
              <TextField
                label="Ingresa una url"
                variant="filled"
                sx={{ display: "block", margin: ".5rem 0" }}
                name="photo"
                value={computer.photo}
                onChange={handleChange}
              ></TextField>

              <FormControl fullWidth sx={{ margin: ".5rem 0" }}>
                <InputLabel id="project-label">
                  Selecciona un laboratorio
                </InputLabel>
                <Select
                  labelId="project-label"
                  name="laboratoriesId"
                  value={computer.laboratoriesId}
                  onChange={handleChange}
                  label="Selecciona un laboratorio"
                >
                  {laboratories.map((laboratory) => (
                    <MenuItem key={laboratory.id} value={laboratory.id}>
                      {laboratory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={
                  !computer.name || !computer.photo || !computer.laboratoriesId
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
