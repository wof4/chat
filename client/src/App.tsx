import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainPage from './components/pages/main/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/chat" component={MainPage} />
        <Route path="/" render={() => <Redirect to="/chat" />} />
      </Switch>

    </BrowserRouter>
  );
};

export default App;
