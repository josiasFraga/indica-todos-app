import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { CommonActions } from '@react-navigation/native';

import { Text, Button, Icon } from "react-native-elements";

import COLORS from "@constants/colors";
import Header from "@components/Header";
import GlobalStyle from "@styles/global";

export default function CenaPreCadastro(props) {

  openCadastroPrestadores = () => {
		props.navigation.dispatch(
			CommonActions.navigate({
				name: 'CadastroPrestadores'
			})
		);
  }

  openCadastroUsuarios = () => {
		props.navigation.dispatch(
			CommonActions.navigate({
				name: 'CadastroUsuarios'
			})
		);
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <Header
        backButton
        titulo=""
        styles={{ backgroundColor: "transparent" }}
        titleStyle={{ color: COLORS.primary }}
        iconColor={COLORS.primary}
      />
      <View style={[styles.buttonsContainer, GlobalStyle.secureMargin]}>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>
            O que você está buscando no Indica Todos?
          </Text>
        </View>

        <View style={GlobalStyle.spaceSmall} />

        <View style={styles.buttonContainer}>
          <Button
            icon={
              <View style={{ marginRight: 20 }}>
                <Icon
                  name="business-outline"
                  size={21}
                  type="ionicon"
                  iconStyle={{ color: COLORS.primary }}
                />
              </View>
            }
            titleStyle={{ color: COLORS.primary }}
            buttonStyle={{ borderRadius: 25, paddingVertical: 10 }}
            type="outline"
            title="Quero anunciar meus serviços"
            onPress={() => {
              openCadastroPrestadores();
            }}
          />
        </View>

        <View style={GlobalStyle.spaceSmall} />

        <View style={styles.buttonContainer}>
          <Button
            icon={
              <View style={{ marginRight: 20 }}>
                <Icon
                  name="user"
                  size={21}
                  type="antdesign"
                  iconStyle={{ color: COLORS.primary }}
                />
              </View>
            }
            titleStyle={{ color: COLORS.primary }}
            buttonStyle={{ borderRadius: 25, paddingVertical: 10 }}
            type="outline"
            title="Quero encontrar prestadores de serviços"
            onPress={() => {
              openCadastroUsuarios();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  buttonsContainer: {
    alignContent: "center",
    justifyContent: "center",
    flex: 1,

    //alignItems: 'center'
  },
  buttonTextContainer: {},
  buttonText: { fontSize: 18, textAlign: "center" },
  buttonContainer: {},
});
