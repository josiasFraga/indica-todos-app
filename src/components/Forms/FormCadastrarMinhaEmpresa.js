import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import COLORS from '@constants/colors';
import DadosEmpresa from '@components/Forms/FormCadastroPrestador/DadosEmpresa';
import GlobalStyle from '@styles/global';

export default function FormCadastrarMinhaEmpresa(props) {
  const formik = props.formik;


  return (
    <>
    <View>
        
        <DadosEmpresa formik={formik} />

        <View style={GlobalStyle.spaceSmall} />

        <Button
            titleStyle={{}}
            buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary, marginBottom: 15}}
            title="Enviar Cadastro"
            onPress={formik.handleSubmit}
            disabled={formik.isSubmitting}
        />
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
    }
})