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

export default function LaboratoryForm() {
  const [laboratory, setLaboratory] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(""); // Add state for error handling

  const navigate = useNavigate();
  const params = useParams();

  const API_URL = "http://localhost:5000/laboratory";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    try {
      const url = editing ? `${API_URL}/${params.id}` : API_URL;
      const method = editing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(laboratory),
      });

      if (!response.ok) {
        throw new Error("Failed to save laboratory");
      }

      navigate("/");
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const loadLaboratory = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Error loading laboratory");

      const data = await res.json();
      setLaboratory({
        name: data.name,
        description: data.description,
      });
      setEditing(true);
    } catch (error) {
      setError(error.message); // Set error message
      console.error("Error loading laboratory:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaboratory({
      ...laboratory,
      [name]: value,
    });
  };

  useEffect(() => {
    if (params.id) {
      loadLaboratory(params.id);
    }
  }, [params.id]);

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid2 item xs={12} sm={8} md={6} lg={4}>
        <Card
          sx={{ mt: 5, bgcolor: "#1e272e", p: 2 }} // Using sx for styling
        >
          <Typography variant="h5" textAlign="center" color="white">
            {editing ? "Editar laboratorio" : "Crear laboratorio"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Ingresa el nombre del laboratorio"
                sx={{ display: "block", mb: 1 }}
                name="name"
                value={laboratory.name}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Ingresa la descripcion"
                multiline
                rows={4}
                sx={{ display: "block", mb: 1 }}
                name="description"
                value={laboratory.description}
                onChange={handleChange}
              />
              {error && (
                <Typography color="error" align="center" mb={1}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!laboratory.name || !laboratory.description}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
