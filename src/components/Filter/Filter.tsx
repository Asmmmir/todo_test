import React from 'react'
import './Filter.scss'
import { useAppDispatch } from '../../store'
import { filter } from '../../store/todoSlice/todoSlice'

const Filter = () => {

    const dispatch = useAppDispatch()

  return (
    <div className='filter'>
        <button onClick={() => dispatch(filter('All'))}>All</button>
        <button onClick={() => dispatch(filter('Pending'))}>Pending</button>
        <button onClick={() => dispatch(filter('In Process'))} >In Process</button>
        <button onClick={() => dispatch(filter('Done'))}>Done</button>
    </div>
  )
}

export default Filter