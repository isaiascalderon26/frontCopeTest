import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/task';

export const fetchTasks = () => async (dispatch) => {
  try {
    const response = await axios.get(BASE_URL);
    dispatch({ type: 'FETCH_TASKS', payload: response.data });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

// tasActions.js
export const addTask = (task) => async (dispatch) => {
  try {
    const response = await axios.post(BASE_URL, task);
    dispatch({ type: 'ADD_TASK', payload: response.data });
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const deleteTask = (task) => async (dispatch) => {
  try {
    const { identificador } = task;
    await axios.delete(`${BASE_URL}/${identificador}`);
    dispatch({ type: 'DELETE_TASK', payload: identificador });
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
