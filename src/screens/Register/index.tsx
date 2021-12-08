import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
    Modal
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

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {
        control,
        handleSubmit
    } = useForm();

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
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data);
    }

    return (
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
                    />
                    <InputHookForm
                        name="amount"
                        control={control}
                        placeholder="Preço"
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
                visible={categoryModalOpen}
            >
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategory}
                />
            </Modal>
        </Container>
    );
}