import React from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, Linking, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Button, Tab, TabView, Rating, Avatar, Card  } from 'react-native-elements';
import Header from "@components/Header";
import COLORS from '@constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CONFIG from '@constants/configs';
import GlobalStyle from '@styles/global';

export default function CenaPrestadorDetalhe(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const serviceProvider = props.route.params.item;

  const [showFullPhone, setShowFullPhone] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const reviews = useSelector((state) => state.appReducer.reviews);

  const handleShowFullPhone = async () => {
    setShowFullPhone(!showFullPhone);
    /*const token = await AsyncStorage.getItem('bearerToken');
    const validade = await AsyncStorage.getItem('bearerTokenValidade');
    if (token && validade && Date.now() < parseInt(validade) * 1000) {
      setShowFullPhone(!showFullPhone);
    } else {
      Alert.alert('Atenção', 'Você precisa estar logado para poder ver o telefone do prestador de serviços.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }*/
  };

  const openAvaliar = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'AvaliarPrestador',
        params: {
          service_provider_id: serviceProvider.id,
          setIndex: setIndex
        },
      })
    );
  };

  const openWpp = async (number) =>{
    const message = '';
    const whatsappUrl = `whatsapp://send?phone=+55${number}&text=${encodeURIComponent(message)}`;
  
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
  
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert("Erro", "WhatsApp não está instalado");
      }
    } catch (error) {
      console.error('Não foi possível abrir o WhatsApp', error);
    }
  }

  const salvaVisita = () => {
    dispatch({
      type: 'SAVE_VISIT',
      payload: {
        service_provider_id: serviceProvider.id,
        phone_clicked: showFullPhone ? 'Y' : 'N',
      },
    });
  };

  const carregaAvaliacoes = () => {
    dispatch({
        type: 'LOAD_REVIEWS',
        payload: {
            service_provider_id: serviceProvider.id,
        },
    });
  }

  const formattedPhone = showFullPhone ? serviceProvider.phone : `${serviceProvider.phone.slice(0, 9)}...`;

  const TabDadosPrestador = () => (
    <ScrollView style={{flex: 1}}>
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        {serviceProvider.name}
        </Text>
        <View  style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={()=>{
            if ( showFullPhone ) {
              openWpp(formattedPhone);
            }
          }}>
            <Text style={[GlobalStyle.textBlack, { verticalAlign: 'middle'}]}>
                Telefone: {formattedPhone}
            </Text>
          </TouchableWithoutFeedback>
          {!showFullPhone && (
          <Button
              title="Ver telefone completo"
              onPress={handleShowFullPhone}
              buttonStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
              type="clear"
          />
          )}
        </View>
    </View>
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Serviços Prestados
        </Text>
        {serviceProvider.services.map((service) => (
        <ListItem  bottomDivider key={service.id}>
            <ListItem.Content>
            <ListItem.Title>{service.title}</ListItem.Title>
            <ListItem.Subtitle  style={GlobalStyle.textBlack}>{service.description}</ListItem.Subtitle>
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
  );

  const TabAvaliacoes = () => (
    <ScrollView style={{flex: 1}}>
    <View style={{ paddingTop: 16, flex: 1 }}>
        <View style={{paddingHorizontal: 16}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Avaliações</Text>
        </View>
    {reviews.map((review) => {

      return(
      <Card key={review.created} containerStyle={styles.cardContainer}>
        <View style={styles.reviewHeader}>
          <Avatar
            rounded
            source={{ uri: CONFIG.baseUrl + '/img/users/' + review.user.photo }}
            size={40}
          />
          <View style={{ flex: 1, marginLeft: 12, flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={styles.userName}>{review.user.name}</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={16}
              readonly
              startingValue={review.rating}
              style={{ marginTop: 4 }}
            />
          </View>
        </View>
        <Text style={styles.reviewDate}>
          Criada em: {format(new Date(review.created), 'dd/MM/yyyy', { locale: ptBR })}
        </Text>
        <Text style={styles.reviewComment}>&quot;{review.comment}&quot;</Text>
      </Card>
      )
    })}
  </View>
  </ScrollView>
  );

  React.useEffect(() => {
    salvaVisita();
    carregaAvaliacoes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header
        titulo={serviceProvider.name}
        styles={{ backgroundColor: COLORS.primary }}
        titleStyle={{ color: '#f7f7f7' }}
        backButton={true}
        iconColor={'#f7f7f7'}
      />

        <Tab value={index} onChange={setIndex}  indicatorStyle={{backgroundColor: '#f7f7f7'}}>
            <Tab.Item title="Dados" titleStyle={index == 0 ? {color: '#f7f7f7'} : {color: COLORS.secondary}} containerStyle={{backgroundColor: COLORS.primary}} />
            <Tab.Item title="Avaliações" titleStyle={index == 1 ? {color: '#f7f7f7'} : {color: COLORS.secondary}} containerStyle={{backgroundColor: COLORS.primary}} />
        </Tab>

        <TabView value={index} onChange={setIndex} >
            <TabView.Item style={{ width: '100%', flex: 1 }}>
                <TabDadosPrestador />
            </TabView.Item>
            <TabView.Item style={{ width: '100%', flex: 1 }}>
                <TabAvaliacoes />
            </TabView.Item>
        </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
    cardContainer: {
      borderRadius: 8,
      paddingBottom: 10,
      elevation: 2, // Adicione sombra ao card (opcional)
    },
    reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    userName: {
      fontSize: 13,
      fontWeight: 'bold',
    },
    reviewDate: {
      fontSize: 10,
      marginBottom: 8,
      color: '#888',
    },
    reviewComment: {
      fontSize: 14,
      color: '#555',
      fontStyle: 'italic', // Define o estilo do texto como itálico
      marginTop: 8, // Adiciona um espaçamento acima do comentário
    },
  });