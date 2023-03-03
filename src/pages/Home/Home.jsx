import { LoggedUserContext } from '../../components/context/context';
import { Link } from 'react-router-dom';
import './Home.css'
function Home({setShowRoom1}) {
  const {loggedUser}= LoggedUserContext()
  console.log(loggedUser);
  return (
    <div className='container'>
      <div className="fixAll">
      <h1>Welcome, {loggedUser.username}</h1>
      <h1>Time to escape:{loggedUser.timerElapsed} seconds</h1>

      <button onClick={() => setShowRoom1(true)}>Start</button>
      <Link to="/Room1">Go to Room1</Link>
      </div>
    </div>
  );
}


export default Home

