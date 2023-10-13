import React from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	Platform
} from 'react-native';
import {Button, Icon, Image } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import { CommonActions } from '@react-navigation/native';

import IMAGES from '@constants/images';
import COLORS from '@constants/colors';

export default function CenaPreLogin(props) {


	const openLogin = () => {
		props.navigation.dispatch(
			CommonActions.navigate({
				name: 'Login'
			})
		);
	}

	const visitante = () => {
		props.navigation.dispatch(
			CommonActions.navigate({
				name: 'TabsScreenUser'
			})
		);

	}

	const openCadastro = () => {
		props.navigation.dispatch(
			CommonActions.navigate({
				name: 'PreCadastro'
			})
		);
	}

    return (
        <View style={[styles.container, {backgroundColor: '#fff'}]}>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
			
            <View style={styles.imageContainer}>
                <Image source={IMAGES.LOGO} style={{ width: 170, height: 170 }} />
            </View>
            <View style={[GlobalStyle.secureMargin, {flex: 1, justifyContent: 'flex-end'}]}>
                <View style={styles.innerSpace}>
                    <Button
                        icon={
                            <View style={{marginRight: 20}}>
                            <Icon
                                name="login"
                                size={23}
                                type='entypo'
                                iconStyle={{color: COLORS.secondary}}
                            />
                            </View>
                        }
                        titleStyle={{}}
                        buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
                        title="Entrar usando email"
                        onPress={()=>{
							openLogin()
						}}
                    />
                </View>
                <View style={styles.innerSpace}>
                    <Button
                        icon={
                            <View style={{marginRight: 20}}>
							<Icon
								name="user-o"
								size={20}
								type='font-awesome'
								iconStyle={{color: COLORS.secondary}}
							/>
                            </View>
                        }
                        titleStyle={{}}
                        buttonStyle={{borderRadius: 25, paddingVertical: 10, backgroundColor: COLORS.primary}}
                        title="Entrar como visitante"
                        onPress={visitante}
                    />
                </View>
				<View style={styles.innerSpace}>

					<Button
						icon={
							<View style={{marginRight: 20}}>
							<Icon
								name="user-plus"
								size={19}
								type='font-awesome'
								iconStyle={{color: COLORS.primary}}
							/>
							</View>
						}
						titleStyle={{color: COLORS.primary}}
						type='outline'
						buttonStyle={{borderRadius: 25, paddingVertical: 10}}
						title="Cadastrar-se"
						onPress={openCadastro}
					/>
				</View>
            </View>
            <View style={[GlobalStyle.secureMargin, {flex: 1, justifyContent: 'flex-end'}]}>
                <View style={styles.bgImage}>
                    <Image source={IMAGES.BALL_BG} style={{ width: 140, height: 140 }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: { 
		justifyContent: 'center',
		alignItems: 'center',
		flex: 2
	},
	text: {
		fontFamily: 'Mitr-Regular',
		lineHeight: 18,
	},
	textMedium: {
		fontFamily: 'Mitr-Medium',
		marginBottom: 3,
	},
	centerFully: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 15,
		marginBottom: 7,
	},
	innerSpace: {
		padding: 15,
	},
	discountBox: {
		borderWidth: 0.5,
		borderColor: '#CCC',
		padding: 15,
		borderRadius: 15,
		margin: 15,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonVisitante: {
		marginTop: 15,
	},
	buttonCadastrarText: {
		textAlign: 'center',
		color: '#FFF',
	},
	bgImage: {
		width: 120,
		height: 120,
		position: 'absolute',
		zIndex: 999,
		bottom:-50,
		right: -20,
		alignSelf: 'flex-end',
	}
});
