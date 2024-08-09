import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function HomePage() {
  return <h1>Home Page</h1>;
}

function LeaveRequest() {
  return <h1>Leave Request Page</h1>;
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/leave-request" component={LeaveRequest} />
      </Switch>
    </Router>
  );
}

export default App;
