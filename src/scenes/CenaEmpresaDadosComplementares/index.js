import React from 'react';
import {
  StatusBar,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormPrestadorServicos from '@components/Forms/FormPrestadorServicos';
import FormPagamento from '@components/Forms/FormPagamento';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AlertHelper from '@components/Alert/AlertHelper';
import { Button } from 'react-native-elements';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import GlobalStyle from '@styles/global';
import Header from '@components/Header';
import COLORS from '@constants/colors';

export default function CenaEmpresaDadosComplementares () {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [step, setStep] = React.useState(0);
    const buttonText = step == 0 ? "Continuar" : "Aceitar e continuar";

    const openHomeCene = () => {

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
          { name: 'TabsScreenProvider' },
          ],
        })
        )
    }

    let cadastroSchema = [];

    cadastroSchema[0] = yup.object().shape({
        services: yup
          .array()
          .of(
            yup.object().shape({
              title: yup.string().required('Título do serviço é obrigatório'),
              description: yup.string(),
              category_id: yup.string().required('Categoria do serviço é obrigatória'),
              subcategory_id: yup.string().required('SubCategoria do serviço é obrigatória'),
              price: yup.string().required('Preço do serviço é obrigatório'),
              price_unit: yup.string().nullable(),
            })
          )
          .min(1, 'Pelo menos um serviço deve ser adicionado'),
      });

    cadastroSchema[1] = yup.object().shape({
      services: yup.array().of(
        yup.object().shape({
          // Defina as validações para cada serviço, se necessário
        })
      ),
      /*cc_number: yup
        .string()
        .required('Número do cartão de crédito é obrigatório'),
      cc_name: yup.string().required('Nome do titular do cartão é obrigatório'),
      cc_expiry: yup.string().required('Data de validade do cartão é obrigatória'),
      cc_secure_code: yup
        .string()
        .required('Código de segurança do cartão é obrigatório'),
      credit_card_holder: yup.object().shape({
        name: yup.string().required('Nome do titular é obrigatório'),
        email: yup
          .string()
          .email('Email inválido')
          .required('Email do titular é obrigatório'),
        phone: yup.string().required('Telefone do titular é obrigatório'),
        cpf: yup.string().required('CPF do titular é obrigatório'),
        birth_date: yup.string().required('Data de nascimento é obrigatória'),
      }),
      billing_address: yup.object().shape({
        postal_code: yup.string().required('CEP é obrigatório'),
        city: yup.string().required('Cidade é obrigatória'),
        state: yup.string().required('Estado é obrigatório'),
        address: yup.string().required('Endereço é obrigatório'),
        neighborhood: yup.string().required('Bairro é obrigatório'),
        address_number: yup.string().required('Número do endereço é obrigatório'),
      }),*/
    });

    const serviceFormObject = 
    {
        title: '',
        description: '',
        category_id: '',
        subcategory_id: '',
        price: '',
        price_unit: ''
    };

    const formik = useFormik({
        initialValues: { 
            services: [
                serviceFormObject
            ],
            /*cc_number: '',
            cc_name: '',
            cc_expiry: '',
            cc_secure_code: '',
            credit_card_holder: {
              name: '',
              email: '',
              phone: '',
              cpf: '',
              birth_date: '',
            },
            billing_address: {
              postal_code: '',
              city: '',
              state: '',
              address: '',
              address_number: '',
              address_complement: '',
              neighborhood: ''
            }*/
        },
        validationSchema: cadastroSchema[step],
        onSubmit: (values, {setSubmitting, resetForm}) => {

          if ( step < 1) {
            setStep((step+1));
            setSubmitting(false);
            return false;
          }
        
          dispatch({
              type: 'END_REGISTER_TRIGGER',
              payload: {
              submitValues: values,
              setSubmitting: setSubmitting,
              callback_success: async () => {
                  resetForm()
                  AlertHelper.show(
                  'success',
                  'Tudo Certo',
                  'Seu cadastro foi finalizado com sucesso!',
                  );
                  await AsyncStorage.setItem('servicesExist', '1');
                  openHomeCene();
              }
              }
          })
        },
    });


    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar
          translucent={true}
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
        />
        
        <Header backButton titulo="Finalização de Cadastro" styles={{backgroundColor: 'transparent'}} titleStyle={{color: COLORS.primary}} iconColor={COLORS.primary} />

        <ScrollView style={GlobalStyle.secureMargin}>

          {step == 0 && <FormPrestadorServicos formik={formik} serviceFormObject={serviceFormObject} />}
          {step == -1 && <FormPagamento formik={formik} />}

          {step == 1 && <Text style={{marginBottom: 20, marginTop: 10}}>O Indica Todos é gratuito pelos primeiros 6 meses (período de testes). Aproveite!</Text>}

          <Button
            titleStyle={{}}
            buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary, marginBottom: 15}}
            title={buttonText}
            onPress={formik.handleSubmit}
            //disabled={formik.isSubmitting}
          />

        </ScrollView>
      </SafeAreaView>
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
