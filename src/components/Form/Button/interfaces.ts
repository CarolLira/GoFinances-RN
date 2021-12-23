import { RectButtonProps } from "react-native-gesture-handler";

export interface Props extends RectButtonProps {
    title: string;
    onPress: () => void;
}