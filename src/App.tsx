import React from 'react';
import {Provider} from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./store";
import Root from "./components/unknown/Root";

function App() {
  return (
    <Provider store={store}>
      <Router basename={'/'}>
        <Root/>
      </Router>
    </Provider>
  );
}

export default App;
