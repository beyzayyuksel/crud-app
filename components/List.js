// components/List.js
import React from "react";
import { Button } from "primereact/button";

const List = ({ items, onDelete }) => {
  return (
    <div>
      <h2>Items List</h2>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <p>Name: {item.name}</p>
              <p>url: {item.url}</p>
              <Button label="Delete" onClick={() => onDelete(item.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
