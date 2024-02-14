import React from 'react';
import {
	StyleSheet,
	View,
    FlatList,
    Text,
    ImageBackground,
    TouchableWithoutFeedback,
    TextInput 
} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import FilterNeighborhoods from "./FilterNeighborhoods";


function Categories (props) {
	const dispatch = useDispatch();
    const navigation = useNavigation();

    const service_categories = useSelector(state => state.appReducer.service_categories);
    const selecteds_neighborhoods = useSelector(state => state.appReducer.selecteds_neighborhoods);
    const service_categories_loading = useSelector(state => state.appReducer.service_categories_loading);
    const user_location = useSelector(state => state.appReducer.user_location);
    const [searchTerm, setSearchTerm] = React.useState('');

    const setNeighborhoodsSelecteds = (data) => {

        dispatch({
            type: 'TRIGGER_SET_SELECTEDS_NEIGHBORHOODS',
            payload: {
                fields: data
            }
        })

    }

    const filteredCategories = searchTerm
    ? service_categories.filter(category =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) || category._subcategories_string.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : service_categories;

    const buscaItens = () => {

        dispatch({
            type: 'LOAD_SERVICE_CATEGORIES',
            payload: {
                with_business: true,
                user_location: user_location,
                neighborhoods_selecteds: selecteds_neighborhoods
            }
        })

    }

	const componentDidMount = async () => {
        buscaItens();
	}

	React.useEffect(() => {
	
		componentDidMount();
	}, [])

	React.useEffect(() => {	

        setNeighborhoodsSelecteds('');
        
	}, [user_location])

	React.useEffect(() => {	
		buscaItens();
	}, [user_location, selecteds_neighborhoods])

    const renderItem = ({item}) => {
        return (
            <ImageBackground 
                source={{uri: item.image}} 
                style={styles.backgroundImage}
            >
                <TouchableWithoutFeedback onPress={()=>{
                    navigation.dispatch(
                        CommonActions.navigate({
							name: 'ListaPrestadores',
                            params: {
                                categoriaId: item.id
                            },
						})
					);
                }} style={{flex: 1, width: '100%', height: '100%'}}>
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    };

	return (
		<View style={[styles.container]}>

            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar categorias..."
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
            />
            
			<FilterNeighborhoods 
                neighborhoodsSelecteds={selecteds_neighborhoods}
                setNeighborhoodsSelecteds={setNeighborhoodsSelecteds}
            />

            <FlatList
                data={filteredCategories}
                renderItem={renderItem}
                onRefresh={buscaItens}
                keyExtractor={item => item.id}
                refreshing={service_categories_loading}
                ListEmptyComponent={() => (
                    <Text style={{textAlign: 'center', marginTop: 50}}>Nenhum prestador encontrado na sua área.</Text>
                )}
            />
		</View>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	container: {
		flex: 1,
	},
    backgroundImage: {
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
        //overlayColor: "rgba(0, 0, 0, 0.0)"
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    title: {
        textAlign: 'center',
        fontSize: 24,
        width: '100%',
        color: 'white',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        display: 'flex'
    },
    searchInput: {
        height: 40,
        margin: 10,
        borderRadius: 5,
    },
});

export default Categories;