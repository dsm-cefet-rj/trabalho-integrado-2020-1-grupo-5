import {string, object, number, setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';
import { date } from 'yup-locale-pt/lib/locale';

setLocale(ptForm)

export let jogadorSchema = object().shape(
    {
        id: number(),
        data_nascimento: string().required(),
        nome: string().required().max(30)
    }
)