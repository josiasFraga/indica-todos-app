import React from 'react';
import {
    View,
    Text
  } from 'react-native';

  import { useDispatch } from 'react-redux';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function CenaSelecionaLocalizacao (props) {

    const dispatch = useDispatch();

    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');

    const getAddressComponent = (details, type) => {
        const component = details.address_components.find(c => c.types.includes(type));
        return component ? component.short_name : null;
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Buscar Cidade</Text>

        <GooglePlacesAutocomplete
            placeholder='Digite o nome da sua cidade'
            fetchDetails={true}
            onPress={(data, details = null) => {

                const city_name = getAddressComponent(details, 'administrative_area_level_2');
                const uf_name = getAddressComponent(details, 'administrative_area_level_1');
    
                setCity(city_name);
                setState(uf_name);

                dispatch({
                    type: 'SAVE_USER_LOCATION',
                    payload: {
                        submitValues: {
                            city: city_name,
                            state: uf_name,
                        },
                        callback_success: () => {
                            dispatch({
                                type: 'LOAD_USER_LOCATION',
                                payload: {},
                            });
                            props.navigation.goBack()
                        }
                    }
                });
            }}
            query={{
                key: 'AIzaSyDsTpnJ5RphQ1QhdmtZNntryliBUQxUrbQ',
                language: 'pt-BR',
                types: '(cities)',
                components: 'country:br',
            }}
            minLength={2}
            autoFocus={true}
        />
        <Text style={{ marginTop: 20 }}>Cidade: {city}</Text>
        <Text>Estado: {state}</Text>
      </View>
    )
}
