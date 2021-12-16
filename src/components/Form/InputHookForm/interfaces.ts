import { TextInputProps } from "react-native";
import { Control } from "react-hook-form";

export interface Props extends TextInputProps {
    control: Control;
    name: string;
    error: string;
}