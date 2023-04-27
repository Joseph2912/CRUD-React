import React from "react";
import { useState, useEffect } from "react";
import "./styles.scss";

export const Crud = () => {
  const item = [];

  const [items, setItem] = useState(item);
  const [updateState, setUpdateState] = useState(-1);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setMostrarAlerta(true);
    }
  }, [items]);

  const idEdit = (id) => {
    setUpdateState(id);
  };

  const Delete = (id) => {
    const nuevaList = items.filter((li) => li.id !== id);
    setItem(nuevaList);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const apellido = event.target.elements.apellido.value;
    const nuevaList = items.map((li) =>
      li.id === updateState ? { ...li, name: name, apellido: apellido } : li
    );

    setItem(nuevaList);
    setUpdateState(-1);
  };
  return (
    <div>
      <div>
        {mostrarAlerta && items.length > 0 && (
          <div className="mi-alerta">
            Usuario añadido {items[items.length - 1].name}
          </div>
        )}
      </div>
      <Buscar items={items} setItem={setItem} />
      <Añadir setItem={setItem} />
      <form className="form-editar" onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((current) =>
              updateState === current.id ? (
                <Editar current={current} items={items} setItem={setItem} />
              ) : (
                <tr>
                  <td>{current.id}</td>
                  <td>{current.name}</td>
                  <td>{current.apellido}</td>
                  <td>
                    <button
                      type="button"
                      className="btnEditar"
                      onClick={() => idEdit(current.id)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btnEliminar"
                      onClick={() => Delete(current.id)}
                    >
                      Eliminar
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

const Editar = ({ current, items, setItem }) => {
  const handName = (event) => {
    const name = event.target.value;
    const nuevaList = items.map((li) =>
      li.id === current.id ? { ...li, name: name } : li
    );

    setItem(nuevaList);
  };

  const handapellido = (event) => {
    const apellido = event.target.value;
    const nuevaList = items.map((li) =>
      li.id === current.id ? { ...li, apellido: apellido } : li
    );

    setItem(nuevaList);
  };

  return (
    <tr className="table-update">
      <td>{current.id}</td>
      <td>
        <input
          type="text"
          onChange={handName}
          name="name"
          value={current.name}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handapellido}
          name="apellido"
          value={current.apellido}
        />
      </td>
      <td>
        <button type="submit">Update</button>
      </td>
    </tr>
  );
};

const Buscar = ({ items, setItem }) => {
  const [buscarId, setbuscarId] = useState("");

  const handId = (event) => {
    setbuscarId(event.target.value);
  };

  const handleBuscar = (event) => {
    event.preventDefault();
    const nuevaList = items.filter((li) => li.id === parseInt(buscarId));
    setItem([...nuevaList]);
  };

  return (
    <table className="table-buscar">
      <tr>
        <td>
          <input
            type="text"
            onChange={handId}
            name="id"
            value={buscarId}
            placeholder="Buscar Id"
          />
        </td>
        <td>
          <button type="submit" onClick={handleBuscar}>
            Buscar
          </button>
        </td>
      </tr>
    </table>
  );
};

const Añadir = ({ setItem }) => {
  const [nextId, setNextId] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const apellido = event.target.elements.apellido.value;
    const newItem = {
      id: nextId + 1,
      name,
      apellido,
    };

    setItem((nuevalistaItem) => {
      return nuevalistaItem.concat(newItem);
    });

    setNextId(nextId + 1);
  };
  return (
    <form className="form-añadir" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" type="text" />
      <input name="apellido" placeholder="Apellido" type="text" />
      <button>Añadir</button>
    </form>
  );
};
