// components/Form.js
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { v4 as uuidv4 } from "uuid";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  url: yup.string().required("Url is required"),
});

const Form = ({ onSave, onUpdate, initialData }) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (initialData) {
      onUpdate({ ...data, id: initialData.id });
    } else {
      onSave({ ...data, id: uuidv4() });
    }
    reset();
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-field">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="name">Name</label>
              <InputText id="name" {...field} />
              {fieldState.error && <span>{fieldState.error.message}</span>}
            </>
          )}
        />
      </div>
      <div className="p-field">
        <Controller
          name="url"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <label htmlFor="url">url</label>
              <InputText id="url" {...field} />
              {fieldState.error && <span>{fieldState.error.message}</span>}
            </>
          )}
        />
      </div>
      <Button type="submit" label="Submit" />
    </form>
  );
};

export default Form;
