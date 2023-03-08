import { LoggedUserContext } from '../../components/context/context';
import { Link } from 'react-router-dom';
import './Home.css';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { useIsBombDisarmedContext } from '../../components/context/isWinContext';

function Home() {
  const { loggedUser } = LoggedUserContext();
  console.log("you logges is:", loggedUser);
  const [timerElapsed, setTimerElapsed] = useState(loggedUser.timerElapsed);
  const [display, setdisplay] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const { bombDisarmed, setBombDisarmed } = useIsBombDisarmedContext()


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userID = localStorage.getItem('userID');
        const response = await api.get(`/escape/${userID}`);
        const updatedTimerElapsed = response.data.timerElapsed;
        setTimerElapsed(updatedTimerElapsed);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const delteTimer = async () => {
    try {
      setdisplay(true)
      const userID = localStorage.getItem('userID');
      await api.put(`/escape/${userID}`, { timerElapsed: null });
      setTimerElapsed(null);

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className='container'>
      <div className='fixAll'>
        <h1>Welcome, {loggedUser.username}</h1>
        <div className='escapeddelte'>
          <div className={display ? 'continerdelte' : 'notdisplay'}>
            {bombDisarmed ? (
              (
                <>
                  <h1>You escaped in: {timerElapsed + Number(localStorage.getItem('counter'))} seconds</h1>
                  <button onClick={delteTimer}>Delete</button>
                </>
              )
            ) : (
              ""

            )}
          </div>
        </div>

        <Link to='/story'>Go to Room1</Link>
      </div>
    </div>
  );
}


export default Home;
