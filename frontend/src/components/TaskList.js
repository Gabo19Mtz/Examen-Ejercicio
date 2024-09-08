import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState({});
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);

      // Agrupar tareas por projectId
      const groupedTasks = data.reduce((acc, task) => {
        const projectName = `Proyecto ${task.projectId}`;
        if (!acc[projectName]) {
          acc[projectName] = [];
        }
        acc[projectName].push(task);
        return acc;
      }, {});
      setProjects(groupedTasks);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  // Eliminar una tarea y actualizar el estado
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));

      // Re-agrupar tareas después de eliminar una
      const updatedTasks = tasks.filter((task) => task.id !== id);
      const groupedTasks = updatedTasks.reduce((acc, task) => {
        const projectName = `Proyecto ${task.projectId}`;
        if (!acc[projectName]) {
          acc[projectName] = [];
        }
        acc[projectName].push(task);
        return acc;
      }, {});
      setProjects(groupedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Tareas por Proyecto
      </Typography>
      {Object.keys(projects).map((projectName) => (
        <div key={projectName}>
          <Typography variant="h5" gutterBottom>
            {projectName}
          </Typography>
          {projects[projectName].map((task) => (
            <Card key={task.id} sx={{ mb: 2 }}>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <Typography variant="h6">{task.name}</Typography>
                  <Typography>
                    {task.done ? "Completada" : "Pendiente"}
                  </Typography>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/task/${task.id}/edit`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleDelete(task.id)}
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
