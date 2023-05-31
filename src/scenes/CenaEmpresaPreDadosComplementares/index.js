import React from 'react';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {SocialIcon} from 'react-native-elements';

import GlobalStyle from '@styles/global';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '@constants/colors';


export default function CenaEmpresaPreDadosComplementares (props) {

  const dispatch = useDispatch();
  
  //const [user, setUser] = React.useState(null);
  const userData = useSelector((state) => state.appReducer.user_data);
  
  
  componentDidMount = async () => {
    
    dispatch({
      type: "LOAD_USER_DATA",
    });
  }

	React.useEffect(() => {
	
		componentDidMount();
	}, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        translucent={true}
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
      />
      
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flex: 1}}>
        <View style={GlobalStyle.secureMargin}>
          <Text style={[GlobalStyle.title, GlobalStyle.textCenter]}>Olá {userData?.name},</Text>
          <View style={GlobalStyle.spaceSmall} />
          <Text style={{}}>Estamos quase lá, só precisamos saber mais algumas coisas sobre seu negócio para que possamos encontrar os clientes certos pra você.</Text>
        </View>
      </View>
      <View style={[GlobalStyle.secureMargin, styles.mb_2]}>
        <TouchableOpacity onPress={()=>{ 
          props.navigation.dispatch(
            CommonActions.navigate({
              name: 'EmpresaDadosComplementares'
            })
          );
         }}>
          <SocialIcon
            button
            title="Vamos Lá"
            style={{backgroundColor: COLORS.primary}}
          />
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagButtonContainer: {
    marginRight: 10,
    marginTop: 10,
  },
  tagButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tagButtonInactive: {
    backgroundColor: '#eee',
  },
  tagButtonActive: {
    backgroundColor: '#a60000',
  },
  tagButtonTextActive: {
    color: '#FFF',
  },
  buttonLimpar: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonLimparText: {
    textAlign: 'center',
  },
  buttonFiltrar: {
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#A60000',
  },
  buttonFiltrarText: {
    textAlign: 'center',
    color: '#FFF',
  },
  mb_2: {
    marginBottom: 15
  }
});
