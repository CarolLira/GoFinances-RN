import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

import { Register } from './index';

const Providers: React.FC = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
);

describe('Register (screen)', () => {
    it('should open category modal when user click on category button', async () => {
        const { getByTestId } = render(
            <Register />,
            {
                wrapper: Providers
            }
        );

        const categoryModal = getByTestId('category-modal');
        const categoryButton = getByTestId('category-button');

        fireEvent.press(categoryButton);
        await waitFor(() => {
            expect(categoryModal.props.visible).toBeTruthy();
        });
    });
});