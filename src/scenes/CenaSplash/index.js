import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	StatusBar
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import IMAGES from '@constants/images';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '@constants/colors';

function CenaSplash (props) {

	const componentDidMount = async () => {

		const authToken = await AsyncStorage.getItem('bearerToken');
		const userType = await AsyncStorage.getItem('userType');
		const servicesExist = await AsyncStorage.getItem('servicesExist');

		const networkStatus = await NetInfo.fetch();
		if (!networkStatus.isConnected) {
			console.log("Sem internet");
		} else {
			console.log("tem internet");
		}

		if ( authToken == null ) {
			setTimeout(() => {
				props.navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
					  { name: 'TabsScreenUser' },
					],
				  })
				)
			},5000);

		} else {
		
			try {
				const token = await AsyncStorage.getItem('bearerToken');
				const validade = await AsyncStorage.getItem('bearerTokenValidade');
			
				// Verifique se o token existe e ainda é válido
				if (token && validade && Date.now() < (parseInt(validade) * 1000)) {
	
					// O token é válido, redirecione para a tela principal
					let redirectToScene = 'TabsScreenUser';
					if ( userType == 'servide_provider' && servicesExist == '0' ) {
						redirectToScene = 'EmpresaPreDadosComplementares';
					} else if ( userType == 'servide_provider' && servicesExist != '0' ) {
						redirectToScene = 'TabsScreenProvider';
					}
					setTimeout(() => {
						props.navigation.dispatch(
						CommonActions.reset({
							index: 1,
							routes: [
							{ name:  redirectToScene },
							],
						})
						)
					},5000);
	
				} else {	
					// O token não é válido, redirecione para a tela de login
					props.navigation.dispatch(
						CommonActions.navigate({
						name: 'PreLogin',
						})
					);
				}
			} catch (error) {
				console.log('Erro ao verificar a validade do token: ', error);
			}

		}

	}

	React.useEffect(() => {
	
		componentDidMount();
	}, [])

	return (
		<View style={[styles.container, {backgroundColor: COLORS.primary}]}>
			<StatusBar
				translucent={true}
				backgroundColor={'transparent'}
				barStyle={'dark-content'}
			/>

			<View style={styles.imageContainer}>
				<Image source={IMAGES.LOGO} style={{ width: 200, height: 200 }} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	container: {
		flex: 1,
	}
});

export default CenaSplash;