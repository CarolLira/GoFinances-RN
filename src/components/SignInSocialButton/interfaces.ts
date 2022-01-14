import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

export interface Props extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
}