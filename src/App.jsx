import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        text: inputValue,
        time: new Date().toLocaleTimeString(),
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleDeleteTask = (index) => {
    setTaskToDelete(index);
    setShowModal(true);
  };

  const confirmDeleteTask = () => {
    const updatedTasks = tasks.filter((_, i) => i !== taskToDelete);
    setTasks(updatedTasks);
    setShowModal(false);
    setTaskToDelete(null);
  };

  const cancelDeleteTask = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setInputValue(tasks[index].text);
  };

  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex ? { ...task, text: inputValue } : task
    );
    setTasks(updatedTasks);
    setInputValue('');
    setEditingIndex(null);
  };

  return (
    <div className="App">
      <h1>My Tasks ✍️</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        {editingIndex !== null ? (
          <button onClick={handleSaveEditTask}>Save</button>
        ) : (
          <button onClick={handleAddTask}>Add</button>
        )}
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task.text} 📌 <em>{task.time}</em></span>
              <button className="action-buttons" onClick={() => handleEditTask(index)}>Edit</button>
              <button className="action-buttons" onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this task?</p>
            <button onClick={confirmDeleteTask}>Yes</button>
            <button onClick={cancelDeleteTask}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
