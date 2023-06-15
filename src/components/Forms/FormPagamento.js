import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import CreditCardPicker from '@components/Forms/CreditCardPicker';
import CreditCardHolder from '@components/Forms/CreditCardHolder';
import COLORS from '@constants/colors';
import GlobalStyle from '@styles/global';

export default function FormPagamento(props) {
  const formik = props.formik;

  return (
    <>
    <View>


        <View style={GlobalStyle.spaceSmall} />
        <Text style={GlobalStyle.title2}>Dados do Cartão</Text>
        <View style={GlobalStyle.spaceSmall} />
        <CreditCardPicker formik={formik} />


        <View style={GlobalStyle.spaceSmall} />
        <Text style={GlobalStyle.title2}>Dados do Titular do Cartão</Text>
        <View style={GlobalStyle.spaceSmall} />
        <CreditCardHolder formik={formik} />

    </View>
    </>
  );
}

const styles = StyleSheet.create({
    sectionLabelDesc: {
        fontSize: 12,
        color: COLORS.quaternary,
        textAlign: 'center',
        marginBottom: 5
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.primary,
        textTransform: 'uppercase'
    },
    fieldsetContainer: {
        backgroundColor: '#e6f4f5', 
        paddingHorizontal: 5, 
        paddingVertical: 10, 
        borderRadius: 10, 
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#CCC'
    }
})