// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SubmittedApplications from "./pages/SubmittedApplications";
import ProjectApplications from "./pages/ProjectApplications";
import CreateProject from "./pages/CreateProject";
import Projects from "./pages/Projects";
import ManageProjects from "./pages/ManageProjects";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/submitted-applications"
          element={<SubmittedApplications />}
        />
        <Route path="/project-applications" element={<ProjectApplications />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/manage-projects" element={<ManageProjects />} />
      </Routes>
    </Router>
  );
};

export default App;
