import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-elements';
import COLORS from '@constants/colors';

import CenaHome from '@scenes/CenaHome';
import CenaHomeProvider from '@scenes/CenaHomeProvider';
import CenaPreLogin from '@scenes/CenaPreLogin';
import CenaPreCadastro from '@scenes/CenaPreCadastro';
import CenaLogin from '@scenes/CenaLogin';
import CenaSplash from '@scenes/CenaSplash';
import CenaEmpresaPreDadosComplementares from '@scenes/CenaEmpresaPreDadosComplementares';
import CenaEmpresaDadosComplementares from '@scenes/CenaEmpresaDadosComplementares';
import CenaCadastroPrestadores from '@scenes/CenaCadastroPrestadores';
import CenaCadastroUsuarios from '@scenes/CenaCadastroUsuarios';
import CenaSelecionaLocalizacao from '@scenes/CenaSelecionaLocalizacao';
import CenaListaPrestadores from '@scenes/CenaListaPrestadores';
import CenaPrestadorDetalhe from '@scenes/CenaPrestadorDetalhe';
import CenaPerfil from '@scenes/CenaPerfil';
import CenaAlterarDadosPrestador from '@scenes/CenaAlterarDadosPrestador';
import CenaAlterarServicos from '@scenes/CenaAlterarServicos';
import CenaAvaliarPrestador from '@scenes/CenaAvaliarPrestador';
import CenaMudaSenha from '@scenes/CenaMudaSenha';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AppTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes(props){

  const AppTabsScreenProvider = () => {
    return (
      <AppTabs.Navigator
      initialRouteName="Home"
      //activeColor={"#00000"}
      //inactiveColor={COLORS.secondary}
      screenOptions={{
        headerShown: false,
      }}>
        <AppTabs.Screen 
          name="Home" 
          component={CenaHomeProvider}
          options={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: '#CCC',
            tabBarIcon: (iconProps) => {
              return(
              <Icon name="home" size={iconProps.size} color={iconProps.color} />
              )
            }
          }}
          />
          <AppTabs.Screen 
            name="Perfil" 
            component={CenaPerfil}
            options={{
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: '#CCC',
              tabBarIcon: (iconProps) => (
                <Icon name="user" size={iconProps.size} type="font-awesome" color={iconProps.color} />
              ),
            }}
            />
      </AppTabs.Navigator>
    );
  }

  const AppTabsScreenUser = () => {
    return (
      <AppTabs.Navigator
      initialRouteName="Home"
      //activeColor={"#00000"}
      //inactiveColor={COLORS.secondary}
      screenOptions={{
        headerShown: false,
      }}>
        <AppTabs.Screen 
          name="Home" 
          component={CenaHome}
          options={{
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: '#CCC',
            tabBarIcon: (iconProps) => {
              return(
              <Icon name="home" size={iconProps.size} color={iconProps.color} />
              )
            }
          }}
          />
          <AppTabs.Screen 
            name="Perfil" 
            component={CenaPerfil}
            options={{
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: '#CCC',
              tabBarIcon: (iconProps) => (
                <Icon name="user" size={iconProps.size} type="font-awesome" color={iconProps.color} />
              ),
            }}
          />
      </AppTabs.Navigator>
    );
  }

  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
      <>
        <Stack.Screen name="Splash" component={CenaSplash} />
        <Stack.Screen name="PreLogin" component={CenaPreLogin} />
        <Stack.Screen
          name="CadastroPrestadores"
          component={CenaCadastroPrestadores}
        />
        <Stack.Screen
          name="CadastroUsuarios"
          component={CenaCadastroUsuarios}
        />
        <Stack.Screen name="PreCadastro" component={CenaPreCadastro} />
        <Stack.Screen name="Login" component={CenaLogin} />
        <Stack.Screen name="MudaSenha" component={CenaMudaSenha} />

        <Stack.Screen name="EmpresaPreDadosComplementares" component={CenaEmpresaPreDadosComplementares} />
        <Stack.Screen name="EmpresaDadosComplementares" component={CenaEmpresaDadosComplementares} />

        <Stack.Screen name="TabsScreenProvider" component={AppTabsScreenProvider} />
        <Stack.Screen name="TabsScreenUser" component={AppTabsScreenUser} />

        <Stack.Screen name="ListaPrestadores" component={CenaListaPrestadores} />

        <Stack.Screen name="PrestadorDetalhe" component={CenaPrestadorDetalhe} />

        <Stack.Screen name="AlterarDadosPrestador" component={CenaAlterarDadosPrestador} />
    
        <Stack.Screen name="AlterarServicos" component={CenaAlterarServicos} />
    
        <Stack.Screen name="AvaliarPrestador" component={CenaAvaliarPrestador} />

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="SelecionaLocalizacao" component={CenaSelecionaLocalizacao} />
        </Stack.Group>
      </>
  </Stack.Navigator>
  </NavigationContainer>
  )
}
