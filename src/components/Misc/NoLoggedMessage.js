import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import COLORS from '@constants/colors';


export default function NoLoggedMessage(props) {
    const navigation = useNavigation();
 
    return (

        <View style={styles.innerContainer}>
          <Text style={styles.loginMessage}>Você precisa estar logado para avaliar o prestador.</Text>
          <Button
            title="Fazer Login"
            onPress={() => navigation.navigate('Login')}
            buttonStyle={styles.loginButton}
            titleStyle={styles.loginButtonText}
          />
        </View>
    );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loginMessage: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: COLORS.quaternary, // Customize the color of the message
  },
  loginButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: COLORS.primary,
  },
  loginButtonText: {
    fontSize: 16,
  },
});
