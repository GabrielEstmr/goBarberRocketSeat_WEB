import React, { ButtonHTMLAttributes } from 'react';//Pegando propriedades de Input tradicional do React

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; //Igual interface mas sem mudar nenhuma prop

//type="button" > pois tem que passar > se passar outra coisa o {...props} subscreve
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container type="button" {...rest}>{children}</Container>
);

export default Button;