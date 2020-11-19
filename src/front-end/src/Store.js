import { configureStore } from '@reduxjs/toolkit'
import partidasReducer from './components/partidas/PartidasSlice'

export const store = configureStore({
    reducer: {
        partidas: partidasReducer 
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})