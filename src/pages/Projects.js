import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    const project = projects.find((p) => p.id == selectedProjectId);
    setSelectedProject(project);
  }, [selectedProjectId, projects]);

  const handleProjectChange = (event) => {
    setSelectedProjectId(event.target.value);
    setShowForm(false);
  };

  const handleShowForm = () => {
    if (selectedProjectId) {
      setShowForm(true);
    } else {
      alert("Выберите проект для подачи заявки!");
    }
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();

    if (!selectedProjectId || !studentName || !course) return;

    const newApplication = {
      id: Date.now(),
      studentName,
      course,
      status: "Applied",
      submissionDate: new Date(),
    };

    const updatedProjects = projects.map((project) =>
      project.id == selectedProjectId
        ? {
            ...project,
            applications: [...project.applications, newApplication],
          }
        : project
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);

    setStudentName("");
    setCourse("");
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Проекты</h1>
      <div className="mb-3">
        <select
          onChange={handleProjectChange}
          value={selectedProjectId}
          className="form-select"
        >
          <option value="">Выберите проект</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleShowForm}
        className="btn btn-primary mt-2"
        disabled={selectedProject ? !selectedProject.selfEnroll : true}
      >
        Записаться
      </button>

      {showForm && (
        <form onSubmit={handleSubmitApplication} className="mt-3">
          <div className="mb-3">
            <label className="form-label">ФИО студента:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Курс:</label>
            <input
              type="number"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Отправить заявку
          </button>
        </form>
      )}
    </div>
  );
};

export default Projects;
