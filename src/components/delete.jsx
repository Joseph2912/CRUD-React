import React from "react";
import { useState } from "react";
import "../styles/styles.scss";
import Edit from "./update.jsx";

export const Crud = ({ items, setItem}) => {
  const [updateState, setUpdateState] = useState(-1);
  const [index, setIndex] = useState(0);
  const [mostrarAlerta3, setMostrarAlerta3] = useState(false);
  const idEdit = (id) => {
    setUpdateState(id);
  };

  const Delete = (id) => {
    let timeoutId;
    const nuevaList = items.filter((item) => item.id !== id);
    setMostrarAlerta3(true);
    timeoutId = setTimeout(() => {
      setMostrarAlerta3(false);
    }, 4000);
    const renuevaList = nuevaList.map((item, index) => ({
      ...item,
      id: index + 1,
    }));
    setItem(renuevaList);
    setIndex(0);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const lastname = event.target.elements.lastname.value;
    const nuevaList = items.map((li) =>
      li.id === updateState ? { ...li, name: name, lastname: lastname } : li
    );

    setItem(nuevaList);
    setUpdateState(-1);
  };
  return (
    <div>
      <div>
        {mostrarAlerta3 &&  (
          <div className="mi-alerta3">
            Usuario eliminado
          </div>
        )}
      </div>
      <form className="form-editar" onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Lastname</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((current) =>
              updateState === current.id ? (
                <Edit current={current} items={items} setItem={setItem} />
              ) : (
                <tr>
                  <td>{current.id}</td>
                  <td>{current.name}</td>
                  <td>{current.lastname}</td>
                  <td>
                    <button
                      type="button"
                      className="btnEditar"
                      onClick={() => idEdit(current.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btnEliminar"
                      onClick={() => Delete(current.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </form>
    </div>
  );
};
