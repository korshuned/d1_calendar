import React from 'react';
import './App.css';
import Calendar from './components/Calendar';

const now = new Date(2020, 1, 10);

function App() {
  return (
      <Calendar date={now}/>
  );
}

export default App;
