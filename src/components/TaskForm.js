import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../actions/tasActions';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import './TaskForm.scss'; // Importa los estilos de Sass
import { v4 as uuid } from 'uuid';

const TaskForm = () => {
  const [task, setTask] = useState({
    descripcion: '',
    fechaCreacion: '',
    vigente: false,
  });

  const [errors, setErrors] = useState({}); // Estado para almacenar los mensajes de error

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos antes de enviar la solicitud al servidor
    const formIsValid = validateForm();
    if (formIsValid) {
      dispatch(addTask({ ...task, id: uuid() }));
      setTask({
        descripcion: '',
        fechaCreacion: '',
        vigente: false,
      });
      setErrors({});
    }
  };

  const handleDateChange = (e) => {
    setTask({ ...task, fechaCreacion: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!task.descripcion.trim()) {
      newErrors.descripcion = 'El campo Descripción es requerido.';
      isValid = false;
    }

    if (!task.fechaCreacion) {
      newErrors.fechaCreacion = 'El campo Fecha Creación es requerido.';
      isValid = false;
    }

    // Agregar aquí más validaciones según tus requisitos

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className='form-container'>
      <h2>Agregar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Descripción'
          variant='outlined'
          value={task.descripcion}
          onChange={(e) => setTask({ ...task, descripcion: e.target.value })}
          required
          error={!!errors.descripcion} // Indicar si hay un error en el campo
          helperText={errors.descripcion} // Mostrar el mensaje de error
        />
        <TextField
          label='Fecha Creación'
          type='date'
          variant='outlined'
          value={task.fechaCreacion}
          onChange={handleDateChange}
          required
          error={!!errors.fechaCreacion}
          helperText={errors.fechaCreacion}
          InputLabelProps={{ shrink: true }} // Para que el label se desplace automáticamente cuando hay un valor
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={task.vigente}
              onChange={(e) => setTask({ ...task, vigente: e.target.checked })}
            />
          }
          label='Vigente'
        />
        <Button variant='contained' color='primary' type='submit'>
          Agregar
        </Button>
      </form>
    </div>
  );
};

export default TaskForm;
