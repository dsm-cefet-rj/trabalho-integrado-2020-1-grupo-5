import {string, object, number, file,setLocale} from 'yup';
import { ptForm } from 'yup-locale-pt';
import { date } from 'yup-locale-pt/lib/locale';

setLocale(ptForm)

export let timeSchema = object().shape(
    {
        id: number(),
        nome: string().required().max(50)
    }
)