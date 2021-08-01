import { combineReducers } from 'redux';

import toDoReducer from './ToDo/toDo.reducer';

const rootReducer = combineReducers({
    toDo: toDoReducer,
});

export default rootReducer;