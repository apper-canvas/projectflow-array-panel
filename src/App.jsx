import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Clients from "@/components/pages/Clients";
import ClientDetail from "@/components/pages/ClientDetail";
import Projects from "@/components/pages/Projects";
import Tasks from "@/components/pages/Tasks";
import Invoices from "@/components/pages/Invoices";
function App() {
  return (
    <Routes>
<Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<ClientDetail />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  );
}

export default App;