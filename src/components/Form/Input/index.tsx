import React from 'react';

import {
    Container
} from './styles';

import { Props } from './interfaces';

export function Input({
    ...rest
}: Props) {
    return (
        <Container
            {...rest}
        />
    );
}