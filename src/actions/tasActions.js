import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/task'; // Reemplazar 'puerto' con el número del puerto en el que se ejecuta el backend

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get(BASE_URL);
    dispatch({ type: 'FETCH_TASKS', payload: response.data });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post(BASE_URL, task);
    dispatch({ type: 'ADD_TASK', payload: response.data });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    dispatch({ type: 'DELETE_TASK', payload: id });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const updateTask = (updatedTask) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${updatedTask.identificador}`,
      updatedTask
    );
    dispatch({ type: 'UPDATE_TASK', payload: response.data });
  } catch (error) {
    console.error('Error updating task:', error);
  }
};
