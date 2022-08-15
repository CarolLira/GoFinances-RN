import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth";
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import { Button } from "../../components/Form/Button";
import { InputHookForm } from "../../components/Form/InputHookForm";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

import { FormData } from "./interfaces";

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório')
});

export function Register() {
    const navigation = useNavigation();
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const {user} = useAuth();

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleOpenSelectCategory() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData) {
        if (!transactionType) {
            return Alert.alert('Selecione o tipo da transação');
        }
        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = `@gofinances:transactions_user:${user?.id}`;
            const transactionData = await AsyncStorage.getItem(dataKey);
            const currentData = transactionData ? JSON.parse(transactionData) : [];
            
            const dataFormatted = [
                ...currentData,
                newTransaction
            ]
            
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
            
            reset();
            setTransactionType('');
            setCategory({key: 'category', name: 'Categoria'});

            navigation.navigate('Listagem');
        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputHookForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputHookForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Entrada"
                                onPress={() => handleTransactionTypeSelect('positive')}
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Saída"
                                onPress={() => handleTransactionTypeSelect('negative')}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionsTypes>
                        <CategorySelectButton
                            testID="category-button"
                            title={category.name}
                            onPress={handleOpenSelectCategory}
                        />
                    </Fields>
                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal
                    testID="category-modal"
                    visible={categoryModalOpen}
                >
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}