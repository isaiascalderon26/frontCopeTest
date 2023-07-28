import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../actions/tasActions';
import TaskForm from './TaskForm';
import './TaskList.scss';

const TaskList = () => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    // Hacemos una solicitud HTTP para obtener las tareas al cargar el componente
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    // Este efecto se ejecutará cada vez que cambie 'tasks'
    // Vuelve a cargar las tareas automáticamente después de agregar una nueva
    dispatch(fetchTasks());
  }, [dispatch, tasks]);

  if (!Array.isArray(tasks)) {
    // Comprobar si tasks no es un array, p. ej., cuando es null o undefined
    return <div>No hay tareas disponibles.</div>;
  }

  const handleDelete = (task) => {
    dispatch(deleteTask(task));
  };

  const handleUpdate = (task) => {
    if (editingTaskId !== task.identificador) {
      setEditingTaskId(task.identificador);
    }
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul className='list-container'>
        {tasks.map((task) => (
          <li key={`task_${task.identificador}`}>
            <div className='task-info'>
              {task.descripcion} - {task.fechaCreacion} -{' '}
              {task.vigente ? 'Vigente' : 'No vigente'}
            </div>
            <div className='task-actions'>
              <button onClick={() => handleDelete(task)}>Eliminar</button>
              {!editingTaskId && (
                <button onClick={() => handleUpdate(task)}>Editar</button>
              )}
            </div>
            {editingTaskId === task.identificador && (
              <div className='form-wrapper'>
                <TaskForm
                  task={task}
                  onCancelUpdate={() => setEditingTaskId(null)}
                  onUpdateTask={(updatedTask) =>
                    dispatch(updateTask(updatedTask))
                  }
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
