// taskReducer.js
const taskReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter((task) => task.identificador !== action.payload);
    case 'UPDATE_TASK':
      return state.map((task) =>
        task.identificador === action.payload.identificador
          ? action.payload
          : task
      );
    default:
      return state;
  }
};

export default taskReducer;
