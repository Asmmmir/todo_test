import React, { useState } from 'react';
import './Input.scss';
import { RiAddBoxFill } from 'react-icons/ri';
import { useAppDispatch } from '../../store';
import { add } from '../../store/todoSlice/todoSlice';

const Input = () => {
  const [title, setTitle] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleAddTodo = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(add({ title }));
    setTitle('');
  };

  return (
    <form className='input'>
      <input
        type="text"
        maxLength={30}
        placeholder='Create a new todo...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" style={{ background: 'transparent', border: 'none' }} onClick={handleAddTodo}>
        <RiAddBoxFill size='2.7rem' color='#8f4fe7' />
        
      </button>
    </form>
  );
};

export default Input;
