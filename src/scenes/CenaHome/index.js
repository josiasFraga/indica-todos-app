import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Linking, // Importe Linking para usar na função onPress do FAB
} from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import { FAB } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "@components/Header";
import UserLocation from "@components/UserLocation";
import Categories from "./components/Categories";

import COLORS from '@constants/colors';
import CONFIG from '@constants/configs';

const CenaHome = () => {
  const [deviceId, setDeviceId] = useState('');
  const [userType, setUserType] = React.useState('');


  const componentDidMount = async () => {
    const userTypeStorage = await AsyncStorage.getItem('userType');

      if ( userTypeStorage != null ) {
          setUserType(userTypeStorage);
      }

  };

  useEffect(() => {
    const fetchDeviceId = async () => {
      const id = await getUniqueId();
      setDeviceId(id);
    };

    fetchDeviceId();
  }, []);

  useEffect(() => {
	componentDidMount();
  }, []);

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
	{userType == 'servide_provider' &&
      <FAB 
        title="Ajuda" 
        placement="right"
        color={'green'}
        onPress={() => {
          Linking.openURL('https://api.whatsapp.com/send?phone=' + CONFIG.support_number);
        }}
        icon={{ name: 'whatsapp', type: 'font-awesome', color: 'white' }}
      />
	}
    </View>
  );
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

export default CenaHome;
