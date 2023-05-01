import React from "react";
import { useState } from "react";
import { Crud } from "./delete.jsx";
import Search from "./read.jsx";
import "../styles/styles.scss";

const Create = () => {
  /*Aqui estoy creando las const para actualizarlas mediante useState*/
  const [items, setItem] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarAlerta2, setMostrarAlerta2] = useState(false);

  const handleKeyPress = (event) => {
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };

  /* Estoy creando una funcion para capturar el contenido de los inputs 
esto se ejecuta cuando presiono el boton Create*/
  const handleSubmit = (event) => {
    /* Esta linea es para prevenir que la pagina se regrese a su estado inicial*/
    event.preventDefault();
    let timeoutId;
    const name = event.target.elements.name.value.trim();
    const lastname = event.target.elements.lastname.value.trim();

    if (name.trim() !== "" && lastname.trim() !== "") {
      const newItem = {
        id: items.length + 1, // Generar un nuevo id para el elemento
        name,
        lastname,
      };
      setMostrarAlerta(true);
      timeoutId = setTimeout(() => {
        setMostrarAlerta(false);
      }, 4000);

      /* Para agregar el contenido a items se le debe pasar lo nuevo a setItem 
eso se hace mediante otra variable llamada nuevalistaItem que le da el contenido a setItem*/
      setItem((nuevalistaItem) => {
        return nuevalistaItem.concat(newItem);
      });
    }
    else{
      setMostrarAlerta2(true);
      timeoutId = setTimeout(() => {
        setMostrarAlerta2(false);
      }, 4000);
    }
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
      <div>
        {mostrarAlerta2 && items.length <= items.length && (
          <div className="mi-alerta2">
            No se ha podido añadir al usuario
          </div>
        )}
      </div>
      <Search key={items.id} items={items} setItem={setItem} />
      <form className="form-Create" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          type="text"
          required="/^[a-zA-Z ]+$/"
          onKeyPress={handleKeyPress}
          maxLength="21"
          minLength="3"
        />
        <input
          name="lastname"
          placeholder="Lastname"
          type="text"
          required="/^[a-zA-Z ]+$/"
          onKeyPress={handleKeyPress}
          maxLength="21"
          minLength="3"
        />
        <button>Create</button>
      </form>
      <Crud key={items.id} items={items} setItem={setItem} />
    </div>
  );
};

export default Create;
