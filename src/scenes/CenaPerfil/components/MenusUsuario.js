import React from 'react';

import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { Alert} from 'react-native';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';
import ModalMudaSenha from '@components/Modals/ModalMudaSenha';
import ModalChooseOrSendPhoto from '@components/Modals/ModalChooseOrSendPhoto';

export default function MenusUsuario (props) {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [modalSenhaVisivel, setModalSenhaVisivel] = React.useState(false);
    const [modalPhotoVisible, setModalPhotoVisible] = React.useState(false);
    const userType = props.userType;

    const logout = () => {
      dispatch({
          type: 'LOGOUT',
          payload: {
              callbackSuccess: () => {

                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                        { name: 'PreLogin' },
                        ],
                    })
                )
                  
              }
          }
      })
    };

    const callbackBeforeChooseImage = () => {

    }

    const callbackAfterChooseImage = (source) => {

      setModalPhotoVisible(false);
      dispatch({
        type: 'SAVE_PROFILE_PHOTO',
        payload: {
          photo: source,
          callback_success: () => {
            dispatch({
              type: "LOAD_USER_DATA",
            });
          }
        }
      });
    }

    const submitMyBusiness = () => {
      

      navigation.dispatch(
        CommonActions.navigate({
            name: 'CadastrarEmpresa'
        })
    );
    }

    const deleteUserAccount = () => {
      dispatch({
        type: 'DELETE_USER_ACCOUNT',
        payload: {
          callback_success: () => {
            logout();
          }
        }
      });
    }

    const confirmDeleteUserAccount = () => {

      Alert.alert(
        'Confirmação',
        'Você tem certeza? Todos os seus dados serão excluidos.',
        [
          {
            text: 'Não',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'Tenho Certeza', onPress: () => {
            deleteUserAccount();
          }},
        ],
      );

    }

    const list = [

        {
          name: 'Alterar foto do perfil',
          subtitle: '',
          loading: false,
          onPress: () => {
            setModalPhotoVisible(true);
          }
        },
        {
          name: 'Alterar Senha',
          subtitle: '',
          loading: false,
          onPress: () => {
            setModalSenhaVisivel(true);
          }
        },
        {
          name: 'Excluir Minha Conta',
          subtitle: 'Todos seu dados serão removidos',
          loading: false,
          onPress: () => {
            confirmDeleteUserAccount();
          }
        },
        {
          name: 'Sair',
          subtitle: '',
          onPress: () => {
            logout();
          }
        },
    ];

    if ( userType == 'user' ) {
      // Se userType for 'user', insira o item no local desejado
      list.splice(2, 0, {
        name: 'Cadastrar minha empresa',
        subtitle: '',
        loading: false,
        onPress: () => {
          submitMyBusiness();
        }
      });
    }

    return (
      <>
        <ModalMudaSenha 
					visible={modalSenhaVisivel}
					setModalVisible={setModalSenhaVisivel}
        />
        <ModalChooseOrSendPhoto 
          visible={modalPhotoVisible}
          setModalVisible={setModalPhotoVisible}
          callbackBeforeChooseImage={callbackBeforeChooseImage}
          callbackAfterChooseImage={callbackAfterChooseImage}
        />
        {list.map((item,index)=>{
          return(
            <MenuItem 
              item={item} key={"menu_item_" + index}
            />
          )
        })}

      </>
    );
}