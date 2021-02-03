import styled from 'styled-components';

import signInBackground from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;//Importante > pesquisar sobre > alinha tudo de uma vez
    width: 100%;//Layout celular
    max-width: 700px;//Se passa da largura do celular
    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        h1 {
            margin-bottom: 24px;
        }
        a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
            &:hover {
                color: rgba(244, 237, 232,0.8);
            }
        }
    }
    > a {//">" IMPORTANTE: > = apenas TAGS que vem DIRETAMENTE dentro do CONTENT e nao as outras que vem dentro de outro elemento que faz parte dessa CONST
        color: #ff9000;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        svg {
            margin-right: 16px;
        }
        &:hover {
        color: rgba(255,144,0,0.8);
    }
}
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackground}) no-repeat center;
    background-size: cover;
`;