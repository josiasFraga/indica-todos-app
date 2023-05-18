import React from 'react';
import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import COLORS from '@constants/colors';
import { StackActions, CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function UserLocation () {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const user_location = useSelector(state => state.appReducer.user_location);


    const openChooseLocation = () => {

        navigation.navigate('SelecionaLocalizacao');
    }

    React.useEffect(()=>{
        dispatch({
            type: 'LOAD_USER_LOCATION',
            payload: {},
        });
        
    },[]);


    return (
        <TouchableHighlight  
            activeOpacity={0.6}  
            underlayColor="#DDDDDD"  
            onPress={openChooseLocation}
        >
            <View 
                style={{
                    backgroundColor: '#FFF', 
                    paddingVertical: 10, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: COLORS.primary
                }}
            >
                <Icon   name='location-pin'  type='entypo' size={19}  color={COLORS.primary}/>
                <Text style={{textAlign: 'center', fontSize: 18, color: COLORS.primary, fontWeight: 'bold'}}>
                    {user_location.city && user_location.city + '/'}
                    {user_location.state && user_location.state}

                    {!user_location.city &&  'Selecionar minha localização'}
                </Text>
            </View>
        </TouchableHighlight>
    );
}

