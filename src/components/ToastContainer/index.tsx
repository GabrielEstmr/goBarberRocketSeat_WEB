import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles';

// Importação de Interfaces
import { ToastMessage, useToast } from '../../context/toast'

interface ToastContainerProps {
    messages: ToastMessage[];//array de ToastMessage
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    const { removeToast } = useToast();

    // const handleRemoveToast = useCallback((id: string) => {
    //     removeToast(id)
    // }, [])


    //onClick={() => { removeToast(e.id) }} para nao executar quando carregar

    return (
        <Container>
            {messages.map(e => (
                < Toast key={e.id} type={e.type} hasDescription={!!e.description}>
                    <FiAlertCircle size={20} />
                    <div>
                        <strong>{e.title}</strong>
                        <p>{e.description}</p>
                    </div>

                    <button onClick={() => { removeToast(e.id) }} type="button">
                        <FiXCircle size={18} />
                    </button>
                </Toast>
            ))
            }
        </Container >
    );
};

export default ToastContainer;