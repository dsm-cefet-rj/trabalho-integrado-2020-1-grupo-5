import React, {useState} from 'react';
import ListagemPartidas from './partidas/TabelaPartidas';
import FormPartida from './partidas/FormPartida';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from "react-router-dom";

const App = (props) => {
  const [partidas, setPartidas] = useState(
    [ {data:'31/10/2020', arbitro:'', local: '', time_A:'Barcelona', gols_time_A:1, gols_time_B:1, time_B:'M. City', jogador_A:'', jogador_B:'', gols_jogador_A: '',gols_jogador_B: ''},
      {data:'07/11/2020', time_A:'Barcelona', gols_time_A:4, gols_time_B:3, time_B:'M. City'},
      {data:'14/11/2020', time_A:'Barcelona', gols_time_A:3, gols_time_B:3, time_B:'M. City'} ]
  );

  return( <>
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
                  <Route path="/partidas/novo"><FormPartida partidas={partidas} setPartidas={setPartidas}/></Route>
                  <Route path="/partidas"><ListagemPartidas partidas={partidas} setPartidas={setPartidas}/></Route>
                  <Route path="/"><ListagemPartidas partidas={partidas} setPartidas={setPartidas}/></Route>
                </Switch>
              </div>
            </Router>
          </>
        ); 
}

export default App;
