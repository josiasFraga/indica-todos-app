import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { ListItem, Button  } from 'react-native-elements';
import Header from "@components/Header";
import COLORS from '@constants/colors';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';

export default function CenaPrestadorDetalhe (props) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const serviceProvider = props.route.params.item;
  
    const [showFullPhone, setShowFullPhone] = React.useState(false);

    const handleShowFullPhone = async () => {
        const token = await AsyncStorage.getItem('bearerToken');
        const validade = await AsyncStorage.getItem('bearerTokenValidade');
        if (token && validade && Date.now() < (parseInt(validade) * 1000)) {
            setShowFullPhone(!showFullPhone);
        } else {
            Alert.alert('Anteção', 'Você precisa estar logado para poder ver o telefone do prestador de serviços.', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }
    };

    const openAvaliar = () => {
        navigation.dispatch(
			CommonActions.navigate({
				name: 'AvaliarPrestador',
                params: {
                    service_provider_id: serviceProvider.id
                }
			})
		);
    }

    const salvaVisita = () => {
        dispatch({
            type: 'SAVE_VISIT',
            payload: {
                service_provider_id: serviceProvider.id,
                phone_clicked: showFullPhone ? "Y" : "N"
            }
        })
    }

    componentDidMount = async () => {
        salvaVisita();
    }

    const formattedPhone =  showFullPhone ? serviceProvider.phone : `${serviceProvider.phone.slice(0, 9)}...`;

	React.useEffect(() => {

		componentDidMount();
	}, [])

	React.useEffect(() => {

        if (showFullPhone) {
            salvaVisita();
        }
	}, [showFullPhone])

    return (
        <View style={{flex: 1}}>
        
        <Header
            titulo={serviceProvider.name}
            styles={{ backgroundColor: COLORS.primary }}
            titleStyle={{ color: '#f7f7f7' }}
            backButton={true}
            iconColor={'#f7f7f7'}
        />

        <ScrollView>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
            {serviceProvider.name}
            </Text>
            <Text>Email: {serviceProvider.email}</Text>
            <View  style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text style={{ verticalAlign: 'middle'}}>
                    Telefone: {formattedPhone}
                </Text>
                {!showFullPhone && (
                <Button
                    title="Ver telefone completo"
                    onPress={handleShowFullPhone}
                    buttonStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
                    type="clear"
                />
                )}
            </View>
            <Text>Endereço: {serviceProvider.address}</Text>
            <Text>Número: {serviceProvider.address_number}</Text>
            <Text>Complemento: {serviceProvider.address_complement}</Text>
            <Text>Cidade: {serviceProvider.city}</Text>
            <Text>Estado: {serviceProvider.state}</Text>
            <Text>CEP: {serviceProvider.postal_code}</Text>
            <Text>Bairro: {serviceProvider.neighborhood}</Text>
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
            Serviços Prestados
            </Text>
            {serviceProvider.services.map((service) => (
            <ListItem  bottomDivider key={service.id}>
                <ListItem.Content>
                <ListItem.Title>{service.title}</ListItem.Title>
                <ListItem.Subtitle>{service.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            ))}
        </View>
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Button
                titleStyle={{}}
                buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary, marginBottom: 15}}
                title="Avaliar Prestador"
                onPress={openAvaliar}
                disabled={false}
            />
        </View>
        </ScrollView>
        </View>
    );
};
