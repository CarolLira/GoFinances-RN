import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Props } from './interfaces';

export const Container = styled(TextInput)<Props>`
    width: 100%;
    padding: 16px 18px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.text_dark};
    font-size: ${RFValue(14)}px;
    background-color: ${({theme}) => theme.colors.shape};
    border-radius: 5px;
    margin-bottom: 8px;
`;