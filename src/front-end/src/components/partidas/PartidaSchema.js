import {string, object, number, setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';
import { date } from 'yup-locale-pt/lib/locale';

setLocale(ptForm)

export let partidaSchema = object().shape(
    {
        id: number(),
        data: string().required(),
        arbitro: string().required().max(50),
        local: string().required().max(50),
        time_A: string().required().max(50),
        gols_time_A: number().required().min(0).max(99),
        time_B: string().required().max(50),
        gols_time_B: number().required().min(0).max(99),
    }
)