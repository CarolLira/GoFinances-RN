import React from 'react';

import {
    Container,
    Title,
    Amount,
} from './styles';

import { Props } from './interfaces';

export function HistoryCard({
    title,
    amount,
    color
}: Props) {
    return (
        <Container
            color={color}
        >
            <Title>{title}</Title>
            <Amount>{amount}</Amount>
        </Container>
    );
}