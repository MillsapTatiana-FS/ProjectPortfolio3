import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Login from './Login'
const code = new URLSearchParams(window.location.search).get('code')

function App(){
  return (
    <div>
      {code ? <Home code={code}/> : <Login />}
    </div>
  )
}
export default App;