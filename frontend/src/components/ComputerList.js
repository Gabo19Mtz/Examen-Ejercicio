import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ComputersList() {
  const [computers, setComputers] = useState([]);
  const [laboratories, setLaboratories] = useState({});
  const navigate = useNavigate();

  const loadComputers = async () => {
    try {
      const response = await fetch("http://localhost:5000/computers");
      if (!response.ok) throw new Error("Error al encontrar tares");
      const data = await response.json();
      setComputers(data);

      const groupedComputers = data.reduce((acc, computer) => {
        const laboratoryName = `Laboratorio ${computer.laboratoriesId}`;
        if (!acc[laboratoryName]) {
          acc[laboratoryName] = [];
        }
        acc[laboratoryName].push(computer);
        return acc;
      }, {});
      setLaboratories(groupedComputers);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/computers/${id}`, {
        method: "DELETE",
      });
      setComputers(computers.filter((computer) => computer.id !== id));

      const updatedComputers = computers.filter(
        (computer) => computer.id !== id
      );
      const groupedComputers = updatedComputers.reduce((acc, computer) => {
        const laboratoryName = `Laboratorio ${computer.laboratoriesId}`;
        if (!acc[laboratoryName]) {
          acc[laboratoryName] = [];
        }
        acc[laboratoryName].push(computer);
        return acc;
      }, {});
      setLaboratories(groupedComputers);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  useEffect(() => {
    loadComputers();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Computadores por laboratorio
      </Typography>
      {Object.keys(laboratories).map((laboratoryName) => (
        <div key={laboratoryName}>
          <Typography variant="h5" gutterBottom>
            {laboratoryName}
          </Typography>
          {laboratories[laboratoryName].map((computer) => (
            <Card key={computer.id} sx={{ mb: 2 }}>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Typography variant="h6">{computer.name}</Typography>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/computer/${computer.id}/edit`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(computer.id)}
                    sx={{ ml: 1 }}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </>
  );
}
