import type { useAppProps } from 'antd/es/app/context';

import type { Service } from '@internal-types/Service.type';

export type MakeMessage = (response: Service.ServerException) => string | null;

export function hasServiceError(response: Service.DefaultResponse | Service.ExceptionResponse): response is Service.ExceptionResponse {
    if (response instanceof Error)
        return true;

    if ('error' in response)
        return true;

    return false;
}

/** @warning Depends on React and Antd! */
export function handleServiceError({ notification }: useAppProps, response: Service.ExceptionResponse, makeMessage?: MakeMessage): void {
    console.log('%cA service error has been detected!', 'background-color: #871f1f; color: white');

    const rawMessage =
        response instanceof Error
            ? response.message
            : response.error?.description ?? 'Erro desconhecido';

    let customMessage = rawMessage;

    if (rawMessage.includes('Invalid ZIP code format')) {
        customMessage = 'CEP inválido. Use apenas números (8 dígitos).';
    }

    if (rawMessage.includes('Duplicate entry')) {
        customMessage = 'Já existe um condomínio com essa URL.';
    }

    if (makeMessage !== undefined && !(response instanceof Error)) {
        customMessage = makeMessage(response) ?? customMessage;
    }

    notification.error({
        message: 'Algo deu errado!',
        description: customMessage,
    });
}