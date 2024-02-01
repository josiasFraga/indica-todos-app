import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Card, Icon, Text } from "react-native-elements";
import COLORS from "@constants/colors";
import { useDispatch, useSelector } from "react-redux";
import ImageView from "react-native-image-viewing";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import Carousel from 'react-native-reanimated-carousel';

export default function PhotoGallery(props) {
  const dispatch = useDispatch();

  const photo_gallery = useSelector((state) => state.appReducer.photo_gallery);
  const photo_gallery_loading = useSelector(
    (state) => state.appReducer.is_photo_gallery_loading
  );
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const ServiceProviderId = props.ServiceProviderId;

  const carregaFotos = () => {
    dispatch({
      type: "LOAD_PHOTO_GALLERY",
      payload: {
        service_provider_id: ServiceProviderId
      },
    });
  };
  useEffect(() => {
    carregaFotos();
  }, []);

  const images = photo_gallery.map((photo) => ({ uri: photo.photo }));

  return (
    <>

    {
        images.length == 0 && !photo_gallery_loading && <View style={styles.emptyListText}><Text>Nenhuma foto cadastrada pelo prestador.</Text></View>
    }

    {
        images.length > 0 && !photo_gallery_loading &&
        <Carousel
            loop
            width={width-30}
            height={width / 2}
            autoPlay={true}
            data={photo_gallery}
            scrollAnimationDuration={1000}
            autoPlayInterval={4000}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index, item }) => (
                <TouchableOpacity
                onPress={() => {
                  setCurrentImageIndex(index);
                  setIsViewerVisible(true);
                }}
                style={styles.photoContainer}
                key={'photo_' + index}
              >
                <Card containerStyle={{padding: 0, margin: 0, width: '100%', height: '100%'}}>
                  <Card.Image source={{ uri: item.photo }} style={{ width: '100%', height: '100%' }} />
                </Card>
              </TouchableOpacity>
            )}
        />
    }

        

        <ImageView
            images={images}
            imageIndex={currentImageIndex}
            visible={isViewerVisible}
            onRequestClose={() => setIsViewerVisible(false)}
        />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  photoContainer: {
    width: '100%', // Subtrai a margem/padding para garantir que duas imagens caibam na linha
    height: '100%', // Mantém a proporção 1:1 para as imagens, ajuste conforme necessário
    padding: 0, // Adiciona um pouco de espaço entre as fotos
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
