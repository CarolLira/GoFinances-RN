import { RectButtonProps } from "react-native-gesture-handler";

export interface Props extends RectButtonProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

export interface IconProps {
    type: 'up' | 'down';
}

export interface ContainerProps {
    isActive: boolean;
    type: 'up' | 'down';
}