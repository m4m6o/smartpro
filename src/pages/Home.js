import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Добро пожаловать в систему управления проектами</h1>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Подача заявки</h5>
              <p className="card-text">
                Здесь вы можете подать заявку на участие в проекте. Выберите
                проект, укажите свои данные и отправьте заявку.
              </p>
              <a href="/projects" className="btn btn-primary">
                Перейти к подаче заявки
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Просмотр заявок студента</h5>
              <p className="card-text">
                Здесь вы можете просмотреть поданные заявки. Выберите студента,
                чтобы увидеть все его заявки.
              </p>
              <a href="/submitted-applications" className="btn btn-primary">
                Перейти к заявкам студента
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Просмотр заявок по проектам</h5>
              <p className="card-text">
                Здесь вы можете просмотреть все заявки по проектам. Выберите
                проект, чтобы увидеть заявки на него.
              </p>
              <a href="/project-applications" className="btn btn-primary">
                Перейти к заявкам по проектам
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Управление проектами</h5>
              <p className="card-text">
                Здесь вы можете управлять проектами: добавлять новые,
                редактировать или удалять существующие.
              </p>
              <a href="/manage-projects" className="btn btn-primary">
                Перейти к управлению проектами
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
