import React from 'react';
import ListagemPartidas from './components/partidas/TabelaPartidas';
import FormPartida from './components/partidas/FormPartida';
import {store} from './Store';
import {Provider} from 'react-redux'
import {fetchPartidas} from './components/partidas/PartidasSlice'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from "react-router-dom";

store.dispatch(fetchPartidas());

const App = (props) => {
  return( <>
            <Provider store={store}>
              <Router>
                <div>
                  <nav>
                    <ul>
                      <li><Link to="/">Partidas</Link></li>
                      <li><Link to="/partidas/novo">Ranking</Link></li>
                      <li><Link to="/partidas">Cadastros</Link></li>
                    </ul>
                  </nav>
                  <Switch>
                    <Route path="/partidas/novo"><FormPartida/></Route>
                    <Route path="/partidas/:id"><FormPartida/></Route>
                    <Route path="/partidas"><ListagemPartidas/></Route>
                    <Route path="/"><ListagemPartidas/></Route>
                  </Switch>
                </div>
              </Router>
            </Provider>
          </>
        ); 
}

export default App;
