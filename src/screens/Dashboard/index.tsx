import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    LogoutButton,
    Icon,
    CardsContainer,
    Transactions,
    Title,
    TransactionList
} from './styles';

export function Dashboard() {
    const [data, setData] = useState<IListData[]>([]);

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: IListData[]  = transactions
        .map((item: IListData) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
        });

        setData(transactionsFormatted);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

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
                    <LogoutButton
                        onPress={() => {}}
                    >
                        <Icon name="power" />
                    </LogoutButton>
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

