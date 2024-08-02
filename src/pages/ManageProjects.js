import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [editSelfEnroll, setEditSelfEnroll] = useState(true);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(storedProjects);
  }, []);

  const handleAddProject = () => {
    const updatedProjects = [
      ...projects,
      {
        id: Date.now(),
        name: newProjectName,
        selfEnroll: true,
        applications: [],
      },
    ];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setNewProjectName("");
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setEditProjectName(project.name);
    setEditSelfEnroll(project.selfEnroll);
  };

  const handleUpdateProject = () => {
    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id
        ? { ...project, name: editProjectName, selfEnroll: editSelfEnroll }
        : project
    );
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setEditingProject(null);
    setEditProjectName("");
    setEditSelfEnroll(true);
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Управление проектами</h1>

      <div className="mb-4">
        <h3>Добавить новый проект</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Название проекта"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={handleAddProject}
            disabled={!newProjectName}
          >
            Добавить проект
          </button>
        </div>
      </div>

      <div>
        <h3>Список проектов</h3>
        <ul className="list-group">
          {projects.map((project) => (
            <li
              key={project.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editingProject?.id === project.id ? (
                <div className="d-flex w-100">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={editProjectName}
                    onChange={(e) => setEditProjectName(e.target.value)}
                    placeholder="Название проекта"
                  />
                  <div className="form-check me-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={editSelfEnroll}
                      onChange={() => setEditSelfEnroll(!editSelfEnroll)}
                    />
                    <label className="form-check-label">
                      Можно записываться самостоятельно
                    </label>
                  </div>
                  <button
                    className="btn btn-success me-2"
                    onClick={handleUpdateProject}
                  >
                    Сохранить
                  </button>
                </div>
              ) : (
                <span>
                  {project.name} (
                  {project.selfEnroll
                    ? "Можно записываться"
                    : "Запись отключена"}
                  )
                </span>
              )}
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => handleEditProject(project)}
                >
                  Редактировать
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageProjects;
