import React, { useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import AddTodoForm from './AddToForm'
import TodoList from './TodoList'
import Toggleable from './Toggleable'
import Filters from './Filters'

import { initializeTodos } from '../reducers/todosReducer'
import { initializeThemes } from '../reducers/themesReducer'
import { initializeImportance } from '../reducers/importanceReducer'

function App() {
  const todos = useSelector(globalState => globalState.todos)
  const themes = useSelector(globalState => globalState.themes)
  const importance = useSelector(globalState => globalState.importance)
  const dispatch = useDispatch()

  useEffect(() => {
    // initialize todos
    dispatch(initializeTodos())
    // initialize themes
    dispatch(initializeThemes())
    // initialize importanceLevels
    dispatch(initializeImportance())
  }, [])

  const addTodo = newTodo => {
    setTodos(todos.concat(newTodo))
  }

  const updateTodo = (id, updatedTodo) => {
    // alter todo otherwise, is ok
    setTodos(todos.map(t => (t.id === id) ? updatedTodo : t))
  }

  const deleteTodo = id => {
    // filters all but the one with id
    setTodos(todos.filter(t => {
      return t.id !== id
    }))
  }

  // REFS
  const addTodoFormRef = useRef()

  const tmpHandler = () => {
    addTodoFormRef.current.toggleVisibility()
  }

  return (
    <div className="main">
      <header><h1>Todo Application</h1></header>
      <Toggleable ref={addTodoFormRef} unhideName={'Create Todo'}>
        <AddTodoForm 
          themes={themes}
          importance={importance}
          visibilityToggler={tmpHandler}
          addTodo={addTodo}
        />
      </Toggleable>
      <Filters />
      <TodoList 
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  )
}

export default App
