import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Card, Icon, Text } from "react-native-elements";
import Header from "@components/Header";
import COLORS from "@constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions, useNavigation } from "@react-navigation/native";
import ImageView from "react-native-image-viewing";

import CONFIG from "@constants/configs";
import GlobalStyle from "@styles/global";

export default function CenaGaleriaFotos(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const photo_gallery = useSelector((state) => state.appReducer.photo_gallery);
  const photo_gallery_loading = useSelector(
    (state) => state.appReducer.is_photo_gallery_loading
  );
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSendPhoto = () => {
    dispatch({
      type: "SAVE_VISIT",
      payload: {
        service_provider_id: serviceProvider.id,
        phone_clicked: showFullPhone ? "Y" : "N",
      },
    });
  };

  const carregaFotos = () => {
    dispatch({
      type: "LOAD_PHOTO_GALLERY",
      payload: {},
    });
  };

  useEffect(() => {
    carregaFotos();
  }, []);

  const images = photo_gallery.map((photo) => ({ uri: photo.photo }));

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
          <TouchableOpacity
            onPress={() => {
              setCurrentImageIndex(index);
              setIsViewerVisible(true);
            }}
          >
            <Card>
              <Card.Image source={{ uri: item.imageUrl }} />
            </Card>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Nenhuma imagem cadastrada.
          </Text>
        )}
        refreshing={photo_gallery_loading}
      />

      <Button
        title="Enviar Foto"
        onPress={handleSendPhoto}
        disabled={photo_gallery.length >= 10}
        buttonStyle={styles.sendButton}
        onRefresh={() => {
          carregaFotos();
        }}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  sendButton: {
    margin: 10,
    backgroundColor: COLORS.primary,
  },
});
