import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from "@components/Header";
import COLORS from '@constants/colors';

const CenaHomeProvider = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.appReducer.dashboard_data);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        dispatch({
            type: 'LOAD_DASHBOARD_DATA',
            payload: {}
        });
    };

    return (
        <>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'light-content'}
            />

            <Header
                titulo="Indica Todos"
                styles={{ backgroundColor: COLORS.primary }}
                titleStyle={{ color: '#f7f7f7' }}
            />

            <View style={styles.container}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.tile, { backgroundColor: COLORS.primary }]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tileTitle}>Visitas</Text>
                        <Text style={styles.tileCaption}>{data.visits}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tile, { backgroundColor: COLORS.terciary }]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tileTitle}>Visitas Únicas</Text>
                        <Text style={styles.tileCaption}>{data.visits_uniqes}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.tile, { backgroundColor: COLORS.secondary }]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tileTitle}>Cliques no Telefone</Text>
                        <Text style={styles.tileCaption}>{data.phone_clicks}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tile, { backgroundColor: COLORS.quaternary }]}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.tileTitle}>Média de Visitas Semanal</Text>
                        <Text style={styles.tileCaption}>{data.week_avg}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
    },
    tile: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    tileTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    tileCaption: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default CenaHomeProvider;
