import React from 'react';
import {
    FlatList
} from 'react-native';

import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';

export default function MenusUsuario () {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const logout = () => {
      /*Actions.home({type: ActionConst.RESET});
      AsyncStorage.removeItem('usuario');
      AsyncStorage.removeItem('cliente');
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('dadosComplementares');
      this.props.resetState();*/
      //AsyncStorage.removeItem('user_location');
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
            this.props.setModalSenhaVisible(true);
          }
        },
        {
          name: 'Sair',
          subtitle: '',
          onPress: () => {
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
          }
        },
    ];

    return (
        <FlatList
            keyExtractor={this.keyExtractor}
            data={list}
            renderItem={({ item, index, separators }) => <MenuItem item={item} key={"menu_item_" + index}/>}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled
            style={{flex: 1}}
        />
    );
}