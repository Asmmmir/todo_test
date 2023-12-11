import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import uniqid  from 'uniqid'

export type TodoStatus = 'All' | 'Pending' | 'In Process' | 'Done'

export interface Todo {
    title: string;
    id: string;
    status: TodoStatus ;
    description: string
}

interface TodoState {
    todos: Todo[];
    filteredTodos: Todo[]
}


const initialState : TodoState = {
     todos:  [],
     filteredTodos: []
    } 

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
      add(state, action : PayloadAction<{title:string}>) {
        const newTodo: Todo = {
            title: action.payload.title,
            id: uniqid(),
            status: 'In Process',
            description:''
          };
          state.todos.unshift(newTodo);

          if(state.filteredTodos.length >= 0) {
           state.filteredTodos.unshift(newTodo)
          }
          
      },
      remove(state, action : PayloadAction<string>) {
   const updatedTodos = state.todos.filter((todo) => todo.id !== action.payload);

   return {
     ...state,
     todos: updatedTodos,
     filteredTodos: state.filteredTodos.filter((todo) => todo.id !== action.payload),
   };


      },
      edit(state, action: PayloadAction<{ id: string; description: string }>) {
        const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.id);
      
        if (todoIndex !== -1) {
          const updatedTodos = [...state.todos];
          updatedTodos[todoIndex] = {
            ...updatedTodos[todoIndex],
            description: action.payload.description,
          };
      
          return {
            ...state,
            todos: updatedTodos,
          };
        }
      
        return state;
      },
      filter(state, action: PayloadAction<TodoStatus>){
        const filteredTodos = action.payload === 'All'
        ? state.todos
        : state.todos.filter((todo) => todo.status === action.payload);
        return {
            ...state,
            filteredTodos,
          };
                
      },
      changeFilter(state, action: PayloadAction<{id:string, status: TodoStatus}>) {
        const updatedTodos = state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, status: action.payload.status } : todo
      );

      return {
        ...state,
        todos: updatedTodos,
        filteredTodos: state.filteredTodos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, status: action.payload.status } : todo
        ),
      };
      }


    },
})


export const {add, remove, edit, filter, changeFilter} = todoSlice.actions
export default todoSlice.reducer