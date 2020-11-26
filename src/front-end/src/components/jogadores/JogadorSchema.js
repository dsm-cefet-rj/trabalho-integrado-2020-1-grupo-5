import {string, object, number, setLocale, date} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

const today= new Date();

export let jogadorSchema = object().shape(
    {
        id: number(),
        data_nascimento: date().required(),
        nome: string().required().max(50)
    }
)