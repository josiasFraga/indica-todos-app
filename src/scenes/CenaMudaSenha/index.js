import React from 'react';
import {
  StatusBar,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import FormMudarSenha from '@components/Forms/FormMudarSenha';
import COLORS from '@constants/colors';
import Header from '@components/Header';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import * as yup from 'yup';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';
import AlertHelper from '@components/Alert/AlertHelper';

import GlobalStyle from '@styles/global';

const initialValues = { 
    user_email: '',
    code: '',
    new_password: '', 
    confirm_new_password: '',
};

export default function CenaMudaSenha () {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const [step, setStep] = React.useState(0);
    let buttonText = "";

    if (step == 0) {
        buttonText = "Enviar Código";
    } else if (step == 1) {
        buttonText = "Verificar Código";
    } else if (step == 2) {
        buttonText = "Mudar Senha";
    }

    let cadastroSchema = [];

    cadastroSchema[0] = yup.object().shape({
        user_email: yup
            .string()
            .email('Email inválido')
            .required('Email é obrigatório'),

    });

    cadastroSchema[1] = yup.object().shape({
        code: yup
            .string()
            .required('É obrigatório digitar o código para continuar'),
    });

    cadastroSchema[2] = yup.object().shape({
        new_password: yup.string().required('Senha é obrigatória'),
        confirm_new_password: yup.string()
            .oneOf([yup.ref('new_password'), null], 'As senhas não coincidem')
            .required('A confirmação de senha é obrigatória'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: cadastroSchema[step],
        onSubmit: (values, {setSubmitting, resetForm}) => {
          
            dispatch({
                type: 'CHANGE_PASSWORD_UNAUTHENTICATED',
                payload: {
                submitValues: values,
                step: step,
                setSubmitting: setSubmitting,
                callback_success: () => {
                    if ( step < 2 ){ 
                        setStep(step+1)
                    } else {
                        AlertHelper.show(
                            'success',
                            'Tudo Certo',
                            'Sua senha foi alterada com sucesso!',
                        );
                        resetForm();
                        
                        navigation.dispatch(StackActions.pop(1)); 
                        
                        navigation.dispatch(
                            CommonActions.navigate({
                                name: 'Login'
                            })
                        ); 
                    }
                }
                }
            })
        },
      });

    return (
      <>
      <View style={[styles.container, {backgroundColor: '#fff'}]}>
        <StatusBar
          translucent={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
        />

        <Header backButton titulo="Mudar Senha" styles={{backgroundColor: 'transparent'}} titleStyle={{color: COLORS.primary}} iconColor={COLORS.primary} />

        <ScrollView style={GlobalStyle.secureMargin}>

            <FormMudarSenha formik={formik} step={step} />
          
            <Button
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
                title={buttonText}
                onPress={formik.handleSubmit}
                disabled={formik.isSubmitting}
            />
        </ScrollView>
        
        </View>
      </>
    );
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButtonContainer: {
    marginRight: 10,
    marginTop: 10,
  },
  tagButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tagButtonInactive: {
    backgroundColor: '#eee',
  },
  tagButtonActive: {
    backgroundColor: '#a60000',
  },
  tagButtonTextActive: {
    color: '#FFF',
  },
  buttonLimpar: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonLimparText: {
    textAlign: 'center',
  },
  buttonFiltrar: {
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#A60000',
  },
  buttonFiltrarText: {
    textAlign: 'center',
    color: '#FFF',
  },
});
