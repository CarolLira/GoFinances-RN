import React from 'react';
import { Controller } from 'react-hook-form';

import { Input } from '../Input';
import { Props } from './interfaces';

import {
    Container,
    Error
} from './styles';

export function InputHookForm({
    control,
    name,
    error,
    ...rest
}: Props) {
    return (
        <Container>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}