import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../actions/tasActions';
import TaskForm from './TaskForm'; // Importa el componente de formulario de tareas
import './TaskList.scss';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // Estado para almacenar el ID de la tarea en edición
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Estado para almacenar los datos de la tarea en edición
  const [editingTask, setEditingTask] = useState({
    identificador: null,
    descripcion: '',
    fechaCreacion: '',
    vigente: false,
  });

  // Función para manejar el evento de actualización de la tarea
  const handleUpdate = (task) => {
    // Establecer el ID de la tarea que se está editando en el estado de React
    setEditingTaskId(task.identificador);

    // Establecer los datos de la tarea que se está editando en el estado de React
    setEditingTask({
      identificador: task.identificador,
      descripcion: task.descripcion,
      fechaCreacion: task.fechaCreacion,
      vigente: task.vigente,
    });

    // Llamar a la acción "updateTask" para actualizar la tarea en la base de datos
    dispatch(updateTask(task));
  };

  // Función para manejar el evento de cancelar la edición de la tarea
  const handleCancelUpdate = () => {
    // Limpiar los estados de edición
    setEditingTaskId(null);
    setEditingTask({
      identificador: null,
      descripcion: '',
      fechaCreacion: '',
      vigente: false,
    });
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul className='list-container'>
        {tasks.map((task) => (
          <li key={task.identificador}>
            {task.descripcion} - {task.fechaCreacion} -{' '}
            {task.vigente ? 'Vigente' : 'No vigente'}
            <button onClick={() => handleDelete(task.identificador)}>
              Eliminar
            </button>
            {!editingTaskId && (
              <button onClick={() => handleUpdate(task)}>Editar</button>
            )}
            {editingTaskId === task.identificador && (
              <TaskForm
                key={task.identificador} // Agrega la prop "key" con el identificador único de la tarea
                task={editingTask}
                onCancelUpdate={handleCancelUpdate}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
