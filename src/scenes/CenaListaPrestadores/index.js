import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
	TouchableOpacity,
	Modal,
	ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {Icon, Text, CheckBox } from 'react-native-elements';

import Header from "@components/Header";
import Lista from "./components/Lista";

import COLORS from '@constants/colors';

export default function CenaListaPrestadores(props) {

	const dispatch = useDispatch();
    const categoria_id = props.route.params.categoriaId;
	const subcategories = useSelector((state) => state.appReducer.service_subcategories);
	const [modalVisible, setModalVisible] = React.useState(false);
	const [selectedSubcategories, setSelectedSubcategories] = React.useState({});
	const [selectedIdsSubcategories, setSelectedIdsSubcategories] = React.useState([]);

	console.log(selectedSubcategories);

	const toggleSelection = (id) => {
		setSelectedSubcategories({
			...selectedSubcategories,
			[id]: !selectedSubcategories[id]
		});
	};

	componentDidMount = async () => {
		fetchSubcategories();
	}

	const fetchSubcategories = async () => {
		dispatch({
			type: 'LOAD_SERVICE_SUBCATEGORIES',
			payload: {
				category_id: categoria_id
			}
		})
	
	};

	const applyFilter = () => {
		// Criar uma array com os IDs das subcategorias selecionadas
		const selectedIds = Object.keys(selectedSubcategories).filter(id => selectedSubcategories[id]);
	
		// Agora você tem uma array de IDs das subcategorias selecionadas
		// Você pode usá-la para filtrar os dados, enviar uma solicitação ao servidor, etc.
		console.log('IDs selecionados:', selectedIds);

		setSelectedIdsSubcategories(selectedIds);
	
		// Fechando o modal depois de aplicar o filtro
		setModalVisible(false);
	};

	HeaderRightElement  = () => {
		return(
			<TouchableOpacity 
				onPress={() => setModalVisible(true)}
				style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
			>
				<Icon
					name="filter"
					type="feather"
					color={'#f7f7f7'}
					size={25}
					containerStyle={{backgroundColor: 'transparent'}}
				/>
			</TouchableOpacity>
		)
	}

	useEffect(() => {
		componentDidMount();
	},[])

    return (
        <View style={styles.container}>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'light-content'}
            />

            <Header
                titulo="Prestadores de Serviços"
                styles={{ backgroundColor: COLORS.primary }}
                titleStyle={{ color: '#f7f7f7' }}
                backButton={true}
                iconColor={'#f7f7f7'}
				rightElement={<HeaderRightElement />}
            />

            <Lista 
				categoria_id={categoria_id} 
				subcategorias_ids={selectedIdsSubcategories}
			/>

			<Modal
				visible={modalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => {
					setModalVisible(false);
				}}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalHeader}>
						<Text style={styles.modalTitle}>Filtrar por Subcategorias</Text>
					</View>
					<ScrollView style={styles.modalContent}>
						{subcategories.map((subcategory) => (
							<CheckBox
								key={subcategory.id}
								title={subcategory.name}
								checked={selectedSubcategories[subcategory.id] || false}
								onPress={() => toggleSelection(subcategory.id)}
							/>
						))}
					</ScrollView>
					<View style={styles.modalFooter}>
						<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
							<Text style={styles.closeButtonText}>Cancelar</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.confirmButton} onPress={() => applyFilter()}>
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
