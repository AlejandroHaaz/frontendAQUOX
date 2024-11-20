import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';

function SistemasLayout(props) {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* Configuración para el StatusBar en Android */}
            {Platform.OS === 'android' && (
                <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
            )}

            {/* Banner*/}
            <View style={styles.banner}>
                <Text style={styles.bannerText}>AQUOX <Text style={styles.subText}> Monitoreo de sistemas</Text></Text>
                
            </View>

            <Text style={styles.title}>¡Bienvenido/a a la aplicación de AQUOX</Text>
            <Text style={styles.paragraph}>Aquí podrás gestionar y monitorear de manera sencilla y eficiente tus sistemas, obteniendo información valiosa sobre el tratamiento de aguas residuales y la generación de energía sostenible.</Text>


            {/* Botón para crear un sistema */}
            <View style={styles.ButtonContainer}>
            <AppButton text="Añadir espacio" color="primary" onPress={() => navigation.navigate('Registrar Sistema')}/> 
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ButtonContainer: {
        width: '100%',
        padding: 20
    },
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    banner: {
        flexDirection: 'row',   // Alinea el logo y el texto en fila
        alignItems: 'center',   // Centra verticalmente el contenido
        justifyContent: 'center',
        backgroundColor: colors.primary,  // Color de fondo del banner
        paddingHorizontal: 20,
        paddingVertical: 15,         // Espacio superior para asegurar que no quede pegado al borde
    },
    bannerText: {
        fontSize: 30, // Tamaño de fuente
        //justifyContent: 'center',
        color: colors.white,  // Color del texto
        fontWeight: 'bold',  // Negrita
    },
    subText: {
        alignItems: 'flex-end',
        fontWeight: 'bold',
        color: colors.lightGray,
        fontSize: 15,
    },
    title: {
        marginTop: 10,
        fontSize: 22,
        color: colors.black,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    paragraph:{
        marginTop: 10,
        fontSize: 18,
        color: colors.black,
        paddingHorizontal: 20,
    }
});

export default SistemasLayout;
