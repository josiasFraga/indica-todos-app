import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from "react-native";
import { Button, Card, Icon, Text } from "react-native-elements";
import Header from "@components/Header";
import COLORS from "@constants/colors";
import { useDispatch, useSelector } from "react-redux";
import ImageView from "react-native-image-viewing";
import ModalChooseOrSendPhoto from '@components/Modals/ModalChooseOrSendPhoto';

export default function CenaGaleriaFotos(props) {
  const dispatch = useDispatch();

  const photo_gallery = useSelector((state) => state.appReducer.photo_gallery);
  const photo_gallery_loading = useSelector(
    (state) => state.appReducer.is_photo_gallery_loading
  );
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalPhotoVisible, setModalPhotoVisible] = useState(false);

  const callbackBeforeChooseImage = () => {

  }

  const callbackAfterChooseImage = (source) => {

    setModalPhotoVisible(false);
    dispatch({
      type: 'SAVE_PHOTO_GALLERY',
      payload: {
        photo: source,
        callback_success: () => {
          carregaFotos();
        }
      }
    });
  }

  const carregaFotos = () => {
    dispatch({
      type: "LOAD_PHOTO_GALLERY",
      payload: {},
    });
  };

  const excluiFoto = (photoId) => {
    Alert.alert(
      "Excluir Imagem",
      "Tem certeza que deseja excluir esta imagem?",
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          onPress: () => {
            dispatch({
              type: "DELETE_PHOTO_GALLERY",
              payload: { 
                id: photoId,
                callback_success: () => {
                  carregaFotos();
                }
              },
            });            
          },
        },
      ]
    );

  };

  useEffect(() => {
    carregaFotos();
  }, []);

  const images = photo_gallery.map((photo) => ({ uri: photo.photo }));

  console.log(images);

  return (
    <View style={styles.container}>
      <Header
        titulo={"Galeria de Fotos"}
        styles={{ backgroundColor: COLORS.primary }}
        titleStyle={{ color: "#f7f7f7" }}
        backButton={true}
        iconColor={"#f7f7f7"}
      />
  
      <FlatList
        data={photo_gallery}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              onPress={() => {
                setCurrentImageIndex(index);
                setIsViewerVisible(true);
              }}
              style={styles.photoContainer}
            >
              <Card containerStyle={{padding: 5}}>
                <Card.Image source={{ uri: item.photo }} />
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => excluiFoto(item.id)}
              style={styles.deleteButton}
            >
              <Icon
                name="delete"
                type="material"
                color="#ffffff" // Altera a cor do ícone para branco para contraste
                size={20}
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhuma imagem cadastrada.
          </Text>
        )}
        refreshing={photo_gallery_loading}
        onRefresh={carregaFotos}
      />

      <Button
        title="Enviar Foto"
        onPress={() => setModalPhotoVisible(true)}
        disabled={photo_gallery.length >= 5 || photo_gallery_loading}
        buttonStyle={styles.sendButton}
        icon={
          <Icon
            name="cloud-upload"
            type="material"
            color="#ffffff"
            size={20}
            style={{ marginLeft: 10 }}
          />
        }
        iconRight
      />

      <ImageView
        images={images}
        imageIndex={currentImageIndex}
        visible={isViewerVisible}
        onRequestClose={() => setIsViewerVisible(false)}
      />

      <ModalChooseOrSendPhoto 
        visible={modalPhotoVisible}
        setModalVisible={setModalPhotoVisible}
        callbackBeforeChooseImage={callbackBeforeChooseImage}
        callbackAfterChooseImage={callbackAfterChooseImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: "column",
    margin: 4,
    flex: 1 / 2, // Divide o espaço igualmente para 2 colunas
  },
  photoContainer: {
    flex: 1,
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: COLORS.primary, // Usa a cor de perigo para indicar ação de exclusão
    width: 40, // Define um tamanho fixo para o botão
    height: 40, // Define um tamanho fixo para o botão
    borderRadius: 20, // Arredonda completamente o botão para torná-lo circular
    justifyContent: 'center', // Centraliza o ícone verticalmente
    alignItems: 'center', // Centraliza o ícone horizontalmente
    shadowColor: "#000", // Adiciona sombra para um efeito de elevação
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // Efeito de elevação para Android
  },
  sendButton: {
    margin: 10,
    backgroundColor: COLORS.primary,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
  },
});
