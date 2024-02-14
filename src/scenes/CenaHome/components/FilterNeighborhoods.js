import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Modal,
	ScrollView,
    TouchableHighlight
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {Icon, Text, CheckBox } from 'react-native-elements';


import COLORS from '@constants/colors';

export default function FilterNeighborhoods(props) {

	const neighborhoods = useSelector((state) => state.appReducer.neighborhoods);
	const [modalVisible, setModalVisible] = React.useState(false);
    const [neighborhoodsSelecteds, setNeighborhoodsSelecteds] = useState(props.neighborhoodsSelecteds ? props.neighborhoodsSelecteds.split(',') : '');

    const toggleSelection = (neighborhood) => {
        if (neighborhoodsSelecteds.includes(neighborhood)) {
            setNeighborhoodsSelecteds(neighborhoodsSelecteds.filter(item => item !== neighborhood));
        } else {
            setNeighborhoodsSelecteds([...neighborhoodsSelecteds, neighborhood]);
        }
    };


    const applyFilter = () => {
        props.setNeighborhoodsSelecteds(neighborhoodsSelecteds.join(','));
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight  
                activeOpacity={0.6}  
                underlayColor="#DDDDDD"  
                onPress={() => setModalVisible(true)}
            >
                <View style={{
                    backgroundColor: '#FFF', 
                    paddingVertical: 10, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: COLORS.primary
                }}>
                    <Text style={{textAlign: 'center', fontSize: 14, color: COLORS.primary, fontWeight: 'bold'}}>
                        Filtrar por bairros
                    </Text>
                    <Icon  name='filter'  type='antdesign' size={19}  color={COLORS.primary}/>
                </View>
            </TouchableHighlight>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filtrar por Bairros</Text>
                    </View>
                    <ScrollView style={styles.modalContent}>
                        {neighborhoods.map((neighborhood) => (
                            <CheckBox
                                key={neighborhood.neighborhood}
                                title={neighborhood.neighborhood}
                                checked={neighborhoodsSelecteds.includes(neighborhood.neighborhood)}
                                onPress={() => toggleSelection(neighborhood.neighborhood)}
                            />
                        ))}
                    </ScrollView>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmButton} onPress={applyFilter}>
                            <Text style={styles.confirmButtonText}>Aplicar Filtro</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
        backgroundColor: '#FFF'

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
	},
	modalContainer: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 10,
		flex: 1,
		justifyContent: 'space-between',
	},
	modalHeader: {
		padding: 10,
		backgroundColor: COLORS.primary,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	modalTitle: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
	},
	modalContent: {
		padding: 10,
	},
	modalFooter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
	},
	closeButton: {
		backgroundColor: '#ccc',
		padding: 10,
		borderRadius: 5,
	},
	closeButtonText: {
		color: '#333',
	},
	confirmButton: {
		backgroundColor: COLORS.primary,
		padding: 10,
		borderRadius: 5,
	},
	confirmButtonText: {
		color: '#fff',
	},
});
