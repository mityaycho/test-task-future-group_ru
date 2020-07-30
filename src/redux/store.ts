import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { tableReducer } from './setTable-reducer';



const reducers = combineReducers({
	tablePage: tableReducer
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppStateType = ReturnType<typeof reducers>;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
