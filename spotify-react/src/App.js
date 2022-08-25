import Home from './Pages/Home';
import Login from './Pages/Login';
const token = new URLSearchParams(window.location.search).get('token')

function App(){
  return (
    <div>
      <Login />
    </div>
  )
}
export default App;