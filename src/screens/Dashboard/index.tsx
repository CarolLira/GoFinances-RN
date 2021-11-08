import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import { IListData } from './interfaces';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    CardsContainer,
    Transactions,
    Title,
    TransactionList
} from './styles';

export function Dashboard() {
    const data: IListData[] = [
        {
            id: '1',
            type: 'positive',
            title: 'Salário',
            amount: 'R$ 12.000,00',
            category: {
                name: 'Vendas',
                icon: 'dollar-sign'
            },
            date: '13/04/2020'
        },
        {
            id: '2',
            type: 'negative',
            title: 'Hamburgueria Pizzy',
            amount: 'R$ 59,00',
            category: {
                name: 'Alimentação',
                icon: 'coffee'
            },
            date: '10/04/2020'
        },
        {
            id: '3',
            type: 'negative',
            title: 'Aluguel do apartamento',
            amount: 'R$ 1.200,00',
            category: {
                name: 'Casa',
                icon: 'home'
            },
            date: '10/04/2020'
        }];

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/49501070?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Carol</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power" />
                </UserWrapper>
            </Header>
            <CardsContainer>
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard
                    type="down"
                    title="Saídas"
                    amount="R$ 1.259,00"
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransaction="Última entrada dia 13 de abril"
                />
            </CardsContainer>
            <Transactions>
                <Title>Histórico</Title>
                <TransactionList
                    keyExtractor={item => item.id}
                    data={data}
                    renderItem={({ item }) => (
                        <TransactionCard
                            data={item}
                        />
                    )}
                />
            </Transactions>
        </Container>
    )
}

