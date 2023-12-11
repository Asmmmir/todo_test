import React from 'react'
import './Main.scss'
import Input from '../Input/Input'
import Filter from '../Filter/Filter'

const Main = () => {

  return (
    <div className='main'>
      <div className="main__wrapper">
        <h1>Todo App</h1>
        <Input />
        <Filter />
      </div>
    </div>
  )
}

export default Main