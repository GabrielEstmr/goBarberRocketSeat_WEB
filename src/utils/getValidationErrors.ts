import { ValidationError } from 'yup';

//IMportante: aqui: Errors composto de objeto com diversos parâmetros string:string
interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
    const validationErrors: Errors = {};

    err.inner.forEach(e => {
        if (e.path) {
            validationErrors[e.path] = e.message;
        }
    });



    return validationErrors;
}