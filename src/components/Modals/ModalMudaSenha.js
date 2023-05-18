import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import  FormSenha  from '@components/Forms/FormSenha';
import AlertHelper from '@components/Alert/AlertHelper';
import {Button, Icon } from 'react-native-elements';
import COLORS from '@constants/colors';
import * as yup from 'yup';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

const cadastroSchema = yup.object().shape({
    password: yup.string().required('Senha é obrigatória'),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
    .required('A confirmação de senha é obrigatória'),
  });

export default function ModalMudaSenha(props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const modalVisible = props.visible;
    const setModalVisible = props.setModalVisible;

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
              setModalVisible(false);; 
            }
          }
        })
      },
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <FormSenha formik={formik} />
                    <Button
                    
						titleStyle={{color: COLORS.primary}}
						type='clear'
						buttonStyle={{borderRadius: 25, paddingVertical: 10, marginTop: 25}}
						title="Cancelar"
						onPress={() => setModalVisible(!modalVisible)}
					/>
                </View>
            </View>
        </Modal>
    )
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
    backgroundColor: opacity
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 25
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});