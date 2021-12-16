import React, { useState } from "react";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

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
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategory() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false);
    }

    function handleRegister(form: FormData) {
        if (!transactionType) {
            return Alert.alert('Selecione o tipo da transação');
        }
        if (category.key === 'category') {
            return Alert.alert('Selecione a categoria');
        }

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data);
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
                                onPress={() => handleTransactionTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Saída"
                                onPress={() => handleTransactionTypeSelect('down')}
                                isActive={transactionType === 'down'}
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