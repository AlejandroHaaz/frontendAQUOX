// DataSystem.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import colors from '../config/colors';

const DataSystem = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Información del Sistema</Text>
      <Text style={styles.subtitle}> [ Nombre del sistema ]</Text>

      <View style={styles.graphcontainer}>
        <Text style={styles.info} numberOfLines={4}>
          Aquí se mostrará las gráficas en tiempo real del sistema.
        </Text>
      </View>

      <View style={styles.voltcontainer}>
        <Text style={styles.info} numberOfLines={3}>
          Aquí se mostrará la información de voltajes del sistema.
        </Text>
      </View>

      <View style={styles.dqocontainer}>
        <Text style={styles.info} numberOfLines={3}>
          Aquí se mostrará la información de DQO del sistema.
        </Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: colors.white,
  },
  dqocontainer: {
    backgroundColor: colors.lightGray,
    marginTop: 20,
    padding: 20,
    height: '20%',
    width: '90%', // Ajustar al 90% del ancho de la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Evitar desbordes
  },
  graphcontainer: {
    backgroundColor: colors.lightGray,
    padding: 20,
    height: '40%',
    width: '90%', // Ajustar al 90% del ancho de la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Evitar que el contenido se desborde
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  voltcontainer: {
    backgroundColor: colors.lightGray,
    marginTop: 20,
    padding: 20,
    height: '20%',
    width: '90%', // Ajustar al 90% del ancho de la pantalla
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Evitar desbordes
  },
  info: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DataSystem;
