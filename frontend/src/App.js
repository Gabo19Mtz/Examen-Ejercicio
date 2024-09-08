import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container } from "@mui/material";
import Menu from "./components/Navbar";
import NotFound from "./components/NotFound.js";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/project/new" element={<ProjectForm />} />
          <Route path="/project/:id/edit" element={<ProjectForm />} />
          <Route path="/task/new" element={<TaskForm />} />
          <Route path="/task/view" element={<TaskList />} />
          <Route path="/task/:id/edit" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Ruta para manejar errores */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
