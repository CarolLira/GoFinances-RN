import React from "react";

import {
    Container,
    Title
} from './styles';

import { Props } from "./interfaces";

export function Button({
    title,
    onPress,
    ...rest
}: Props) {
    return (
        <Container
            onPress={onPress}
            {...rest}
        >
            <Title>
                {title}
            </Title>
        </Container>
    );
}