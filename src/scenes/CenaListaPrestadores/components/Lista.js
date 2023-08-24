import React from 'react';
import {
	StyleSheet,
	View,
    FlatList
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyle from '@styles/global';
import { ListItem, Text, Rating  } from 'react-native-elements'
import { CommonActions, useNavigation } from '@react-navigation/native';

function Lista (props) {
	const dispatch = useDispatch();
    const navigation = useNavigation();

    const service_providers = useSelector(state => state.appReducer.service_providers);
    const service_providers_loading = useSelector(state => state.appReducer.service_providers_loading);
    const categoria_id = props.categoria_id;

    const loadItems = () => {
        let filters = {
            categoria_id: categoria_id,
            subcategorias_ids: props.subcategorias_ids.join(',')
        };
    
        dispatch({
			type: 'LOAD_SERVICE_PROVIDERS',
			payload: filters
		})

    }

	React.useEffect(() => {	
		loadItems();

	}, [props.subcategorias_ids]);

    const RenderItem = (props) => {
        const item = props.item;
        const services_arr = item.services.map(service => {
            return service.title
        });
        return (
            <ListItem bottomDivider onPress={()=>{
                
                navigation.dispatch(
                    CommonActions.navigate({
                        name: 'PrestadorDetalhe',
                        params: {
                            item: item
                        }
                    })
                ); 
            }}>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>Serviços Prestados: {services_arr.join(', ')}</ListItem.Subtitle>
                        <ListItem.Subtitle>Subcategorias: {item._subcategories.join(', ')}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Rating
                        type="star"
                        startingValue={item.avg_reviews}
                        imageSize={15}
                        readonly
                    />
                <ListItem.Chevron />
              </ListItem>
            )
    }

	return (
		<View style={styles.container}>

			<View style={GlobalStyle.secureMargin}>
                <FlatList
                    data={service_providers}
                    renderItem={({item}) => <RenderItem item={item} />}
                    keyExtractor={item => item.id}
                    onRefresh={() => {
                        loadItems();
                    }}
                    refreshing={service_providers_loading}
                    ListEmptyComponent={()=>{
                        if ( service_providers_loading ) {
                            return null;
                        }
                        return (<Text style={{textAlign: 'center', marginTop: 50}}>Nenhum prestador encontrado com os filtros selecionados.</Text>)
                    }}
                />
			</View>
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
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
      },
    serviceTitle: {
      },
});

export default Lista;