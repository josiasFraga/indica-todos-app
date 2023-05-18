import React from 'react';
import {
    FlatList
} from 'react-native';

import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';
import ModalMudaSenha from '@components/Modals/ModalMudaSenha';

export default function MenusUsuario () {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [modalSenhaVisivel, setModalSenhaVisivel] = React.useState(false);

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

    const list = [

        {
          name: 'Alterar foto do perfil',
          subtitle: '',
          loading: false,
          onPress: () => {
            this.props.openChooseModal();
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