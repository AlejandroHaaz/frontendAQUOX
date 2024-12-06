import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Text, SafeAreaView, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import { AuthContext } from '../context/AuthContext';

function RegisterSystem() {
  const [titulo, setTitulo] = useState('');
  const [codigo_sistema, setCodigo_sistema] = useState('');
  const [csv_link, setCsv_link] = useState('');
  const { createSystem, loading } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!titulo || !codigo_sistema || !csv_link) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
  
    const success = await createSystem(titulo, codigo_sistema, csv_link);
    if (success) {
      Alert.alert('Éxito', 'Sistema registrado correctamente.');
      setTitulo(''); // Vacía el campo de título
      setCodigo_sistema(''); // Vacía el campo de código del sistema
      setCsv_link(''); // Vacía el campo de enlace CSV
      navigation.goBack(); // Regresa a la pantalla anterior
    } else {
      Alert.alert('Error', 'No se pudo registrar el sistema.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Configuración para el StatusBar en Android */}
      {Platform.OS === 'android' && (
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      )}

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Sistemas AQUOX</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formText}>Nombre del Sistema</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={titulo}
          onChangeText={setTitulo}
          autoCapitalize="none"
        />
        <Text style={styles.formText}>Código del Sistema</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={codigo_sistema}
          onChangeText={setCodigo_sistema}
          autoCapitalize="none"
        />
        <Text style={styles.formText}>Enlace CSV</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={csv_link}
          onChangeText={setCsv_link}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <AppButton text="Crear espacio" color="secondary" onPress={handleRegister} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 15,
  },
  bannerText: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    padding: 20,
  },
  container: {
    flex: 1,
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
    fontSize: 20,
    marginBottom: 20,
  },
});

export default RegisterSystem;
