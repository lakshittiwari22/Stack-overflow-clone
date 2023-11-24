import { combineReducers } from "redux";

import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from './question.js'
import usersReducer from './users'
import postReducer from './post.js'


export default combineReducers({
    authReducer, currentUserReducer, questionsReducer, usersReducer,postReducer 
})