import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';
import { useFormik } from 'formik';
import COLORS from '@constants/colors';
import FormLogin from '@components/Forms/FormLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import IMAGES from '@constants/images';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export default function Login(props) {

  const dispatch = useDispatch();

  openHomeCene = async () => {
    
		const userType = await AsyncStorage.getItem('userType');
  
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
        { name: userType == 'servide_provider' ? 'TabsScreenProvider' : 'TabsScreenUser' },
        ],
      })
      )
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: (values, {setSubmitting, resetForm}) => {
      
      dispatch({
        type: 'LOGIN_TRIGGER',
        payload: {
          submitValues: values,
          setSubmitting: setSubmitting,
          callback_success: () => {
            resetForm()
            openHomeCene();
          }
        }
      })
    },
  });

	const openCadastro = () => {
		props.navigation.dispatch(
			CommonActions.navigate({
				name: 'PreCadastro'
			})
		);
	}

  return (
    <>
    
    <View style={styles.container}>
        <View style={styles.innerContainer}>
            <View style={styles.logo}>
                <Image source={IMAGES.LOGO} style={{ width: 120, height: 120 }} />
            </View>

            <FormLogin formik={formik} />

            <View style={styles.signup}>
            <Text style={styles.signupText}>Ainda não tem cadastro?</Text>
            <Button
                title="Cadastre-se aqui"
                onPress={openCadastro}
                buttonStyle={styles.signupButton}
                titleStyle={styles.signupButtonTitle}
                type="clear"
            />
            </View>
        </View>
            <View style={styles.bgImage}>
                <Image source={IMAGES.BALL_BG} style={{ width: 140, height: 140 }} />
            </View>
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