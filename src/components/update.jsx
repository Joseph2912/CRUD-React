import React from "react";
import "../styles/styles.scss";

const Edit = ({ current, items, setItem }) => {
  const handName = (event) => {
    const name = event.target.value;
    const nuevaList = items.map((li) =>
      li.id === current.id ? { ...li, name: name } : li
    );

    setItem(nuevaList);
  };

  const handlastname = (event) => {
    const lastname = event.target.value;
    const nuevaList = items.map((li) =>
      li.id === current.id ? { ...li, lastname: lastname } : li
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
          onChange={handlastname}
          name="lastname"
          value={current.lastname}
        />
      </td>
      <td>
        <button type="submit">Update</button>
      </td>
    </tr>
  );
};

export default Edit;
