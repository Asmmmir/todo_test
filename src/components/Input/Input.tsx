import React, { useState } from 'react';
import './Input.scss';
import { RiAddBoxFill } from 'react-icons/ri';
import { useAppDispatch } from '../../store';
import { add } from '../../store/todoSlice/todoSlice';

const Input = () => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  const handleAddTodo = (e: React.MouseEvent) => {
    e.preventDefault();
    if(title.length > 3) {
      dispatch(add({ title }));
      setTitle('');
      setError(false)
    }
    else {
      setError(true)
    }
  };

  return (
    <form className='input'>
      <input
      className={`${error ? 'error' : ''}`}
        type="text"
        maxLength={30}
        placeholder='Create a new todo...'
        value={title}
        onChange={(e) => setTitle(e.target.value )}
      />
      <button type="submit" style={{ background: 'transparent', border: 'none' }} onClick={handleAddTodo}>
        <RiAddBoxFill size='2.7rem' color='#8f4fe7' />
        
      </button>
    </form>
  );
};

export default Input;
