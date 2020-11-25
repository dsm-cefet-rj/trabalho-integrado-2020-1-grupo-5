import {string, object, number, setLocale, date} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }

const today= new Date();

export let jogadorSchema = object().shape(
    {
        id: number(),
        data_nascimento: date().required().min(formatDate("1900-01-01T00:00:00.000Z")).max(formatDate(today)),
        nome: string().required().max(50)
    }
)