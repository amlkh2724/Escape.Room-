import { LoggedUserContext } from '../../components/context/context';
import { Link } from 'react-router-dom';

function Home({setShowRoom1}) {
  const {loggedUser}= LoggedUserContext()
  console.log(loggedUser);
  return (
    <div>
      <h1>your best time is:</h1>
      <h1>Welcome, {loggedUser.username}</h1>
      <button onClick={() => setShowRoom1(true)}>Start</button>
      <Link to="/Room1">Go to Room1</Link>
    </div>
  );
}


export default Home

