import React from 'react';
import { Controller } from 'react-hook-form';

import { Input } from '../Input';
import { Props } from './interfaces';

import {
    Container
} from './styles';

export function InputHookForm({
    control,
    name,
    ...rest
}: Props) {
    return (
        <Container>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value }}) => (
                    <Input 
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
            />
        </Container>
    );
}