import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
} from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import Header from "@components/Header";
import UserLocation from "@components/UserLocation";
import Categories from "./components/Categories";

import COLORS from '@constants/colors';

type Props = {};
export default class CenaHome extends Component<Props> {

	state = {
		deviceId: '',
	}

	componentDidMount = async () => {
		const deviceId = await getUniqueId();
		this.setState({deviceId: deviceId});

	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					translucent={true}
					backgroundColor={'transparent'}
					barStyle={'light-content'}
				/>
    
				<Header
					titulo="Indica Todos"
					styles={{ backgroundColor: COLORS.primary }}
					titleStyle={{ color: '#f7f7f7' }}
				/>

				<UserLocation />

				<Categories />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: { 
		justifyContent: 'center',
		alignItems: 'center',
		flex: 2
	},
	text: {
		fontFamily: 'Mitr-Regular',
		lineHeight: 18,
	},
	textMedium: {
		fontFamily: 'Mitr-Medium',
		marginBottom: 3,
	},
	centerFully: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 15,
		marginBottom: 7,
	},
	innerSpace: {
		padding: 15,
	},
	discountBox: {
		borderWidth: 0.5,
		borderColor: '#CCC',
		padding: 15,
		borderRadius: 15,
		margin: 15,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonVisitante: {
		marginTop: 15,
	},
	buttonCadastrarText: {
		textAlign: 'center',
		color: '#FFF',
	},
	bgImage: {
		width: 120,
		height: 120,
		position: 'absolute',
		zIndex: 999,
		bottom:-50,
		right: -20,
		alignSelf: 'flex-end',
	}
});
