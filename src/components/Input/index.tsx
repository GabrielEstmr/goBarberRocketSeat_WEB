import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';//Pegando propriedades de Input tradicional do React
import { IconBaseProps } from 'react-icons';//Pegando props de uma biblioteca
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

//icon: React.ComponentType<IconBaseProps>; agregando propriedade do icone a um componente do React


import { Container, Error } from './styles';

// useRef > cria referência a um elemento em específica na DOM

// IMPORTANTE: Pegando propriedades de Input tradicional do React
// Ai podemos alem disso ADICIONAR/SUBSCREVER outras propriedades tbm
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;//subcrevendo prop name e tornando-a obrigatoria > quando coloca aqui fica obrigatoria
    icon: React.ComponentType<IconBaseProps>;//Quando queremos receber um Componente como propriedade
}

//Obervações:
// Icon: mauisculo para o React entender que é component
//

//

//IMPORTANTE: RENDERIZAÇÂO: ou State, ou Propriedade, ou componente PAI > renderizado outra vez
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
    const inputRef = useRef<HTMLInputElement>(null);//como se tivesse usando queryselector('id)

    const [isFocused, SetIsFocused] = useState(false);//False = Começa como false
    const [isFilled, SetIsFilled] = useState(false);//False = Começa como false

    const { fieldName, defaultValue, error, registerField } = useField(name);


    // IMPORTANTE: useCallback  =  useEffect mas para funções > [] = nunca é recriada
    // SEMPREEEE QUE FOR CRIAR FUNCÇÃO DENTRO DE UM COMPONENTE!!!
    const handleInputBlur = useCallback(() => {
        SetIsFocused(false)

        SetIsFilled(!!inputRef.current?.value);//Tranformando valor em booleano
    }, [])


    const handleInputFocus = useCallback(() => {
        SetIsFocused(true)
    }, [])

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'//queryselector.value
        });
    }, [fieldName, registerField]);

    return (

        <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
            {Icon && <Icon size={20} />}
            <input onFocus={() => { handleInputFocus() }} onBlur={() => { handleInputBlur() }} defaultValue={defaultValue} ref={inputRef}{...rest}></input>
            {error && (
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
        </Container>

    )
};

export default Input;


// onBlur >>> quando Perdeu o Foco