import React from 'react';

import {
    Container,
    Category,
    Icon
} from './styles';

import { Props } from './interfaces';

export function CategorySelectButton({
    title,
    onPress
}: Props) {
    return (
        <Container 
            onPress={onPress}
        >
            <Category>{title}</Category>
            <Icon name="chevron-down"/>
        </Container>
    );
}
