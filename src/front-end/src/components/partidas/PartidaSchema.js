import {string, object, number, setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';
import { date } from 'yup-locale-pt/lib/locale';

setLocale(ptForm)

export let partidaSchema = object().shape(
    {
        id: number(),
        data: string().required(),
        arbitro: string().required().max(30),
        local: string().required().max(30),
        gols_time_A: number().required().max(99)
    }
)