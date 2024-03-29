import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
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
    const { signOut, user } = useAuth();

    function getLastTransactionDate(
        collection: IListData[],
        type: "positive" | "negative"
    ) {
        const collectionFiltered = collection.filter(transaction => transaction.type === type);

        if (collectionFiltered.length === 0) return 0;

        const lastTransaction = new Date(Math.max.apply(Math, collectionFiltered
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime())));

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }

    async function loadTransactions() {
        const dataKey = `@gofinances:transactions_user:${user?.id}`;
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
        const totalInterval = lastTransactionsExpensives === 0
        ? 'Não há transações'
        : `01 a ${lastTransactionsExpensives}`;

        const total = entriesTotal - expensiveTotal;

        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionsEntries === 0 
                ? 'Não há transações' 
                : `Última entrada dia ${lastTransactionsEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionsExpensives === 0
                ? 'Não há transações' 
                :`Última saída dia ${lastTransactionsExpensives}`,
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
                                    <Photo source={{ uri: user?.photo }} />
                                    <User>
                                        <UserGreeting>Olá,</UserGreeting>
                                        <UserName>{user?.name}</UserName>
                                    </User>
                                </UserInfo>
                                <LogoutButton
                                    onPress={signOut}
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

