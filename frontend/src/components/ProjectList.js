import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const loadProjects = async () => {
    const response = await fetch("http://localhost:5000/projects");
    const data = await response.json();
    setProjects(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/projects/${id}`, {
        method: "DELETE",
      });

      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <h1>Proyectos</h1>
      {projects.map((project) => (
        <Card
          style={{
            marginBottom: ".7rem",
          }}
          key={project.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>{project.name}</Typography>
              <Typography>{project.priority}</Typography>
              <Typography>{project.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/project/${project.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(project.id)}
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
