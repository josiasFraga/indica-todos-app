import React from "react";

import { StyleSheet, View, Image, StatusBar, ScrollView } from "react-native";
import { Avatar, Text } from "react-native-elements";
import GlobalStyle from "@styles/global";
import { useDispatch, useSelector } from "react-redux";
import MenusUsuario from './components/MenusUsuario';
import MenusPrestador from './components/MenusPrestador';
import MenusVisitante from './components/MenusVisitante';

import CONFIG from '@constants/configs';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CenaPerfil(props) {
  const dispatch = useDispatch();

  const [ghest, setGhest] = React.useState(false);
  const [userType, setUserType] = React.useState('');

  const userData = useSelector((state) => state.appReducer.user_data);

  const componentDidMount = async () => {
  const authToken = await AsyncStorage.getItem("bearerToken");
	const userType = await AsyncStorage.getItem('userType');

    if ( userType != null ) {
        setUserType(userType);
    }

    if (!authToken || authToken == null) {
      setGhest(true);
    } else {
      dispatch({
        type: "LOAD_USER_DATA",
      });
    }
  };

  React.useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={"light-content"}
      />

      <View style={[styles.container, { marginBottom: 20 }]}>
        <View style={[GlobalStyle.topBoxProfile]}>
          <View
            style={[
              GlobalStyle.paddingStatusBar,
              GlobalStyle.secureMargin,
              {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <View style={GlobalStyle.spaceMedium} />

            <Avatar
              rounded
              title={userData.name[0]}
              source={userData.photo ? {
                uri:
                CONFIG.baseUrl + '/' + userData.photo,
              } : null}
              size="large"
              containerStyle={{ borderWidth: 2, borderColor: "#FFF" }}
            />

            <Text style={[GlobalStyle.title2, { color: "#FFF" }]}>
              {userData.name}
            </Text>
            <Text style={[{ color: "#FFF" }]}>{userData.phone}</Text>
          </View>

            <View style={GlobalStyle.spaceSmall} />

        </View>

        <View style={GlobalStyle.spaceMedium} />

        <ScrollView style={[GlobalStyle.secureMargin, styles.container]}>
          <Text style={GlobalStyle.title2}>Perfil</Text>

          <View style={GlobalStyle.spaceSmall} />

          {!ghest && <MenusUsuario userType={userType} />}

          {ghest && <MenusVisitante />}          
      
          <View style={GlobalStyle.spaceMedium} />

          {userType == 'servide_provider' && 
          <>          
            <Text style={GlobalStyle.title2}>Empresa</Text>
            <MenusPrestador />
          </>
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
