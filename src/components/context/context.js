import { useState, createContext, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <AppContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
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