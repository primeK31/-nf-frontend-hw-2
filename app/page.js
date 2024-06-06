'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const task = {id: 1, text: "Todo Test", completed: false}

export default function Home() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO KANBAN</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
              <div className="flex items-center">
                <button 
                className="w-6 h-6 my-auto mr-6"
                onClick={() => handleToggleTask(index)} 
                >
                  <Image
                        src={task.completed ? "/images/circle-cheked.svg" : "/images/circle.svg"}
                        alt="Task status"
                        width={30}
                        height={30}
                  />
                </button>
                <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.text}</span>
              </div>
              <button onClick={() => handleDeleteTask(index)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> n items left</span>  {/* show how many uncompleted items left */}
          <button
            onClick={() => alert("Clear completed tasks")}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
