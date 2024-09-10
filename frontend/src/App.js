import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Menu from "./components/Navbar";
import NotFound from "./components/NotFound.js";
import LaboratoryList from "./components/LaboratoryList.js";
import LaboratoryForm from "./components/LaboratoryForm.js";
import ComputerForm from "./components/ComputerForm.js";
import ComputersList from "./components/ComputerList.js";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<LaboratoryList />} />
          <Route path="/laboratory/new" element={<LaboratoryForm />} />
          <Route path="/laboratory/:id/edit" element={<LaboratoryForm />} />
          <Route path="/computer/new" element={<ComputerForm />} />
          <Route path="/computer/view" element={<ComputersList />} />
          <Route path="/computer/:id/edit" element={<ComputerForm />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Ruta para manejar errores */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
