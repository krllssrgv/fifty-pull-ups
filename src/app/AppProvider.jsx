import { useState, createContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
    isDataLoaded: false,
    user: {
        name: undefined,
        surname: undefined,
        email: undefined,
        confirmed: undefined,
        progress: undefined,
        finish: undefined,
        isSuccess: undefined,
        s: undefined
    },
    acts: {
        types: undefined,
        days: undefined,
        week: undefined
    }
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {...state, user: action.payload};
        case 'SET_ACTS':
            return {...state, acts: action.payload};
        case 'SET_DATA_LOADED':
            return {...state, isDataLoaded: action.payload};
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}

function AppProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider};