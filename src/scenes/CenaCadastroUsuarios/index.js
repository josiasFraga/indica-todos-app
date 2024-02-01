import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import COLORS from '@constants/colors';
import FormCadastroUsuario from '@components/Forms/FormCadastroUsuario';
import * as yup from 'yup';
import Header from "@components/Header";
import { CommonActions } from '@react-navigation/native';
import GlobalStyle from '@styles/global';
import { useDispatch } from 'react-redux';
import AlertHelper from '@components/Alert/AlertHelper';

const cadastroSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
  .required('A confirmação de senha é obrigatória'),
  phone: yup.string().required('Telefone é obrigatório').min(15, 'Telefone deve ter no mínimo 15 caracteres.').max(15, 'Telefone deve ter no máximo 15 caracteres.'),
});


export default function CenaCadastroUsuarios(props) {

  const dispatch = useDispatch();

  openLoginCene = () => {
		props.navigation.dispatch(
			CommonActions.navigate({
				name: 'Login'
			})
		);
  }

  const formik = useFormik({
    initialValues: { 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '',
        phone: '', 
    },
    validationSchema: cadastroSchema,
    onSubmit: (values, {setSubmitting, resetForm}) => {
      
      dispatch({
        type: 'REGISTER_TRIGGER',
        payload: {
          submitValues: values,
          setSubmitting: setSubmitting,
          callback_success: () => {
            resetForm()
            AlertHelper.show(
              'success',
              'Tudo Certo',
              'Seu cadastro foi realizado com sucesso!',
            );
            openLoginCene();
          }
        }
      })
    },
  });

  return (
    <>
    
    <Header
        backButton
        titulo="Cadastro de Usuário"
        styles={{ backgroundColor: "transparent" }}
        titleStyle={{ color: COLORS.primary }}
        iconColor={COLORS.primary}
    />

    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={GlobalStyle.spaceSmall}>
            </View>
            <View style={styles.innerContainer}>
                <FormCadastroUsuario formik={formik} />
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