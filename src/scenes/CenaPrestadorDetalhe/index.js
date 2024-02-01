import React from 'react';
import { View, Text, StyleSheet, Linking, useWindowDimensions, TouchableHighlight, ScrollView } from 'react-native';
import { ListItem, Button, Tab, Rating, Avatar, Card, Icon } from 'react-native-elements';
import Header from "@components/Header";
import COLORS from '@constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import CONFIG from '@constants/configs';
import GlobalStyle from '@styles/global';
import PhotoGallery from './components/PhotoGallery';


export default function CenaPrestadorDetalhe(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const layout = useWindowDimensions();

  const serviceProvider = props.route.params.item;

  const [showFullPhone, setShowFullPhone] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const reviews = useSelector((state) => state.appReducer.reviews);

  const [routes] = React.useState([
    { key: 'first', title: 'Dados' },
    { key: 'second', title: 'Avaliações' },
  ]);


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

  const openWpp = (number) =>{

    const message = "";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+55${number.replace(/\D/g,'')}&text=${encodeURIComponent(message)}`;
  
    try {
      Linking.openURL(whatsappUrl)

    } catch (error) {
      console.error('Não foi possível abrir o WhatsApp', error);
    }
  }

  const openPhoneCall = (number) => {
    Linking.openURL(`tel:${number.replace(/\D/g,'')}`)
    .catch(err => console.error('An error occurred', err));
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

  const renderTabBar = props => (
    <View style={{ flexDirection: 'row' }}>
      {props.navigationState.routes.map((route, i) => {
        const isActive = props.navigationState.index === i;
        const color = isActive ? '#f7f7f7' : COLORS.secondary;
        const backgroundColor = COLORS.primary;
        const underlayColor = '#B3749F'; // Cor de fundo ao clicar no botão
  
        // Estilos para a linha abaixo do item ativo
        const borderBottomColor = isActive ? '#FFFFFF' : backgroundColor;
        const borderBottomWidth = isActive ? 2 : 0;
  
        return (
          <TouchableHighlight
            key={i}
            underlayColor={underlayColor}
            style={{ 
              flex: 1,
              backgroundColor,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 7,
              borderBottomColor,
              borderBottomWidth
            }}
            onPress={() => setIndex(i)}>
            <Text style={{ color, fontWeight: 'bold', fontSize: 16 }}>{route.title}</Text>
          </TouchableHighlight>
        );
      })}
    </View>
  );

  const formattedPhone = showFullPhone ? serviceProvider.phone : `${serviceProvider.phone.slice(0, 9)}...`;

  const TabDadosPrestador = () => (
    <ScrollView style={{flex: 1}}>
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        {serviceProvider.name}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[GlobalStyle.textBlack, { verticalAlign: 'middle', marginRight: 8}]}>Telefone:</Text>
  
            <Text style={[GlobalStyle.textBlack, { marginLeft: 3 }]}>{formattedPhone}</Text>
          </View>
          <View style={GlobalStyle.row}>
            <Button
              icon={
                <Icon
                  name="phone"
                  size={18}
                  type='font-awesome'
                  color="#FFF"
                />
              }
              iconRight
              buttonStyle={{backgroundColor: COLORS.primary}}
              onPress={()=> openPhoneCall(formattedPhone)}
            />
            <Button
              icon={
                <Icon
                  name="whatsapp"
                  size={18}
                  type='font-awesome'
                  color="#FFF"
                />
              }
              iconRight
              buttonStyle={{backgroundColor: COLORS.primary, marginRight: 10}}
              onPress={()=> openWpp(formattedPhone)}
            />
          </View>
        </View>   
        <Text style={GlobalStyle.textBlack}>CEP: {serviceProvider.postal_code}</Text>
        <Text style={GlobalStyle.textBlack}>Bairro: {serviceProvider.neighborhood}</Text>
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
          Galeria de Fotos
        </Text>

        <View style={styles.cardContainerTwo}>
          <PhotoGallery 
            ServiceProviderId={serviceProvider.id}
          />
        </View>
  
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
    <>
    <View style={{ paddingTop: 16, flex: 1 }}>
        <View style={{paddingHorizontal: 16}}>
            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>Avaliações</Text>
        </View>
    {
      reviews.length == 0 && <View style={styles.emptyListText}><Text>Nenhuma avaliação encontrada.</Text></View>
    }
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
  </>
  );

  
  const renderScene = SceneMap({
    first: TabDadosPrestador,
    second: TabAvaliacoes,
  });

  React.useEffect(() => {
    salvaVisita();
    carregaAvaliacoes();
  }, []);

  return  (
    <View style={{ flex: 1 }}>
      <Header
        titulo={serviceProvider.name}
        styles={{ backgroundColor: COLORS.primary }}
        titleStyle={{ color: '#f7f7f7' }}
        backButton={true}
        iconColor={'#f7f7f7'}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        scrollEnabled
        tabStyle={{}}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />
    </View>
  )

}

const styles = StyleSheet.create({
    cardContainer: {
      borderRadius: 8,
      paddingBottom: 10,
      elevation: 2, // Adicione sombra ao card (opcional)
    },
    cardContainerTwo: {
      backgroundColor: '#ffffff',
      borderRadius: 0,
      paddingBottom: 0,
      elevation: 0, // Adicione sombra ao card (opcional)
      borderBottomWidth: 0.5,
      borderBottomColor: "#999"
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
    emptyListText: {
      textAlign: "center",
      flexDirection: 'column',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 50
    }
  });