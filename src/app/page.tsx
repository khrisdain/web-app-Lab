'use client'

import React, { useState } from 'react';

// Utility function for generating random tasks
const generateRandomTask = () => {
  const tasks = [
    'Review JavaScript fundamentals',
    'Practice React hooks',
    'Build a portfolio website',
    'Learn Next.js routing',
    'Study CSS Grid and Flexbox',
    'Implement responsive design',
    'Practice Git workflows',
    'Write unit tests'
  ];
  return tasks[Math.floor(Math.random() * tasks.length)];
};

// Navigation Component
const Navigation = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'todo', label: 'Todo List' },
    { id: 'profile', label: 'Profile' }
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Learning Hub</h1>
        <ul className="flex space-x-6">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-800 font-semibold'
                    : 'hover:bg-blue-500'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

// Home Page Component
const HomePage = ({ userName, onUpdateName }) => {
  const [tempName, setTempName] = useState(userName);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setShowWelcome(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Welcome Section with Conditional Rendering */}
      {showWelcome ? (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-lg mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Learning Hub{userName ? `, ${userName}` : ''}!
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Your personal space for managing learning goals and tracking progress
          </p>
          <button
            onClick={() => setShowWelcome(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Customize Experience
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Personalize Your Experience</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit(e)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleNameSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Save Name
            </button>
            <button
              onClick={() => setShowWelcome(true)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Features Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Todo Manager</h3>
          <p className="text-gray-600 mb-4">
            Organize your learning tasks and track your progress with our interactive todo list.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Add and remove tasks</li>
            <li>• Mark tasks as complete</li>
            <li>• Generate random learning suggestions</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Profile Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Manage your learning preferences and view your activity statistics.
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Customize learning themes</li>
            <li>• Track completion statistics</li>
            <li>• Set learning goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Todo List Component
const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete React tutorial', completed: false },
    { id: 2, text: 'Practice CSS Grid', completed: true }
  ]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending

  // Event handler for adding new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      }]);
      setNewTask('');
    }
  };

  // Event handler for toggling task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Event handler for deleting task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Event handler for adding random task
  const addRandomTask = () => {
    const randomTask = generateRandomTask();
    setTasks([...tasks, {
      id: Date.now(),
      text: randomTask,
      completed: false
    }]);
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Todo List</h2>
        
        {/* Task Statistics - Conditional Rendering */}
        {tasks.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        )}

        {/* Add Task Section */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new learning task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
            <button
              onClick={addRandomTask}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Random Task
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'completed'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded capitalize transition-colors ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Task List - Conditional Rendering */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {tasks.length === 0 
              ? "No tasks yet. Add your first learning goal!"
              : `No ${filter} tasks found.`
            }
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map(task => (
              <li
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  task.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className={`flex-1 ${
                  task.completed 
                    ? 'text-gray-500 line-through' 
                    : 'text-gray-800'
                }`}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Profile Component
const Profile = ({ userName, onUpdateName }) => {
  const [theme, setTheme] = useState('blue');
  const [goal, setGoal] = useState('');
  const [savedGoals, setSavedGoals] = useState(['Master React fundamentals']);
  const [showGoalForm, setShowGoalForm] = useState(false);

  // Event handler for theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Event handler for adding new goal
  const handleAddGoal = () => {
    if (goal.trim()) {
      setSavedGoals([...savedGoals, goal.trim()]);
      setGoal('');
      setShowGoalForm(false);
    }
  };

  // Event handler for removing goal
  const removeGoal = (index) => {
    setSavedGoals(savedGoals.filter((_, i) => i !== index));
  };

  const themes = [
    { name: 'blue', color: 'bg-blue-500', label: 'Ocean Blue' },
    { name: 'green', color: 'bg-green-500', label: 'Forest Green' },
    { name: 'purple', color: 'bg-purple-500', label: 'Royal Purple' },
    { name: 'red', color: 'bg-red-500', label: 'Sunset Red' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Dashboard</h2>

        {/* User Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 ${themes.find(t => t.name === theme)?.color} rounded-full flex items-center justify-center text-white text-2xl font-bold`}>
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-lg font-medium">{userName || 'Anonymous User'}</p>
              <p className="text-gray-600">Learning enthusiast</p>
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Choose Your Theme</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map(themeOption => (
              <button
                key={themeOption.name}
                onClick={() => handleThemeChange(themeOption.name)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === themeOption.name
                    ? 'border-gray-800 shadow-md'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className={`w-8 h-8 ${themeOption.color} rounded-full mx-auto mb-2`}></div>
                <div className="text-sm font-medium">{themeOption.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Learning Goals Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Learning Goals</h3>
            <button
              onClick={() => setShowGoalForm(!showGoalForm)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              {showGoalForm ? 'Cancel' : 'Add Goal'}
            </button>
          </div>

          {/* Conditional Rendering for Goal Form */}
          {showGoalForm && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your learning goal..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleAddGoal}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                >
                  Save Goal
                </button>
              </div>
            </div>
          )}

          {/* Goals List - Conditional Rendering */}
          {savedGoals.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No learning goals set yet.</p>
          ) : (
            <ul className="space-y-2">
              {savedGoals.map((goalItem, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-800">{goalItem}</span>
                  <button
                    onClick={() => removeGoal(index)}
                    className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-3">Your Progress</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{savedGoals.length}</div>
              <div className="text-sm text-gray-600">Active Goals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{theme}</div>
              <div className="text-sm text-gray-600">Current Theme</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userName, setUserName] = useState('');

  // Event handler for navigation
  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Event handler for updating user name
  const handleUpdateName = (name) => {
    setUserName(name);
  };

  // Render current page based on state - Conditional Rendering
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage userName={userName} onUpdateName={handleUpdateName} />;
      case 'todo':
        return <TodoList />;
      case 'profile':
        return <Profile userName={userName} onUpdateName={handleUpdateName} />;
      default:
        return <HomePage userName={userName} onUpdateName={handleUpdateName} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="py-8">
        {renderCurrentPage()}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>&copy; 2024 Learning Hub - Built with React & Next.js</p>
      </footer>
    </div>
  );
};

export default App;