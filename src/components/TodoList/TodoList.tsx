import React, { useEffect } from 'react'
import './TodoList.scss'
import Input from '../Input/Input'
import Todo from '../Todo/Todo'
import { useAppDispatch, useAppSelector } from '../../store'
import Filter from '../Filter/Filter'
import { filter } from '../../store/todoSlice/todoSlice'
import { fetchCompletedTasks } from '../../store/AsyncSlice/AsyncSlice'


const TodoList = () => {
  const todos = useAppSelector(state => state.todo.filteredTodos)
  const dispatch = useAppDispatch()
  const total = useAppSelector(state => state.todo.todos.length)
  const completed = useAppSelector(state => state.todo.todos.filter(todo => todo.status == 'Done').length)

  useEffect(() => {
    dispatch(filter('All'));
  }, [dispatch]);

  return (
    <div className='todolist'>
         {todos.map((todo) => <Todo todo={todo} key={todo.id}  />)}
         <p>Total tasks: {total}</p>
        <p>Completed Tasks: {completed} </p>
        <button className='main__wrapper-fetch' onClick={() => dispatch(fetchCompletedTasks())}>Fetch completed tasks</button>
    </div>
    
  )
}

export default TodoList