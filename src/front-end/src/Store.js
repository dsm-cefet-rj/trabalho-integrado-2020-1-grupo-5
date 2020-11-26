import { configureStore } from '@reduxjs/toolkit'
import partidasReducer from './components/partidas/PartidasSlice'
import jogadoresReducer from './components/jogadores/JogadoresSlice'
import timesReducer from './components/times/TimesSlice'
import admsReducer from './components/adms/AdmsSlice'

export const store = configureStore({
    reducer: {
        partidas: partidasReducer,
        jogadores: jogadoresReducer,
        times: timesReducer,
        adms: admsReducer
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})