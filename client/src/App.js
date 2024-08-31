import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './pages/Game';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/game" component={Game} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
};

export default App;
