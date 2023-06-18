import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useFormik } from 'formik';
import { StackActions, useNavigation } from '@react-navigation/native';
import COLORS from '@constants/colors';
import GlobalStyle from '@styles/global';

import * as yup from 'yup';
import Header from "@components/Header";
import { useDispatch, useSelector } from 'react-redux';
import FormAvaliarPrestador from '@components/Forms/FormAvaliarPrestador';
import NoLoggedMessage from '@components/Misc/NoLoggedMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validation = yup.object().shape({
  rating: yup.string().required('A avaliação é obrigatória'),
  comment: yup.string().required('O campo comentário é obrigatório'),
  service_id: yup.string().required('O campo serviço é obrigatório'),
  service_provider_id: yup.string().required('O campo prestador é obrigatório'),
});

export default function CenaAvaliarPrestador(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { service_provider_id } = props.route.params;
  const [isLogged, setIsLogged] = React.useState(false);
  const [initialValues, setInitialValues] = React.useState({ 
    rating: '',
    service_id: '',
    comment: '',
    service_provider_id: service_provider_id,
  });

  const checkIsLogged = async () => {
    const token = await AsyncStorage.getItem('bearerToken');
    if (token != null && token !== '') {
      setIsLogged(true);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch({
        type: 'SAVE_RATING',
        payload: {
          submitValues: values,
          setSubmitting: setSubmitting,
          callback_success: () => {
            navigation.dispatch(StackActions.pop(1)); 
          }
        }
      });
    },
  });

  React.useEffect(() => {
    checkIsLogged();
  }, []);

  if (!isLogged) {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <Header
          titulo="Avaliar Prestador"
          styles={{ backgroundColor: COLORS.primary }}
          titleStyle={{ color: '#f7f7f7' }}
          backButton
          iconColor={'#f7f7f7'}
        />
        <NoLoggedMessage />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />
        <Header
          titulo="Avaliar Prestador"
          styles={{ backgroundColor: COLORS.primary }}
          titleStyle={{ color: '#f7f7f7' }}
          backButton
          iconColor={'#f7f7f7'}
        />
        <ScrollView style={styles.scrollView}>
          <View style={GlobalStyle.spaceSmall} />
          <View style={GlobalStyle.secureMargin}>
            <FormAvaliarPrestador formik={formik} />
            <View style={GlobalStyle.spaceSmall} />
            <Button
              titleStyle={{}}
              buttonStyle={{ borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary, marginBottom: 15 }}
              title="Enviar Avaliação"
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loginMessage: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: COLORS.quaternary, // Customize the color of the message
  },
  loginButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primary,
  },
  loginButtonText: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
});
