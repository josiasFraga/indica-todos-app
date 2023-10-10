import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import COLORS from '@constants/colors';
import FormCadastroPrestador from '@components/Forms/FormCadastroPrestador';
import * as yup from 'yup';
import Header from "@components/Header";
import { CommonActions } from '@react-navigation/native';
import GlobalStyle from '@styles/global';
import { useDispatch } from 'react-redux';
import AlertHelper from '@components/Alert/AlertHelper';

const cadastroSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
    password: yup.string().required('Senha é obrigatória'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
    .required('A confirmação de senha é obrigatória'),
    phone: yup.string().required('Telefone é obrigatório'),
    service_provider: yup.object().shape({
      name: yup.string().required('Nome do prestador é obrigatório'),
      email: yup.string().email('Digite um e-mail válido').required('E-mail do prestador é obrigatório'),
      phone: yup.string().required('Telefone do prestador é obrigatório'),
      address: yup.string().required('Endereço é obrigatório'),
      address_number: yup.string().required('Número do endereço é obrigatório'),
      address_complement: yup.string(),
      city: yup.string().nullable().required('Cidade é obrigatória'),
      state: yup.string().nullable().required('Estado é obrigatório'),
      postal_code: yup.string().required('CEP é obrigatório'),
      neighborhood: yup.string().required('Bairro é obrigatório'),
      /*services: yup.array().of(yup.object().shape({
        title: yup.string().required('Título do serviço é obrigatório'),
        description: yup.string(),
        category_id: yup.string().required('Categoria do serviço é obrigatória'),
        subcategory_id: yup.string(),
        price: yup.number().required('Preço do serviço é obrigatório'),
        price_unit: yup.string().required('Unidade de preço do serviço é obrigatória')
      }))*/
    })
});

export default function CenaCadastroPrestadores(props) {

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
        phone: '', 
        service_provider: {
            name: '',
            email: '',
            phone: '',
            address: '',
            address_number: '',
            address_complement: '',
            city: '',
            state: '',
            postal_code: '',
            neighborhood: ''
            /*services: [
                {
                    title: '',
                    description: '',
                    category_id: '',
                    subcategory_id: '',
                    price: '',
                    price_unit: ''
                }
            ]*/
        }
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
              'Você tem 6 meses para testar o Indica Todos a partir de hoje. Aproveite!',
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
        titulo="Cadastro de Prestador"
        styles={{ backgroundColor: "transparent" }}
        titleStyle={{ color: COLORS.primary }}
        iconColor={COLORS.primary}
    />

    <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={GlobalStyle.spaceSmall}>
            </View>
            <View style={styles.innerContainer}>
                <FormCadastroPrestador formik={formik} />
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