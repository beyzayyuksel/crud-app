import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  url: yup.string().url("Invalid URL format").required("URL is required"),
});

const Form = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const newItem = {
      ...data,
      id: uuidv4(),
      votes: 0,
      lastVoted: new Date().toISOString(),
    };
    onSave(newItem);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <label>Name</label>
          <InputText {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <label>URL</label>
          <InputText {...register("url")} />
          {errors.url && <p>{errors.url.message}</p>}
        </div>
      </div>
      <Button
        type="submit"
        style={{ margin: "24px 0", backgroundColor: "rgb(0 28 64)" }}
      >
        Save
      </Button>
    </form>
  );
};

export default Form;
