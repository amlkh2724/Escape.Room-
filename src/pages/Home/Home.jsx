
import { LoggedUserContext } from '../../components/context/context';
import { Link } from 'react-router-dom';
import './Home.css';
import api from '../../api/api';
import { useEffect, useState } from 'react';

function Home() {
  const { setBombActive, setCountdown, setHoldPosition, setButtonClicked, setTimerCountrusume, setTimerOff, isLost, setIsLost, isOnline, SetOnline } = LoggedUserContext();
  const [timerElapsed, setTimerElapsed] = useState(null);
  const [display, setDisplay] = useState(false);
  const [gameList, setGameList] = useState([]);
  useEffect(() => {
    const userID = localStorage.getItem('userID');
    fetchUser(userID);
    setCountdown(60);
    setBombActive(true);
    setHoldPosition({ x: 5 * 16, y: 5 * 16 });
    setButtonClicked(false);
    setTimerCountrusume(0);
    setTimerOff(true);
    fetchGames(userID, timerElapsed);
    setIsLost(true)
  }, [timerElapsed]);

  const fetchUser = async (userID) => {
    try {
      const response = await api.get(`/escape/${userID}`);
      const updatedTimerElapsed = response.data.timerElapsed;
      setTimerElapsed(updatedTimerElapsed);
      localStorage.setItem(`timerElapsed_${userID}`, updatedTimerElapsed); // store timerElapsed for this user in local storage
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGames = async (userID, timerElapsed) => {
    try {
      const response = await api.put(`/escape/${userID}`);
      const gameList = response.data.gameList;

      if (timerElapsed !== null && isLost === true) {
        const currentDate = formatDate(new Date());
        const currentTime = formatTime(new Date());
        let updatedGames = [...gameList];

        // Check if the gameList has any items before deleting the last one
        if (updatedGames.length > 0 && isOnline) {
          updatedGames.pop();
          SetOnline(false)
        }

        // Add the new game to the updated list
        updatedGames.push({
          id: Date.now(),
          date: currentDate,
          time: currentTime,
          timeElapsed: timerElapsed,
        });

        await api.put(`/escape/${userID}`, { gameList: updatedGames });
        setGameList(updatedGames);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGame = async (gameId) => {
    const updatedGames = gameList.filter((game) => game.id !== gameId);
    setGameList(updatedGames);
    try {
      const userID = localStorage.getItem('userID');
      await api.put(`/escape/${userID}`, { gameList: updatedGames });
    } catch (error) {
      console.error(error);
    }
  };



  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };


  return (
    <div className='container'>
      <Link to='/'>
        <button className='startButton2'>Logout</button>
      </Link>
      <div className='fixAll'>
        <h1>Welcome,<span className='fixName'>{localStorage.getItem('loggedUser')}</span></h1>
        <div className='escapeddelte'>
          <div className={display ? 'continerdelte' : 'notdisplay'}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Escape Time</th>
                </tr>
              </thead>
              <tbody>
                {gameList.map((game, index) => (
                  <tr key={game.id}>
                    <td>{game.date}</td>
                    <td>{game.time}</td>
                    <td>{game.timeElapsed}</td>
                    <td>
                      <button className='displayBackGroundButton' onClick={() => deleteGame(game.id)}><i className="fa-solid fa-trash-can" style={{ color: 'white' }}></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
        <div className='containerButton'>

          <Link to='/story'>
            <button className='startButton'>Start Game</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Home;