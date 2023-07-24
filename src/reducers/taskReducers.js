const taskReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter((task) => task.identificador !== action.payload);
    default:
      return state;
  }
};

export default taskReducer;
