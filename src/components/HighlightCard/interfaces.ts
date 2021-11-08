export interface ICard {
    type: 'up' | 'down' | 'total';
    title: string;
    amount: string;
    lastTransaction: string;
}

export interface IType {
    type: 'up' | 'down' | 'total';
}