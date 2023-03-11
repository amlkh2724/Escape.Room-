import { useState, createContext, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const[isOnline,SetOnline]=useState(false)
  const [countdown, setCountdown] = useState(60); // start the countdown at 60 seconds
  const [bombActive, setBombActive] = useState(true); // set the bomb to active
  const [holdPosition, setHoldPosition] = useState({ x: 0, y: 0 }); // set initial hold button position to top-left
  const [buttonClicked, setButtonClicked] = useState(false);
  const [timerCount3, setTimerCountrusume] = useState(0);
  const [timerOff, setTimerOff] = useState(true);
  const [holdButtonInPosition, setHoldButtonInPosition] = useState(false);
  const [isLost,setIsLost]=useState(false)

  return (
    <AppContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        countdown,
        setCountdown,
        bombActive,
        setBombActive,
        holdPosition,
        setHoldPosition,
        buttonClicked,
        setButtonClicked,
        timerCount3,
        setTimerCountrusume,
        timerOff,
        setTimerOff,
        holdButtonInPosition,
        setHoldButtonInPosition,
        isLost,
        setIsLost,
        isOnline,
        SetOnline


      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const LoggedUserContext = () => {
  return useContext(AppContext)
}

export {AppProvider}