import React from 'react';
import {    
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

export function Profile() {
    return (
        <View>
            <Text>Perfil</Text>
            <TextInput
                testID="input-name"
                placeholder="Nome"
                autoCorrect={false}
                value="Carol"
            />
            <TextInput
                testID="input-surname"
                placeholder="Sobrenome"
                value="Lira"
            />
            <Button
                title="Salver"
                onPress={() => {}}
            />
        </View>
    );
}