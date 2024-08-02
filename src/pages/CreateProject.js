import React, { useState } from "react";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [selfEnroll, setSelfEnroll] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProject = { id: Date.now(), name, selfEnroll, applications: [] };
    const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
    localStorage.setItem(
      "projects",
      JSON.stringify([...existingProjects, newProject])
    );
    setName("");
    setSelfEnroll(false);
  };

  return (
    <div className="container mt-4">
      <h1>Создание проекта</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Название проекта:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="selfEnroll"
            className="form-check-input"
            checked={selfEnroll}
            onChange={(e) => setSelfEnroll(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="selfEnroll">
            Разрешить самостоятельную запись
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Создать проект
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
