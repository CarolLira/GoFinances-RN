import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile (screen)', () => {
    it('should be rendering user input name placeholder correctly', () => {
        const { getByPlaceholderText } = render(<Profile/>);
        const inputName = getByPlaceholderText('Nome');
        expect(inputName).toBeTruthy();
    });
    
    it('should be loaded user data', () => {
        const { getByTestId } = render(<Profile/>);
        const inputName = getByTestId('input-name');
        const inputSurname = getByTestId('input-surname');
    
        expect(inputName.props.value).toEqual('Carol');
        expect(inputSurname.props.value).toEqual('Lira');
    });
    
    it('it should render title', () => {
        const { getByTestId } = render(<Profile/>);
        const textTitle = getByTestId('text-title');
    
        expect(textTitle.props.children).toContain('Perfil');
    });
});