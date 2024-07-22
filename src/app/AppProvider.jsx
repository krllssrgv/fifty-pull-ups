import { useState, createContext } from "react";

const AppContext = createContext();

function AppProvider(props) {
    const [isDataLoaded, setIsDataLoaded] = useState(false),

          [name, setName] = useState(),
          [surname, setSurname] = useState(),
          [email, setEmail] = useState(),
          [confirmed, setConfirmed] = useState(),
          [progress, setProgress] = useState(),
          [finish, setFinish] = useState(),

          [isSuccess, setIsSuccess] = useState(false),
          [types, setTypes] = useState(),
          [days, setDays] = useState(),
          [week, setWeek] = useState();


    return(
        <AppContext.Provider value={{
            isDataLoaded, setIsDataLoaded,
            name, setName,
            surname, setSurname,
            email, setEmail,
            confirmed, setConfirmed,
            progress, setProgress,
            finish, setFinish,
            isSuccess, setIsSuccess,
            types, setTypes,
            days, setDays,
            week, setWeek
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider};