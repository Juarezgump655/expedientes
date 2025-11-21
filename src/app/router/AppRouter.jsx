import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Expedientes from "../pages/Expedientes.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Reportes from "../pages/Reportes.jsx";
import ExpedientesRev from "../pages/ExpedientesRev.jsx";
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="expedientes" element={<Expedientes />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="rev-reportes" element={<ExpedientesRev />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
