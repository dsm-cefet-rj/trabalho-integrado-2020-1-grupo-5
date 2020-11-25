import { configureStore } from '@reduxjs/toolkit'
import partidasReducer from './components/partidas/PartidasSlice'
import jogadoresReducer from './components/jogadores/JogadoresSlice'
import timesReducer from './components/times/TimesSlice'

export const store = configureStore({
    reducer: {
        partidas: partidasReducer,
        jogadores: jogadoresReducer,
        times: timesReducer
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})