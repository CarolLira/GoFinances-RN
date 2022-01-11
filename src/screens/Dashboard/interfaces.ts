import { ICardData } from "../../components/TransactionCard/interfaces";

export interface IListData extends ICardData {
    id: string;
}

export interface HighLightData {
    entries: HighLightProps,
    expensives: HighLightProps,
    total: HighLightProps

}

export interface HighLightProps {
    amount: string;
    lastTransaction: string;
}
