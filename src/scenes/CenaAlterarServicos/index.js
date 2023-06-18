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
import FormPrestadorServicos from '@components/Forms/FormPrestadorServicos';

const validation = yup.object().shape({
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

const serviceFormObject = 
{
    title: '',
    description: '',
    category_id: '',
    subcategory_id: '',
    price: '',
    price_unit: ''
};

export default function CenaAlterarServicos(props) {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data_loaded = useSelector(state => state.appReducer.my_services);
  const [initialValues, setInitialValues] = React.useState({ 
    services: [
        serviceFormObject
    ],
  });

  React.useEffect(() => {

    dispatch({
        type: 'LOAD_MY_SERVICES',
        payload: {}
      })
  },[])

  React.useEffect(() => {
    if (data_loaded.length > 0) {
        setInitialValues({
            services: data_loaded
        });
    }
  },[data_loaded])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, {setSubmitting, resetForm}) => {

      dispatch({
        type: 'SAVE_SERVICES',
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
            titulo="Alterar Serviços Prestados"
            styles={{ backgroundColor: COLORS.primary }}
            titleStyle={{ color: '#f7f7f7' }}
            backButton
            iconColor={'#f7f7f7'}
        />

        <ScrollView style={styles.scrollView}>
            <View style={GlobalStyle.spaceSmall} />
            <View style={GlobalStyle.secureMargin}>
                <FormPrestadorServicos formik={formik} serviceFormObject={serviceFormObject} />

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