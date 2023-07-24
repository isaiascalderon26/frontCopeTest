import React, { useState } from 'react';
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

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    setTask({
      descripcion: '',
      fechaCreacion: '',
      vigente: false,
    });
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
        />
        <TextField
          label='Fecha Creación'
          type='date'
          variant='outlined'
          value={task.fechaCreacion}
          onChange={(e) => setTask({ ...task, fechaCreacion: e.target.value })}
          required
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
