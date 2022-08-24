import { useState, useEffect } from 'react';
import { accessToken } from './spotify';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App(){
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    setToken(accessToken);  
  }, [])
  
  return (
    <div>
     {!token ? (<Login />) : (<Home />)}
    </div>
  )
}
export default App;