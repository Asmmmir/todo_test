import React from 'react'
import Main from './components/Main/Main'
import './App.scss'
import TodoList from './components/TodoList/TodoList'

const App = () => {
  return (
    <div className='app'>
    <Main />
    <TodoList />
    </div>
  )
}

export default App