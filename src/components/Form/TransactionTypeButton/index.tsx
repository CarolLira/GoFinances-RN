import React from 'react';

import {
    Container,
    Button,
    Icon,
    Title
} from './styles';

import { Props } from './interfaces';

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
    return (
        <Container
            type={type}
            isActive={isActive}
        >
            <Button
                {...rest}
            >
                <Icon
                    name={icons[type]}
                    type={type}
                />
                <Title>
                    {title}
                </Title>
            </Button>
        </Container>
    );
}