export interface Props {
    category: ICategory;
    setCategory: (category: ICategory) => void;
    closeSelectCategory: () => void;
}

export interface ICategory {
    key: string;
    name: string;
}

export interface CategoryProps {
    isActive: boolean;
}