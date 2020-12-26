import {string, object, number, setLocale, date, array} from 'yup';
import { ptForm } from 'yup-locale-pt';
setLocale(ptForm)

function formatDate(date) {
    return new Date(date).toLocaleDateString()
}

const today= new Date();
const mindate = "2000-01-01T00:00:00.000Z"

export let partidaSchema = object().shape(
    { 
        id: string(),
        data: date()
            .min(mindate,({min}) => `O campo deve ser posterior a ${formatDate(mindate)}`, )
            .max(today,({max}) =>`O campo deve ser anterior ao dia de hoje!`,)
            .typeError('O campo é obrigatório.')
            .required(),
        arbitro: string().required().max(50),
        local: string().required().max(50),
        time_A: string().required(),
        gols_time_A: number().required().min(0).max(99).typeError('O campo é obrigatório.'),
        time_B: string().required(),
        gols_time_B: number().required().min(0).max(99).typeError('O campo é obrigatório.'),
        jogador_time_A: array().of(
            string().required(),
        )
            .required(),
        jogador_time_B: array().of(
            string().required(),
        )
            .required()
    }
)