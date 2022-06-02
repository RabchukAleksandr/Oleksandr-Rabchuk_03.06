import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom';
import store from "./store";
import Root from "./components/unknown/Root";
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

let persistor = persistStore(store);


function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router basename={'/'}>
                    <Root/>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
