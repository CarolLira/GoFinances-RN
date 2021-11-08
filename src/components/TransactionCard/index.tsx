import React from 'react';
import { ICardData, ITransactionCard } from './interfaces';

import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from './styles';

export function TransactionCard({ data }: ITransactionCard) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount
                type={data.type}
            >
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon
                        name={data.category.icon}
                    />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}