import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/students', {
        headers: { 'x-api-key': 'your_secret_api_key' }
      });
      if (!response.ok) throw new Error('Failed to fetch students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setErrorMessage('Could not load student data. Please try again later.');
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const newStudent = { firstName, lastName, age: Number(age), email };

    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'your_secret_api_key'
        },
        body: JSON.stringify(newStudent)
      });

      if (!response.ok) {
        setErrorMessage('Invalid student data provided or server error.');
        return;
      }

      const addedStudent = await response.json();
      setStudents([...students, addedStudent]);
      
      setFirstName('');
      setLastName('');
      setAge('');
      setEmail('');
    } catch (error) {
      setErrorMessage('Network error occurred while adding the student.');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': 'your_secret_api_key' }
      });

      if (response.ok) {
        setStudents(students.filter((student) => student.id !== id));
      } else {
        setErrorMessage('Failed to delete the student.');
      }
    } catch (error) {
      setErrorMessage('Network error occurred while deleting the student.');
    }
  };

  return (
    <div className="app-container">
      <h1>Student Management System</h1>

      {errorMessage && (
        <p data-cy="error-message" className="error-message">
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleAddStudent} className="student-form">
        <input
          data-cy="input-firstname"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          data-cy="input-lastname"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          data-cy="input-age"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          data-cy="input-email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" data-cy="btn-submit">
          Add Student
        </button>
      </form>

      <h2>Student List</h2>
      <ul data-cy="student-list" className="student-list">
        {students.map((student) => (
          <li key={student.id} data-cy="student-item" className="student-item">
            <span>
              {student.firstName} {student.lastName} ({student.age} years old) - {student.email}
            </span>
            <button
              data-cy="btn-delete"
              className="btn-delete"
              onClick={() => handleDeleteStudent(student.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;