import React from 'react';

import {
    Button,
    ImageContainer,
    Text,
} from './styles';

import { Props } from './interfaces';

export function SignInSocialButton({
    title,
    svg: Svg,
    ...rest
}: Props) {
    return (
        <Button {...rest}>
            <ImageContainer>
                <Svg/>
            </ImageContainer>
            <Text>
                {title}
            </Text>
        </Button>
    );
}