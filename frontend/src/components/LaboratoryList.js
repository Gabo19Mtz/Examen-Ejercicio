import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LaboratoryList() {
  const [laboratories, setLaboratories] = useState([]);
  const navigate = useNavigate();

  const loadLaboratories = async () => {
    const response = await fetch("http://localhost:5000/laboratory");
    const data = await response.json();
    setLaboratories(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/laboratory/${id}`, {
        method: "DELETE",
      });

      setLaboratories(
        laboratories.filter((laboratory) => laboratory.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadLaboratories();
  }, []);

  return (
    <>
      <h1>Laboratorios</h1>
      {laboratories.map((laboratory) => (
        <Card
          style={{
            marginBottom: ".7rem",
          }}
          key={laboratory.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>{laboratory.name}</Typography>
              <Typography>{laboratory.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/laboratory/${laboratory.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(laboratory.id)}
                style={{
                  marginLeft: ".5rem",
                }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
