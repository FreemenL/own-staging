import {ADD_TODO,COMPLETE_ALL,COMPLETE_TODO,DELETE_TODO,EDIT_TODO,CLEAR_COMPLETED} from 'constants/ActionTypes';

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
];
export default function todos(state=initialState,action){
	switch(action.type){
		case ADD_TODO:
			return[
				...state,
				{
					id:state.reduce((maxId,todo)=>Math.max(todo.id,maxId),-1)+1,
					completed:false,
					text:action.text
				}
			];
		case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
     )
    case EDIT_TODO:
    return state.map(todo =>
      todo.id === action.id ?
        { ...todo, text: action.text } :
        todo
    )
		case COMPLETE_ALL:
			const areAllMarked = state.every(todo=>todo.completed);
			return state.map(todo=>({
				...todo,
				completed:!areAllMarked
			}));
		case COMPLETE_TODO:
			return state.map(todo=>
				todo.id==action.id?
				{...todo,completed:!todo.completed }:
				todo
			)
		case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)
		default:
      return state;
	}
}














