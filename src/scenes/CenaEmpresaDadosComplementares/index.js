import React from 'react';
import {
  StatusBar,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import FormPrestadorServicos from '@components/Forms/FormPrestadorServicos';
import { Button } from 'react-native-elements';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import GlobalStyle from '@styles/global';
import Header from '@components/Header';
import COLORS from '@constants/colors';

export default function CenaEmpresaDadosComplementares () {

    const dispatch = useDispatch();
    const [step, setStep] = React.useState(0);

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
              price: yup.number().required('Preço do serviço é obrigatório'),
              price_unit: yup.string().nullable(),
            })
          )
          .min(1, 'Pelo menos um serviço deve ser adicionado'),
      });

    cadastroSchema[1] = yup.object().shape({});

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
            ]
        },
        validationSchema: cadastroSchema[step],
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
                'Seu cadastro foi finalizado com sucesso!',
                );
                openLoginCene();
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
            {step == 1 && <FormPagamento formik={formik} />}

            <Button
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary, marginBottom: 15}}
                title="Continuar"
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
