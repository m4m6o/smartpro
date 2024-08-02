import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SubmittedApplications = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    const studentMap = {};
    storedProjects.forEach((project) => {
      project.applications.forEach((app) => {
        const key = `${app.studentName} - ${app.course}`;
        if (!studentMap[key]) {
          studentMap[key] = true;
        }
      });
    });

    setStudents(Object.keys(studentMap));
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      const [studentName, course] = selectedStudent.split(" - ");
      const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      const filtered = storedProjects.flatMap((project) =>
        project.applications
          .filter(
            (app) => app.studentName === studentName && app.course === course
          )
          .map((app) => ({
            ...app,
            projectName: project.name,
          }))
      );
      setFilteredApplications(filtered);
    } else {
      setFilteredApplications([]);
    }
  }, [selectedStudent]);

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
      <h1>Лист поданных заявок студентом</h1>
      <div className="mb-4">
        <select
          className="form-select"
          aria-label="Выберите студента"
          onChange={(e) => setSelectedStudent(e.target.value)}
          value={selectedStudent}
        >
          <option value="">Выберите студента</option>
          {students.map((student, index) => (
            <option key={index} value={student}>
              {student}
            </option>
          ))}
        </select>
      </div>
      {selectedStudent && filteredApplications.length === 0 && (
        <div className="alert alert-info" role="alert">
          Нет поданных заявок для выбранного студента.
        </div>
      )}
      {filteredApplications.length > 0 && (
        <ul className="list-group">
          {filteredApplications.map((app, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>Проект:</strong> {app.projectName || "Не указано"}
                <br />
                <strong>Статус:</strong>
                <span
                  className={`badge rounded-pill ${getBadgeClass(app.status)}`}
                >
                  {app.status}
                </span>
                <br />
                <strong>Дата отправки:</strong>{" "}
                {new Date(app.submissionDate).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubmittedApplications;
