import Home from './Pages/Home';
import Login from './Pages/Login';

const code = new URLSearchParams(window.location.search).get('code');

function App(){
  
  return (
    <div>
      {code ? <Home code={code}/> : <Login/>} 
    </div>
  );
}
export default App;