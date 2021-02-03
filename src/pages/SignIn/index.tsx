import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
// import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import { Container, Content, Background } from './styles';


interface SignInFormData {
    email: string;
    password: string;
}


const SignIn: React.FC = () => {


    const formRef = useRef<FormHandles>(null);

    // const { signIn } = useContext(AuthContext);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();


    // console.log(name);

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required('E-mail obrigatório'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            //Chamando Validação
            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            //Disparar toast
            console.log('passou')
            addToast({
                type: 'error',
                title: 'Erro na autentificação',
                description: 'Cheque as credenciais.'
            });
        }
    }, [signIn, addToast, history]);


    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    {/* <input placeholder="E-mail" />

                    <input type="password" placeholder="Senha" />

                    <button type="submit">Entrar</button> */}


                    <Input name="email" icon={FiMail} placeholder="E-mail"></Input>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"></Input>
                    <Button type="submit">Entrar</Button>

                    {/* <button type="submit">Entrar</button> */}

                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <Link to="/signup">
                    <FiLogIn />
                    Criar conta
                </Link>
            </Content>

            <Background />
        </Container>
    );
};

export default SignIn;