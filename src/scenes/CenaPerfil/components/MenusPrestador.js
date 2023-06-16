import React from 'react';
import MenuItem from './MenuItem';
import { useDispatch } from 'react-redux';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';

export default function MenusPrestador () {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const goToChangeDada = () => {

        navigation.dispatch(
            CommonActions.navigate({
                name: 'AlterarDadosPrestador'
            })
        );
    }

    const list = [

        {
          name: 'Alterar Dados',
          subtitle: '',
          loading: false,
          onPress: () => {
            goToChangeDada();
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