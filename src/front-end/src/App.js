import React, {useState} from 'react';
import {store} from './Store';
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from './components/layout/AppBar';
import Drawer from './components/layout/Drawer';

import ListagemPartidas from './components/partidas/TabelaPartidas';
import FormPartida, {VisualizarPartida} from './components/partidas/FormPartida';

import ListagemJogadores from './components/jogadores/TabelaJogadores';
import FormJogador, {VisualizarJogador} from './components/jogadores/FormJogador';

import ListagemTimes from './components/times/TabelaTimes';
import FormTime, {VisualizarTime} from './components/times/FormTime';

import ListagemAdms from './components/adms/TabelaAdms';
import FormAdm, {VisualizarAdm} from './components/adms/FormAdm';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//importe as cores que selecionou anteriormente
import {lightGreen} from '@material-ui/core/colors';

let theme = createMuiTheme({
 
  palette: {
    primary: {
      main: lightGreen[500],
    },
    secondary: {
      main: lightGreen[800],
    },
  },
});

theme = responsiveFontSizes(theme);


const App = (props) => {
  //estado do drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  //handler de abrir e fechar o drawer
  const toggleDrawerHandler = (open) => (event) => {
    if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) {
        return;
    }
    setDrawerOpen(open);
  };
  return( <>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Provider store={store}>
              <Container maxWidth="sm">
              <Router>
                <div>
                <AppBar toggleDrawerHandler={toggleDrawerHandler} />
                <Drawer open={drawerOpen} toggleDrawerHandler={toggleDrawerHandler} />
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

                    <Route exact path="/times/novo"><FormTime/></Route>
                    <Route exact path="/times/:id"><FormTime/></Route>
                    <Route exact path="/times/visualizar/:id"><VisualizarTime/></Route>
                    <Route exact path="/times"><ListagemTimes/></Route>

                    <Route exact path="/adms/novo"><FormAdm/></Route>
                    <Route exact path="/adms/:id"><FormAdm/></Route>
                    <Route exact path="/adms/visualizar/:id"><VisualizarAdm/></Route>
                    <Route exact path="/adms"><ListagemAdms/></Route>
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
