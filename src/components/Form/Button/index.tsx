import React from "react";

import {
    Container,
    Title
} from './styles';

import { Props } from "./interfaces";

export function Button({ title, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Title>
                {title}
            </Title>
        </Container>
    );
}