import React from 'react';
import {
	View,
    Modal,    
    StyleSheet,
    PermissionsAndroid 
} from 'react-native'
import {Icon, Button, Text} from 'react-native-elements';
import GlobalStyle from '@styles/global';

import COLORS from '@constants/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
  mediaType: 'photo',
  quality: 0.4,
  //cameraType: 'front'
};

export default function ChooseOrSendPhotos (props) {
    const openImagePicker = () => {
      props.callbackBeforeChooseImage();
      launchImageLibrary(options, response => {
  
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            if (response.customButton == 'docReader') {
                openScannerModal();
            }
            console.log('User tapped custom button: ', response.customButton);
        } else {
            let fileName = response.assets[0].fileName;
            let fileType = response.assets[0].type;
            let fileUri = response.assets[0].uri;
  
            let source = {
              uri: fileUri,
              type: fileType,
              name: fileName
            };
  
            props.callbackAfterChooseImage(source);
        }
      });
    };

    const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission given");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };
  
    const openCameraPicker = async () => {
        
        props.callbackBeforeChooseImage();
        await requestCameraPermission();
        launchCamera(options, response => {
  
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                if (response.customButton == 'docReader') {
                    openScannerModal();
                }
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response);
                let fileName = response.assets[0].fileName;
                let fileType = response.assets[0].type;
                let fileUri = response.assets[0].uri;
  
                let source = {
                  uri: fileUri,
                  type: fileType,
                  name: fileName
                };

                console.log(source);
  
                props.callbackAfterChooseImage(source);
            }
        });
    };
	
    return(
    <View style={GlobalStyle.secureMargin}>

        <Modal
            visible={props.visible}
            animationType={'slide'}
            presentationStyle={'overFullScreen'}
            transparent={true}
            onRequestClose={() => props.setModalVisible(false)}>
                <View style={styles.modal}>
                    <View style={styles.buttonContainer}>
                        <View style={[GlobalStyle.row, GlobalStyle.centerItems, {justifyContent: 'space-around'}]}>
                            <Button
                            icon={
                                <Icon
                                name="upload"
                                size={30}
                                color={COLORS.quaternary}
                                type="antdesign"
                                />
                            }
                            title=""
                            onPress={openImagePicker}
                            buttonStyle={styles.button}
                            />
                            <Button
                            iconTop
                            icon={
                                <Icon
                                name="camerao"
                                size={30}
                                color={COLORS.quaternary}
                                type="antdesign"
                                />
                            }
                            
                            title=""
                            onPress={openCameraPicker}
                            buttonStyle={styles.button}
                            />
                        </View>
                        <Button
                            title="Cancelar"
                            type="clear"
                            onPress={() => props.setModalVisible(false)}
                            buttonStyle={styles.buttonClose}
                            titleStyle={{color: COLORS.primary}}
                        />
                    </View>
                    
                </View>
        </Modal>

    </View>
    )
    
}

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 25,
        
    },
    buttonContainer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        marginHorizontal: 10,
        width: '70%',
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 10,  
        paddingVertical: 25, 
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 20,
        borderRadius: 40
    },
    buttonClose: {
        marginTop: 20,
        alignSelf: 'center',
        color: COLORS.primary,
    }
});