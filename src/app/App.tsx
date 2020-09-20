import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.scss';
import Menu from './navbar/Navbar';
import Results from './results/Results';
import { dipartimenti } from '../data/dipartimenti';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Switch>
          <Route path="/senato">
            <h2 className="mt-5">Senato</h2>
            <br />
            <Results anno="2018-2020" path="Senato" />
            <Results anno="2016-2018" path="Senato" />
          </Route>
          <Route path="/cda">
            <h2 className="mt-5">Consiglio di Amministrazione</h2>
            <br />
            <Results anno="2018-2020" path="Consiglio_di_amministrazione" />
            <Results anno="2016-2018" path="Consiglio_di_amministrazione" />
          </Route>
          <Route path="/dipartimenti">
            <h2 className="mt-5">Dipartimenti</h2>
            <br />
            {dipartimenti.map(d => [
              <h3>{d.replace(/_/g, ' ')}</h3>,
              <Results anno="2018-2020" path={`dipartimenti/${d}`} />,
              <Results anno="2016-2018" path={`dipartimenti/${d}`} />
            ])}
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Redirect to='/senato' />
        </Switch>
      </Router>
    </div>
  );
}

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

export default App;
