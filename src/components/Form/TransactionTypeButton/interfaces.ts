import { TouchableOpacityProps } from "react-native";

export interface Props extends TouchableOpacityProps {
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