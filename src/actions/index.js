// import { todosRef } from '../firebase';
// const FETCH_TODOS = 'FETCH_TODOS';

// export const addTodo = newToDo => async dispatch => {
//   todosRef.push().set(newToDo);
// };
// export const completeTodo = completeToDo => async dispatch => {
//   todosRef.child(completeToDo).remove();
// };
// export const fetchTodos = () => async dispatch => {
//   todosRef.on('value', snapshot => {
//     dispatch({
//       type: FETCH_TODOS,
//       payload: snapshot.val()
//     });
//   });
// };
