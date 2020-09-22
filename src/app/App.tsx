import React, { FunctionComponent } from 'react';
import {
  Switch,
  Route,
  HashRouter,
  Redirect,
} from "react-router-dom";
import './App.scss';
import Menu from './navbar/Navbar';
import Results from './results/Results';
import { dipartimenti } from '../data/dipartimenti';
import Card from 'react-bootstrap/Card';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Menu />
        <div className="container">
          <Switch>
            <Route exact path="/senato">
              <h2 className="mt-5">Senato</h2>
              <br />
              <Results anno="2018-2020" path="Senato" />
              <Results anno="2016-2018" path="Senato" />
            </Route>
            <Route exact path="/cda">
              <h2 className="mt-5">Consiglio di Amministrazione</h2>
              <br />
              <Results anno="2018-2020" path="Consiglio_di_amministrazione" />
              <Results anno="2016-2018" path="Consiglio_di_amministrazione" />
            </Route>
            <Route exact path="/dipartimenti">
              <h2 className="mt-5">Dipartimenti</h2>
              <br />
              {dipartimenti.map(d => [
                <Card body className="m-2">
                  <h3>{d.replace(/_/g, ' ')}</h3>,
              <Results anno="2018-2020" path={`dipartimenti/${d}`} />,
              <Results anno="2016-2018" path={`dipartimenti/${d}`} />
                </Card>
              ])}
            </Route>
            <Route exact path="/not-found">
              <NotFound />
            </Route>
            <Redirect to='/senato' />
          </Switch>
        </div>
      </HashRouter>
    </div>
  );
}

function NotFound() {
  return <h2>404 - Not Found</h2>;
}

export default App;
