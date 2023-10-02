import { combineReducers } from 'redux';
import AppReducers from './AppReducers';
import authReducer from './authReducer';
import homeReducer from './homeReducer';

const Index = combineReducers({
    app: AppReducers,
    auth: authReducer,
    home: homeReducer,
})

export default Index;
