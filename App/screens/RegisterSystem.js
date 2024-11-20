import React, { useState} from 'react';
import { StyleSheet, View, TextInput, Button, Text, SafeAreaView, Platform, StatusBar  } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

import colors from '../config/colors';
import AppButton from '../components/AppButton';

function RegisterSystem() {
  const [titulo, setTitulo] = useState('');
  const [codigo_sistema, setCodigo_sistema] = useState('');
  const [csv_link, setCsv_link] = useState('');

  const navigation = useNavigation();


  const handleRegister = () => {
    console.log('Nombre del sistema:', titulo);
    console.log('Código del sistema:', codigo_sistema);
    console.log('Enlace del sistema:', csv_link);

    navigation.navigate('Sistema');
  };

  return (
    <SafeAreaView style={styles.container}>
       
       {/* Configuración para el StatusBar en Android */}
       {Platform.OS === 'android' && (
         <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        )}

        {/* Banner*/}
        <View style={styles.banner}>
            <Text style={styles.bannerText}>Sistemas AQUOX</Text>
        </View>
        
        
        <View style={styles.formContainer}>
            <Text style={styles.formText}> Nombre del Sistema </Text>
                <TextInput
                    style={styles.input}
                    placeholder=''
                    value={titulo}
                    onChangeText={setTitulo}
                    autoCapitalize="none"
            />
            <Text style={styles.formText}> Código del Sistema </Text>
                <TextInput
                    style={styles.input}
                    placeholder=''
                    value={codigo_sistema}
                    onChangeText={setCodigo_sistema}
                    autoCapitalize="none"
            />
            <Text style={styles.formText}> Enlace CSV </Text>
                <TextInput
                    style={styles.input}
                    placeholder=''
                    value={csv_link}
                    onChangeText={setCsv_link}
                    autoCapitalize="none"
            />
        </View>
        <View style={styles.buttonContainer}>
            <AppButton text="Crear espacio" color="secondary" onPress={handleRegister}/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    banner: {
        flexDirection: 'row',   // Alinea el logo y el texto en fila
        alignItems: 'center',   // Centra verticalmente el contenido
        justifyContent: 'center',
        backgroundColor: colors.primary,  // Color de fondo del banner
        //paddingHorizontal: 20,
        paddingVertical: 15,         // Espacio superior para asegurar que no quede pegado al borde
    },
    bannerText: {
        fontSize: 25, // Tamaño de fuente
        //justifyContent: 'center',
        color: colors.white,  // Color del texto
        fontWeight: 'bold',  // Negrita
    },
    buttonContainer: {
        width: '100%',
        padding: 20
    },
    container: {
        flex: 1,
        //padding: 20,
        backgroundColor: colors.white,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    formText: {
        marginVertical: 10,
        fontSize: 20,
        color: colors.black,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: colors.lightGray,
        borderRadius: 10,
        padding: 15,
        //marginBottom: 20,
        fontSize: 20,
    },  
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    }
});

export default RegisterSystem;
