import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Provider } from 'react-redux';
import App from './container/App';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { initQuestionTypes } from './actions/initAction';
import Play from './pages/Details/PlayView'



export default class Temple extends Component {


    componentDidMount() {
        store.dispatch(initQuestionTypes())
    }



    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                    <Play />
                </PersistGate>
            </Provider>
        )
    }
}