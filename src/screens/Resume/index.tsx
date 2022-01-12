import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';

import {
    Container,
    Header,
    Title,
} from './styles';

export function Resume() {
    return (
        <Container>
            <Header>
                <Title>Resumo por categoria</Title>
            </Header>
            <HistoryCard
                title="Casa"
                amount="R$ 1200"
                color="purple"
            />
        </Container>
    );
}