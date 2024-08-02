import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectApplications = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
  const [sortOption, setSortOption] = useState("studentName");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    console.log("Fetching projects from localStorage...");
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    console.log("Stored projects:", storedProjects);
    setProjects(storedProjects);
  }, []);

  useEffect(() => {
    console.log("Selected project:", selectedProject);
    if (selectedProject) {
      const project = projects.find((p) => p.id == selectedProject.id);
      setSelectedProject(project);
    }
  }, [projects, selectedProject]);

  const handleProjectChange = (event) => {
    console.log("Project selected:", event.target.value);
    const projectId = event.target.value;
    const project = projects.find((p) => p.id == projectId);
    setSelectedProject(project);
  };

  const handleStatusChange = (event) => {
    console.log("Status filter changed:", event.target.value);
    setSelectedStatusFilter(event.target.value);
  };

  const handleCourseChange = (event) => {
    console.log("Course filter changed:", event.target.value);
    setSelectedCourseFilter(event.target.value);
  };

  const handleSortOptionChange = (event) => {
    console.log("Sort option changed:", event.target.value);
    setSortOption(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    console.log("Sort order changed:", event.target.value);
    setSortOrder(event.target.value);
  };

  const handleApproveApplication = (appId) => {
    if (!selectedProject) return;
    console.log("Approving application with ID:", appId);

    const updatedProjects = projects.map((project) =>
      project.id == selectedProject.id
        ? {
            ...project,
            applications: project.applications.map((app) =>
              app.id == appId ? { ...app, status: "Approved" } : app
            ),
          }
        : project
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    const updatedSelectedProject = updatedProjects.find(
      (p) => p.id == selectedProject.id
    );
    setSelectedProject(updatedSelectedProject);
    setProjects(updatedProjects);
  };

  const handleRejectApplication = (appId) => {
    if (!selectedProject) return;
    console.log("Rejecting application with ID:", appId);

    const updatedProjects = projects.map((project) =>
      project.id == selectedProject.id
        ? {
            ...project,
            applications: project.applications.map((app) =>
              app.id == appId ? { ...app, status: "Rejected" } : app
            ),
          }
        : project
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    const updatedSelectedProject = updatedProjects.find(
      (p) => p.id == selectedProject.id
    );
    setSelectedProject(updatedSelectedProject);
    setProjects(updatedProjects);
  };

  const getFilteredAndSortedApplications = () => {
    if (!selectedProject) return [];

    let filteredApplications = selectedProject.applications.filter((app) => {
      return (
        (selectedStatusFilter === "all" ||
          app.status === selectedStatusFilter) &&
        (selectedCourseFilter === "" || app.course === selectedCourseFilter)
      );
    });

    filteredApplications.sort((a, b) => {
      if (sortOption === "studentName") {
        return sortOrder === "asc"
          ? a.studentName.localeCompare(b.studentName)
          : b.studentName.localeCompare(a.studentName);
      } else if (sortOption === "course") {
        return sortOrder === "asc"
          ? a.course.localeCompare(b.course)
          : b.course.localeCompare(a.course);
      }
      return 0;
    });

    return filteredApplications;
  };

  const uniqueCourses = [
    ...new Set(projects.flatMap((p) => p.applications.map((a) => a.course))),
  ];
  uniqueCourses.sort((a, b) => a.localeCompare(b));

  const getBadgeClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-success"; // Зеленый
      case "Rejected":
        return "bg-danger"; // Красный
      case "Applied":
        return "bg-warning"; // Желтый
      default:
        return "bg-secondary"; // Серый по умолчанию
    }
  };

  return (
    <div className="container mt-4">
      <h1>Лист поданных заявок на проект</h1>

      <div className="mb-4">
        <select
          className="form-select mb-2"
          onChange={handleProjectChange}
          value={selectedProject?.id || ""}
        >
          <option value="">Выберите проект</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        {selectedProject && (
          <>
            <div className="mb-3">
              <label className="form-label">
                Фильтрация по статусу заявки:
              </label>
              <select
                className="form-select mb-2"
                onChange={handleStatusChange}
                value={selectedStatusFilter}
              >
                <option value="all">Все</option>
                <option value="Applied">Подана</option>
                <option value="Approved">Одобрена</option>
                <option value="Rejected">Отклонена</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Фильтрация по курсу:</label>
              <select
                className="form-select mb-2"
                onChange={handleCourseChange}
                value={selectedCourseFilter}
              >
                <option value="">Все курсы</option>
                {uniqueCourses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Сортировка по:</label>
              <select
                className="form-select mb-2"
                onChange={handleSortOptionChange}
                value={sortOption}
              >
                <option value="studentName">ФИО студента</option>
                <option value="course">Курс</option>
              </select>

              <label className="form-label">Порядок:</label>
              <select
                className="form-select mb-2"
                onChange={handleSortOrderChange}
                value={sortOrder}
              >
                <option value="asc">Возрастание</option>
                <option value="desc">Убывание</option>
              </select>
            </div>

            <ul className="list-group">
              {getFilteredAndSortedApplications().map((app) => (
                <li
                  key={app.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {app.studentName} - Курс {app.course} -
                  <span
                    className={`badge rounded-pill ${getBadgeClass(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                  <div>
                    {app.status === "Applied" && (
                      <>
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleApproveApplication(app.id)}
                        >
                          Одобрить
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRejectApplication(app.id)}
                        >
                          Отклонить
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectApplications;
