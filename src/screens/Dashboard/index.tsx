import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { useTheme } from 'styled-components';
import { HighLightData, IListData } from './interfaces';

import {
    Container,
    LoadContainer,
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
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<IListData[]>([]);
    const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

    const theme = useTheme();

    function getLastTransactionDate(
        collection: IListData[],
        type: "positive" | "negative"
    ) {
        const lastTransaction = new Date(Math.max.apply(Math, collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime())));

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }

    async function loadTransactions() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: IListData[] = transactions
            .map((item: IListData) => {
                if (item.type === 'positive') {
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

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

        setTransactions(transactionsFormatted);
        const lastTransactionsEntries = getLastTransactionDate(transactions, "positive");
        const lastTransactionsExpensives = getLastTransactionDate(transactions, "negative");
        const totalInterval = `01 a ${lastTransactionsExpensives}`;

        const total = entriesTotal - expensiveTotal;

        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionsExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval,
            }
        });
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
        // const dataKey = '@gofinances:transactions';
        // AsyncStorage.removeItem(dataKey);
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadContainer> :
                    <>
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
                                    onPress={() => { }}
                                >
                                    <Icon name="power" />
                                </LogoutButton>
                            </UserWrapper>
                        </Header>
                        <CardsContainer>
                            <HighlightCard
                                type="up"
                                title="Entradas"
                                amount={highLightData.entries.amount}
                                lastTransaction={highLightData.entries.lastTransaction}
                            />
                            <HighlightCard
                                type="down"
                                title="Saídas"
                                amount={highLightData.expensives.amount}
                                lastTransaction={highLightData.expensives.lastTransaction}
                            />
                            <HighlightCard
                                type="total"
                                title="Total"
                                amount={highLightData.total.amount}
                                lastTransaction={highLightData.total.lastTransaction}
                            />
                        </CardsContainer>
                        <Transactions>
                            <Title>Histórico</Title>
                            <TransactionList
                                keyExtractor={item => item.id}
                                data={transactions}
                                renderItem={({ item }) => (
                                    <TransactionCard
                                        data={item}
                                    />
                                )}
                            />
                        </Transactions>
                    </>
            }
        </Container>
    )
}

