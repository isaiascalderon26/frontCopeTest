// TaskForm.jsx
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../actions/tasActions';
import { TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import './TaskForm.scss'; // Importa los estilos de Sass

const TaskForm = () => {
  const [task, setTask] = useState({
    descripcion: '',
    fechaCreacion: '',
    vigente: false,
  });

  const [errors, setErrors] = useState({}); // Estado para almacenar los mensajes de error

  const dispatch = useDispatch();
  const dateInputRef = useRef(null); // Referencia al campo de entrada de fecha

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar los campos antes de enviar la solicitud al servidor
    const formIsValid = validateForm();
    if (formIsValid) {
      dispatch(addTask(task));
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

    // Verifica si el campo de fecha está vacío o no y actualiza las clases del label en consecuencia
    if (e.target.value === '') {
      dateInputRef.current.previousSibling.classList.add('label-above');
      dateInputRef.current.previousSibling.classList.remove('label-normal');
    } else {
      dateInputRef.current.previousSibling.classList.add('label-normal');
      dateInputRef.current.previousSibling.classList.remove('label-above');
    }
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
          onChange={handleDateChange} // Usa el nuevo controlador de eventos para el campo de fecha
          required
          error={!!errors.fechaCreacion} // Indicar si hay un error en el campo
          helperText={errors.fechaCreacion} // Mostrar el mensaje de error
          inputRef={dateInputRef} // Asigna la referencia al campo de entrada de fecha
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
