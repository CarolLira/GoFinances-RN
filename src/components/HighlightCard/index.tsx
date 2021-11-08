import React from "react";
import { ICard } from "./interfaces";

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from './styles';

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighlightCard({
    type,
    title,
    amount,
    lastTransaction
}: ICard) {
    return (
        <Container type={type}>
            <Header>
                <Title
                    type={type}
                >{title}</Title>
                <Icon
                    name={icon[type]}
                    type={type}
                />
            </Header>
            <Footer>
                <Amount
                    type={type}
                >{amount}</Amount>
                <LastTransaction
                    type={type}
                >{lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    );
}