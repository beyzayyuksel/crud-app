// pages/index.js
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  getItems,
  saveItem,
  updateItem,
  deleteItem,
} from "../services/localStorageService";

// Dinamik importlar
const Form = dynamic(() => import("../components/Form"), { ssr: false });
const List = dynamic(() => import("../components/List"), { ssr: false });

const Home = () => {
  const [items, setItems] = useState(getItems());

  const handleSave = (item) => {
    saveItem(item);
    setItems(getItems());
  };

  const handleUpdate = (updatedItem) => {
    updateItem(updatedItem);
    setItems(getItems());
  };

  const handleDelete = (id) => {
    deleteItem(id);
    setItems(getItems());
  };

  return (
    <div className="container">
      <h1>CRUD Application</h1>
      <Form onSave={handleSave} onUpdate={handleUpdate} />
      <List items={items} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
