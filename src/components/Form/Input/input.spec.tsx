import React from 'react';
import { render } from '@testing-library/react-native';

import { Input } from './index';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

describe('Input (component)', () => {
    it('should have specific border color when active', () => {
        const { getByTestId, toJSON } = render(
            <Input
                testID='input-email'
                placeholder='E-mail'
                keyboardType='email-address'
                autoCorrect={false}
            />,
            {
                wrapper: Providers
            }
        );
        expect(toJSON()).toMatchSnapshot();
    });
});