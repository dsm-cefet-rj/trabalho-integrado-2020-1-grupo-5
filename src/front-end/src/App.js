import React from 'react';
import ListagemPartidas from './components/partidas/TabelaPartidas';
import FormPartida from './components/partidas/FormPartida';
import {store} from './Store';
import {Provider} from 'react-redux'
import {fetchPartidas} from './components/partidas/PartidasSlice'
import ListagemJogadores from './components/jogadores/TabelaJogadores';
import FormJogador from './components/jogadores/FormJogador';
import {fetchJogadores} from './components/jogadores/JogadoresSlice'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from "react-router-dom";

store.dispatch(fetchPartidas());
store.dispatch(fetchJogadores());

const App = (props) => {
  return( <>
            <Provider store={store}>
              <Router>
                <div>
                  <nav>
                    <ul>
                      <li><Link to="/">Partidas</Link></li>
                      <li><Link to="/partidas/novo">Ranking</Link></li>
                      <li><Link to="/jogadores">Cadastros</Link></li>
                    </ul>
                  </nav>
                  <Switch>
                    <Route exact path="/"><ListagemPartidas/></Route>
                    <Route exact path="/partidas"><ListagemPartidas/></Route>
                    <Route exact path="/partidas/novo"><FormPartida/></Route>
                    <Route exact path="/partidas/:id"><FormPartida/></Route>            
                    <Route exact path="/jogadores"><ListagemJogadores/></Route>
                    <Route exact path="/jogadores/novo"><FormJogador/></Route>
                    <Route exact path="/jogadores/:id"><FormJogador/></Route>
                  </Switch>
                </div>
              </Router>
            </Provider>
          </>
        ); 
}

export default App;
