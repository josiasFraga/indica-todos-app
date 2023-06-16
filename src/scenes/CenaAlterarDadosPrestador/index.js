import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useFormik } from 'formik';
import { StackActions, useNavigation } from '@react-navigation/native';
import COLORS from '@constants/colors';
import GlobalStyle from '@styles/global';

import * as yup from 'yup';
import Header from "@components/Header";
import { useDispatch, useSelector } from 'react-redux';
import DadosEmpresa from '@components/Forms/FormCadastroPrestador/DadosEmpresa';

const validation = yup.object().shape({
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

export default function CenaAlterarDadosPrestador(props) {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data_loaded = useSelector(state => state.appReducer.business_data);
  const [initialValues, setInitialValues] = React.useState({ 
    service_provider: {
        name: '',
        email: '',
        phone: '',
        address: '',
        address_number: '',
        address_complement: '',
        city: '',
        state: '',
        neighborhood: '',
        postal_code: ''
    }
  });

  React.useEffect(() => {

    dispatch({
        type: 'LOAD_BUSINESS_DATA',
        payload: {}
      })
  },[])

  React.useEffect(() => {
    if (Object.keys(data_loaded).length > 0) {
        setInitialValues({
            service_provider: data_loaded
        });
    }
  },[data_loaded])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, {setSubmitting, resetForm}) => {

      dispatch({
        type: 'SAVE_BUSINESS_DATA',
        payload: {
          submitValues: values,
          setSubmitting: setSubmitting,
          callback_success: () => {
            navigation.dispatch(StackActions.pop(1)); 
          }
        }
      })
    },
  });


  return (
    <>
    <View style={styles.container}>
        
        <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
        />

        <Header
            titulo="Alterar Dados Empresariais"
            styles={{ backgroundColor: COLORS.primary }}
            titleStyle={{ color: '#f7f7f7' }}
            backButton
            iconColor={'#f7f7f7'}
        />

        <ScrollView style={styles.scrollView}>
            <View style={GlobalStyle.spaceSmall} />
            <View style={GlobalStyle.secureMargin}>
                <DadosEmpresa formik={formik} />

                <View style={GlobalStyle.spaceSmall} />

                <Button
                    titleStyle={{}}
                    buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary, marginBottom: 15}}
                    title="Salvar Alterações"
                    onPress={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                />
            </View>
            <View style={GlobalStyle.spaceSmall} />
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