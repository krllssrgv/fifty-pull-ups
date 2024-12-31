import { createContext, useReducer } from "react";
import type { Dispatch, ReactNode, FC } from "react";

type State = {
    isDataLoaded: boolean,
    user: {
        name: string,
        surname: string,
        email: string,
        confirmed: string,
        progress: string,
        finish: string,
        isSuccess: string,
        s: string
    },
    acts: {
        types: string,
        days: string,
        week: string
    }
};

const initialState: State = {
    isDataLoaded: false,
    user: {
        name: '',
        surname: '',
        email: '',
        confirmed: '',
        progress: '',
        finish: '',
        isSuccess: '',
        s: ''
    },
    acts: {
        types: '',
        days: '',
        week: ''
    }
};

type Action =
    | {type: 'SET_USER'; payload: any}
    | {type: 'SET_ACTS'; payload: any}
    | {type: 'SET_DATA_LOADED'; payload: any}
    | {type: 'RESET_STATE'; payload: any};


const reducer = (state: State, action: Action) => {
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

type AppContextType = {
    state: State,
    dispatch: Dispatch<Action>
};

const AppContext = createContext<AppContextType | undefined>(undefined);


const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };