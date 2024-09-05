import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Inicio
              </Link>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => navigate("/project/new")}
            >
              Nuevo Proyecto
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
              onClick={() => navigate("/task/new")}
            >
              Nueva Tarea
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#d6cfcf", color: "#000" }}
              onClick={() => navigate("/task/view")}
            >
              Ver Tareas
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "greenyellow", color: "#000", ml: 2 }}
              onClick={() => navigate("task/view")}
            >
              Ver tareas de proyectos
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
