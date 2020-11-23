import React from 'react';
import {store} from './Store';
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import ListagemPartidas from './components/partidas/TabelaPartidas';
import FormPartida, {VisualizarPartida} from './components/partidas/FormPartida';
import ListagemJogadores from './components/jogadores/TabelaJogadores';
import FormJogador, {VisualizarJogador} from './components/jogadores/FormJogador';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//importe as cores que selecionou anteriormente
import {lightGreen, orange} from '@material-ui/core/colors';

let theme = createMuiTheme({
 
  palette: {
    primary: {
      main: lightGreen[500],
    },
    secondary: {
      main: orange[800],
    },
  },
});

theme = responsiveFontSizes(theme);

const App = (props) => {
  return( <>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Provider store={store}>
              <Container maxWidth="sm">
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
                    
                    <Route exact path="/partidas/novo"><FormPartida/></Route>
                    <Route exact path="/partidas/:id"><FormPartida/></Route>
                    <Route exact path="/partidas/visualizar/:id"><VisualizarPartida/></Route>
                    <Route exact path="/partidas"><ListagemPartidas/></Route>
                    
                    <Route exact path="/jogadores/novo"><FormJogador/></Route>
                    <Route exact path="/jogadores/:id"><FormJogador/></Route>
                    <Route exact path="/jogadores/visualizar/:id"><VisualizarJogador/></Route>
                    <Route exact path="/jogadores"><ListagemJogadores/></Route>
                  </Switch>
                </div>
              </Router>
              </Container>
              </Provider>
            </ThemeProvider>
          </>
        ); 
}

export default App;
