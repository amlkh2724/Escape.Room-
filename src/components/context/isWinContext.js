import { useState, createContext, useContext } from "react";

const IsBombDisarmedContext = createContext();

const IsBombDisarmedProvider = ({ children }) => {
  const [bombDisarmed, setBombDisarmed] = useState(false); // set the bomb to not disarmed

  return (
    <IsBombDisarmedContext.Provider
      value={{
        bombDisarmed,
        setBombDisarmed,
      }}
    >
      {children}
    </IsBombDisarmedContext.Provider>
  );
};

export const useIsBombDisarmedContext = () => {
  return useContext(IsBombDisarmedContext)
}

export {IsBombDisarmedProvider}