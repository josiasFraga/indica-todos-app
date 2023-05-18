import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import COLORS from '@constants/colors';
import FormSenha from '@components/Forms/FormSenha';
import * as yup from 'yup';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AlertHelper from '@components/Alert/AlertHelper';

const cadastroSchema = yup.object().shape({
  password: yup.string().required('Senha é obrigatória'),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
  .required('A confirmação de senha é obrigatória'),
});


export default function CenaMudaSenha(props) {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: { 
        password: '', 
        confirmPassword: '',
    },
    validationSchema: cadastroSchema,
    onSubmit: (values, {setSubmitting, resetForm}) => {
      
      dispatch({
        type: 'CHANGE_PASSWORD',
        payload: {
          submitValues: values,
          setSubmitting: setSubmitting,
          callback_success: () => {
            resetForm()
            AlertHelper.show(
              'success',
              'Tudo Certo',
              'Sua senha foi alterada com sucesso!',
            );
            navigation.dispatch(StackActions.pop(1)); 
          }
        }
      })
    },
  });

  return (
    <>
    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.innerContainer}>
                <FormSenha formik={formik} />
            </View>
        </ScrollView>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  innerContainer: {

    flex: 1,
    //backgroundColor: '#FFF',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: 12,
    color: COLORS.quaternary
  },
  signup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  signupText: {
    marginBottom: 8,
    color: COLORS.quaternary
  },
  signupButtonTitle: {
    color: COLORS.primary
  },
  bgImage: {
      width: 120,
      height: 120,
      position: 'absolute',
      zIndex: 999,
      bottom:-50,
      right: -20,
      alignSelf: 'flex-end',
  }
});