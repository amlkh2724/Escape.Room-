import { LoggedUserContext } from '../../components/context/context';
import { Link } from 'react-router-dom';
import './Home.css';
import api from '../../api/api';
import { useEffect, useState } from 'react';

function Home() {
  const {setBombActive, setCountdown, setHoldPosition, setButtonClicked, setTimerCountrusume, setTimerOff,isLost } = LoggedUserContext();
  const [timerElapsed, setTimerElapsed] = useState(null);
  const [display, setDisplay] = useState(false);
  const [gameList, setGameList] = useState([]);

  // const { bombDisarmed } = useIsBombDisarmedContext();

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    fetchUser(userID);
    setCountdown(60);
    setBombActive(true);
    setHoldPosition({ x: 5 * 16, y: 5 * 16 });
    setButtonClicked(false);
    setTimerCountrusume(0);
    setTimerOff(true);
    fetchGames(userID, timerElapsed)
    
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
      const gameList = response.data.gameList; // Add a check for the existence of gameList
  
      if (timerElapsed !== null && isLost===true) { // Check if timerElapsed is not null
        const currentDate = formatDate(new Date());
        const currentTime = formatTime(new Date());
        const updatedGames = [
          ...gameList,
          {
            id: Date.now(),
            date: currentDate,
            time: currentTime,
            timeElapsed: timerElapsed,
          },
        ];
  
        await api.put(`/escape/${userID}`, { gameList: updatedGames }); // update the gameList in the mock API
        setGameList(updatedGames); // update the gameList state with the updated array
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

  const user = JSON.parse(localStorage.getItem('user'));
  // user.gameList.push({date:new Date(), Time:, timeElapsed: `${} seconds`});
  // DB.put(user, user.id)


  return (
    <div className='container'>
         <Link to='/'>
            <button className='startButton2'>Logout</button>
          </Link>
      <div className='fixAll'>
        <h1>Welcome, {localStorage.getItem('loggedUser')}</h1>
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
























// import { LoggedUserContext } from '../../components/context/context';
// import { Link } from 'react-router-dom';
// import './Home.css';
// import api from '../../api/api';
// import { useEffect, useState } from 'react';
// import { useIsBombDisarmedContext } from '../../components/context/isWinContext';

// function Home() {
//   const { loggedUser, setBombActive, setCountdown, setHoldPosition, setButtonClicked, setTimerCountrusume, setTimerOff } = LoggedUserContext();
//   const [timerElapsed, setTimerElapsed] = useState(null);
//   const [display, setDisplay] = useState(false);
//   const [gameList, setGameList] = useState([]);

//   // const { bombDisarmed } = useIsBombDisarmedContext();

//   useEffect(() => {
//     const userID = localStorage.getItem('userID');
//     fetchUser(userID);
//     fetchGames(userID);
//     setCountdown(60);
//     setBombActive(true);
//     setHoldPosition({ x: 0, y: 0 });
//     setButtonClicked(false);
//     setTimerCountrusume(0);
//     setTimerOff(true);
//     }, []);
    
//     const fetchUser = async (userID) => {
//     try {
//     const response = await api.get(`/escape/${userID}`);
//     const updatedTimerElapsed = response.data.timerElapsed;
//     setTimerElapsed(updatedTimerElapsed);
//     localStorage.setItem(`timerElapsed_${userID}`, updatedTimerElapsed); // store timerElapsed for this user in local storage
//     } catch (error) {
//     console.error(error);
//     }
//     };
    
//     const fetchGames = async (userID) => {
//       try {
//         const response = await api.put(`/escape/${userID}`);
//         const games = response.data.gameList;
    
//         const currentDate = formatDate(new Date());
//         const currentTime = formatTime(new Date());
//         const currentGame = {
//           date: currentDate,
//           time: currentTime,
//           timeElapsed: timerElapsed,
//         };
    
//         setGameList([...games, currentGame]); // add current game to gameList
    
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     const deleteTimer = async () => {
//     try {
//     setDisplay(true);
//     const userID = localStorage.getItem('userID');
//     await api.put(`/escape/${userID}`, { timerElapsed: null });
//     setTimerElapsed(null);
//     localStorage.removeItem(`timerElapsed_${userID}`);
//     } catch (error) {
//     console.error(error);
//     }
//     };
    
//     const formatDate = (date) => {
 
//     };
    
//     const formatTime = (date) => {

//     };
//     const user = JSON.parse(localStorage.getItem('user'));
    
//     return (
//     <div className='container'>
//     <div className='fixAll'>
//     <h1>Welcome, {localStorage.getItem('loggedUser')}</h1>
//     <div className='escapeddelte'>
//     <div className={display ? 'continerdelte' : 'notdisplay'}>
//     <table>
//     <thead>
//     <tr>
//     <th>Date</th>
//     <th>Time</th>
//     <th>Timer Elapsed</th>
//     </tr>
//     </thead>
//     <tbody>
//     {user.gameList.map((game) => (
//     <tr key={game.id}>
//     <td>{game.date}</td>
//     <td>{game.time}</td>
//     <td>{game.timeElapsed}</td>
//     </tr>
//     ))}
//     </tbody>
//     </table>
//     {/* {timerElapsed && <p>Current time: {timerElapsed} seconds</p>}
//     {timerElapsed && <button onClick={deleteTimer}>Delete</button>} */}
//     </div>
//     </div>
//     <Link to='/story'>Go to Room1</Link>
//   </div>
// </div>
// );
// }

// export default Home;






// import { LoggedUserContext } from '../../components/context/context';
// import { Link } from 'react-router-dom';
// import './Home.css';
// import api from '../../api/api';
// import { useEffect, useState } from 'react';
// import { useIsBombDisarmedContext } from '../../components/context/isWinContext';

// function Home() {
//   const { setBombActive, setCountdown, setHoldPosition, setButtonClicked, setTimerCountrusume, setTimerOff } = LoggedUserContext();
//   const [timerElapsed, setTimerElapsed] = useState(null);
//   const [display, setDisplay] = useState(false);
// const [currentGames,setCurrentGames]=useState([])
//   // const { bombDisarmed } = useIsBombDisarmedContext();

//   useEffect(() => {
//     const userID = localStorage.getItem('userID');
//     fetchUser(userID);
//     setCountdown(60);
//     setBombActive(true);
//     setHoldPosition({ x: 0, y: 0 });
//     setButtonClicked(false);
//     setTimerCountrusume(0);
//     setTimerOff(true);
//   }, []);

//   const fetchUser = async (userID) => {
//     try {
//       const response = await api.get(`/escape/${userID}`);
//       const updatedTimerElapsed = response.data.timerElapsed;
//       console.log("updatedTimerElapsed:",updatedTimerElapsed);
//       setTimerElapsed(updatedTimerElapsed);
//       localStorage.setItem(`timerElapsed_${userID}`, updatedTimerElapsed); // store timerElapsed for this user in local storage
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteTimer = async () => {
//     try {
//       setDisplay(true);
//       const userID = localStorage.getItem('userID');
//       await api.put(`/escape/${userID}`, { timerElapsed: null });
//       setTimerElapsed(null);
//       localStorage.removeItem(`timerElapsed_${userID}`);
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   return (
//     <div className='container'>
//       <div className='fixAll'>
//         <h1>Welcome, {localStorage.getItem('loggedUser')}</h1>
//         <div className='escapeddelte'>
//           <div className={display ? 'continerdelte' : 'notdisplay'}>
//             <table>
//               <thead>

//               </thead>
//               <tbody>
//                 <tr><td>10/03/2023</td><td>22:00</td><td>15 seconds</td></tr>
//                 <tr><td>05/03/2023</td><td>23:00</td><td>21 seconds</td></tr>
//                 <tr><td>05/03/2023</td><td>12:00</td><td>21 seconds</td></tr>
//                 <tr><td>05/03/2023</td><td>13:00</td><td>21 seconds</td></tr>
//               </tbody>
//             </table>
//                {/* { timerElapsed && <p>Current time: {timerElapsed} seconds</p>}
//                { timerElapsed && <button onClick={deleteTimer}>Delete</button>} */}
//           </div>
//         </div>

//         <Link to='/story'>Go to Room1</Link>
//       </div>
//     </div>
//   );
// }

// export default Home;










// // "gameInfo":[{date, time, escapeTime}]
