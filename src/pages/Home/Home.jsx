import { LoggedUserContext } from '../../components/context/context';
import { Link } from 'react-router-dom';
import './Home.css';
import api from '../../api/api';
import { useEffect, useState } from 'react';
import { useIsBombDisarmedContext } from '../../components/context/isWinContext';
function Home() {
  const { loggedUser,setBombActive,setCountdown,setHoldPosition ,setButtonClicked,setTimerCountrusume,setTimerOff} = LoggedUserContext();
  console.log("you logges is:", loggedUser);
  const [timerElapsed, setTimerElapsed] = useState(loggedUser.timerElapsed);
  const [display, setdisplay] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  // CONST [USERID, SETUSERID] = USESTATE(NULL)
  const { bombDisarmed, setBombDisarmed } = useIsBombDisarmedContext()

  /* USEEFFECT{()=>{
    CONST USERFROMLOCALSTORAGE = ocalStorage.getItem('userID') || NULL;
    IF(USERFROMLOCALSTORAGE){
      SETUSERID(USERFROMLOCALSTORAGE)
    } ELSE {
      NAVIGATE('/')
    }
  },[]}
  */
useEffect(()=>{
  setCountdown(60)
  setBombActive(true)
  setHoldPosition({ x: 0, y: 0 })
  setButtonClicked(false)
  setTimerCountrusume(0)
  setTimerOff(true)

},[])
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
        <h1>Welcome, {localStorage.getItem('loggedUser')}</h1>
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



// const { 
//   setTimerCountrusume,
//   setCountdown,
//   countdown,
//   setBombActive,
//   setHoldPosition,
//   holdPosition, 
//   setHoldButtonInPosition,
//   buttonClicked,
//   holdButtonInPosition,
//   setTimerOff,
//   bombActive

// } = LoggedUserContext();
// useEffect(() => {
//   localStorage.setItem('counter', '0');
//   // setBombDisarmed(false)
  
// }, []);


// const [countdown, setCountdown] = useState(100); // start the countdown at 60 seconds
// const [bombActive, setBombActive] = useState(true); // set the bomb to active
// const [holdPosition, setHoldPosition] = useState({ x: 0, y: 0 }); // set initial hold button position to top-left
// const [buttonClicked, setButtonClicked] = useState(false);
// const [timerCount3, setTimerCountrusume] = useState(0);
// const [timerOff, setTimerOff] = useState(true);



// const navigate = useNavigate();

// import { useNavigate } from 'react-router-dom';

// <button onClick={() => navigate('/room2')}>Submit</button>