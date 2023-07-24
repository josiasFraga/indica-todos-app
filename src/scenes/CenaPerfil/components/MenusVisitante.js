import React from 'react';

import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function MenusVisitante () {

    const navigation = useNavigation();
    const dispatch = useDispatch();

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
          name: 'Logar',
          subtitle: '',
          onPress: () => {
            logout();
          }
        },
    ];

    return (
      <>

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