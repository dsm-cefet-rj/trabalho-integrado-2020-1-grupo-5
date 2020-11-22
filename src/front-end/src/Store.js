import { configureStore } from '@reduxjs/toolkit'
import partidasReducer from './components/partidas/PartidasSlice'
import jogadoresReducer from './components/jogadores/JogadoresSlice'

export const store = configureStore({
    reducer: {
        partidas: partidasReducer,
        jogadores: jogadoresReducer
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})