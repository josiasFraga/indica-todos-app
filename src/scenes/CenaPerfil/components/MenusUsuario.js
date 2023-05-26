import React from 'react';
import {
    FlatList
} from 'react-native';

import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';
import ModalMudaSenha from '@components/Modals/ModalMudaSenha';
import ModalChooseOrSendPhoto from '@components/Modals/ModalChooseOrSendPhoto';

export default function MenusUsuario () {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [modalSenhaVisivel, setModalSenhaVisivel] = React.useState(false);
    const [modalPhotoVisible, setModalPhotoVisible] = React.useState(false);

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
          name: 'Sair',
          subtitle: '',
          onPress: () => {
            logout();
          }
        },
    ];

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
        <FlatList
            keyExtractor={this.keyExtractor}
            data={list}
            renderItem={({ item, index, separators }) => 
              <MenuItem 
              item={item} key={"menu_item_" + index}
              />
            }
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            style={{flex: 1}}
        />
      </>
    );
}