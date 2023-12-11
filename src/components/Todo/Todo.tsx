import React, { ChangeEvent, useState } from 'react';
import './Todo.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeFilter, edit, remove } from '../../store/todoSlice/todoSlice';
import { FaTrash } from 'react-icons/fa';
import { TodoStatus } from '../../store/todoSlice/todoSlice';

interface TodoProps {
  todo: {
    title: string;
    id: string;
    status: TodoStatus;
    description: string
  };
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState<string>(todo.description)

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TodoStatus;
    dispatch(changeFilter({ id: todo.id, status: newStatus}));
  
  };


  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;
    dispatch(edit({ id: todo.id, description: newDescription }));
    setDescription(event.target.value)
  };

  return (
    <div className='todo'>
        <select className='custom-select' name='filter' value={todo.status} onChange={handleFilterChange}>
          <option value='Pending'>Pending</option>
          <option value='In Process'>In Process</option>
          <option value='Done'>Done</option>
        </select>
      <div className='todo__task'>
        <p>{todo.title}</p>
        <textarea value={description} className='todo__description' placeholder='Description' onChange={handleDescription} />
      </div>
      <FaTrash size='1.5rem' color='#e55446' onClick={() => dispatch(remove(todo.id))} />
    </div>
  );
};

export default Todo;
