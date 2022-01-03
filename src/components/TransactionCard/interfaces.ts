export interface ITransactionCard {
    data: ICardData;
}

export interface ICardData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

export interface ITransactionType {
    type: 'positive' | 'negative';
}
