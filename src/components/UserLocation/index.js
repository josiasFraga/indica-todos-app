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
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCO0jm3bxxMZFx1M03BH5v2zKOTPXe-pjk'; // Substitua com sua chave da API do Google Maps

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
            payload: {
                callbackNotFind: getUserLocation
            },
        });
        
    },[]);

    const getUserLocation = () => {
        Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const location = await getCityAndStateFromCoordinates(latitude, longitude);
              if (location) {
                  
                  dispatch({
                      type: 'SAVE_USER_LOCATION',
                      payload: {
                          submitValues: {
                              city: location.city,
                              state: location.state,
                          },
                          callback_success: () => {
                              dispatch({
                                  type: 'LOAD_USER_LOCATION',
                                  payload: {},
                              });
                          }
                      }
                  });
              }
            },
            (error) => console.error(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
    }


    const getCityAndStateFromCoordinates = async (latitude, longitude) => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`);
        const addressComponents = response.data.results[0].address_components;

        let city = addressComponents.find(component => component.types.includes('locality'));
        let state = addressComponents.find(component => component.types.includes('administrative_area_level_1')).short_name;

        if ( !city ) {
            city = addressComponents.find(component => component.types.includes('administrative_area_level_2'));
        }

        city = city.long_name;

        return { city, state };
      } catch (error) {
        console.error(error);
        return null;
      }
    
    };


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

