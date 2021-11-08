export interface ITransactionCard {
    data: ICardData;
}

export interface ICardData {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: ICategory;
    date: string;
}

export interface ICategory {
    name: string;
    icon: string;
}

export interface ITransactionType {
    type: 'positive' | 'negative';
}
