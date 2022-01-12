export interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

export interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}