import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../context/toast';
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import api from '../../services/api';



// import { useAuth } from '../../context/AuthContext';


interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}



const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);//do tipo FormHandles > para dar tipagem
    console.log(formRef);
    const { addToast } = useToast();
    const history = useHistory();

    // const { signIn } = useAuth();

    const handlerSubmit = useCallback(async (data: SignUpFormData) => {
        try {

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required('E-mail obrigatório'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            addToast({
                type: 'success',
                title: 'Cadastro realizado com sucesso',
                description: 'Voce já pode fazer seu logon no GoBarber',
            });
            history.push('/');

            await api.post('/users', data)


            // //Chamando Validação
            // signIn({
            //     email: 'aushauhsa@email.com',
            //     password: 'auuauauauauaua'
            // });





        } catch (err) {
            // //console.log(err);

            // // const errors = getValidationErrors(err);

            // // formRef.current?.setErrors(errors);

            // if (err instanceof Yup.ValidationError) {
            //     const errors = getValidationErrors(err);

            //     formRef.current?.setErrors(errors);
            // }

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            //Disparar toast
            console.log('passou')
            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Erro ao fazer cadastro.'
            });
        }
    }, [addToast, useHistory]);



    return (
        <Container>
            <Background />


            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handlerSubmit}>
                    <h1>Faça seu cadastro</h1>

                    <Input name="name" icon={FiUser} type="text" placeholder="Nome"></Input>
                    <Input name="email" icon={FiMail} placeholder="E-mail"></Input>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"></Input>
                    <Button type="submit">Cadastrar</Button>


                </Form>

                <Link to="/"><FiArrowLeft />Voltar paga logon</Link>
            </Content>


        </Container>
    );
};

export default SignUp;