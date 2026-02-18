import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Check } from 'lucide-react'
import './TodoPage.css'

export const TodoPage = () => {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos') || '[]'))
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([...todos, newTodo])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="todo-wrapper">
      <TopNavigation />
      
      <div className="todo-container fade-in">
        {/* Header */}
        <div className="todo-header">
          <h1>To-Do List</h1>
          <p className="todo-progress">{completedCount} of {todos.length} completed</p>
        </div>

        {/* Progress Bar */}
        {todos.length > 0 && (
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(completedCount / todos.length) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="add-todo-form neomorph-md">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="neomorph-button primary">
            <Plus size={20} /> Add
          </button>
        </form>

        {/* Todo List */}
        <div className="todo-list">
          {todos.length === 0 ? (
            <div className="empty-state neomorph-md">
              <p className="empty-emoji">✨</p>
              <p>No tasks yet. Stay calm and take it easy!</p>
            </div>
          ) : (
            <>
              {/* Active Todos */}
              {todos.filter(t => !t.completed).length > 0 && (
                <div className="todo-section">
                  <h3 className="section-label">Active Tasks</h3>
                  {todos.filter(t => !t.completed).map(todo => (
                    <div key={todo.id} className="todo-item neomorph-sm active">
                      <button
                        className="todo-checkbox"
                        onClick={() => toggleTodo(todo.id)}
                        aria-label="Toggle task"
                      >
                        <Check size={18} />
                      </button>
                      <span className="todo-text">{todo.text}</span>
                      <button
                        className="todo-delete"
                        onClick={() => deleteTodo(todo.id)}
                        aria-label="Delete task"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Completed Todos */}
              {todos.filter(t => t.completed).length > 0 && (
                <div className="todo-section">
                  <h3 className="section-label">Completed ✓</h3>
                  {todos.filter(t => t.completed).map(todo => (
                    <div key={todo.id} className="todo-item neomorph-sm completed">
                      <button
                        className="todo-checkbox checked"
                        onClick={() => toggleTodo(todo.id)}
                        aria-label="Toggle task"
                      >
                        <Check size={18} />
                      </button>
                      <span className="todo-text">{todo.text}</span>
                      <button
                        className="todo-delete"
                        onClick={() => deleteTodo(todo.id)}
                        aria-label="Delete task"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
