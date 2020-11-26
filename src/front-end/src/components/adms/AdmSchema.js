import {string, object, number, setLocale, date} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

function formatDate(date) {
    return new Date(date).toLocaleDateString()
  }

const today= new Date();

export let admSchema = object().shape(
    {
        id: number(),
        nome: string().required().max(50),
        usuario: string().required().max(50),
        senha: string().required().min(8).max(50)
    }
)