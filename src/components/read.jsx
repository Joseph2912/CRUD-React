import React from "react";
import { useState } from "react";
import "../styles/styles.scss";

const Search = ({ items, setItem }) => {
  const [buscarId, setbuscarId] = useState("");
  const [mostrarAlerta4, setMostrarAlerta4] = useState(false);

  const handId = (event) => {
    setbuscarId(event.target.value);
  };

  const handleKeyPress = (event) => {
    /* const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(event.key)) {
      event.preventDefault();
    }*/
  };

  const handleBuscar = (event) => {
    let timeoutId;
    event.preventDefault();
    console.log(buscarId);
    if (buscarId.trim() !== "  " && buscarId.trim() !== "0") {
      const nuevaList = items.findIndex(
        (items) =>
          items.name === buscarId ||
          items.id === parseInt(buscarId) ||
          items.lastname === buscarId
      );

      if (nuevaList !== -1) {
        const newItem = items[nuevaList];
        const newItems = [
          newItem,
          ...items.filter((item, i) => i !== nuevaList),
        ];
        setItem(newItems);
        setbuscarId("");
      }
      if (nuevaList < 0) {
        setItem([...items]);
        setMostrarAlerta4(true);
        timeoutId = setTimeout(() => {
          setMostrarAlerta4(false);
        }, 4000);
      }
    }
  };

  return (
    <div>
      <div>
        {mostrarAlerta4 && (
          <div className="mi-alerta3">Usuario no encontrado</div>
        )}
      </div>
      <table className="table-buscar">
        <tr>
          <td>
            <input
              type="text"
              onChange={handId}
              name="id"
              value={buscarId}
              placeholder="Buscar Id"
              onKeyPress={handleKeyPress}
              required="^[0-9]+$"
              maxLength="30"
              minLength="1"
            />
          </td>
          <td>
            <button type="submit" onClick={handleBuscar}>
              Buscar
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Search;
