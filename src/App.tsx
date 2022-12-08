import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./pages/layout/layout";
import Home from "./pages/home/home";
import Experience from "./pages/experience/experience";
import Projects from "./pages/projects/projects";
import Contact from "./pages/contact/contact";
import Admin from "./pages/admin/admin";
import Login from "./pages/admin/login/login";
import ManageProject from "./pages/admin/manage_project/manage_project";
import ManageExperience from "./pages/admin/manage_experience/manage_experience";
import NotFound from "./pages/notfound/notfound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<Experience />} path="/experience" />
          <Route element={<Projects />} path="/projects" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<Login />} path="/admin/login" />
          <Route element={<ManageProject />} path="/admin/manage-project" />
          <Route element={<ManageProject />} path="/admin/manage-project/:id" />
          <Route element={<ManageExperience />} path="/admin/manage-experience" />
          <Route element={<ManageExperience />} path="/admin/manage-experience/:id" />
          <Route element={<NotFound />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
