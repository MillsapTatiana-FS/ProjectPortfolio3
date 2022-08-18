import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login'
import './App.css';

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  return  code ? <Home code={code} /> : <Login />

}

export default App;