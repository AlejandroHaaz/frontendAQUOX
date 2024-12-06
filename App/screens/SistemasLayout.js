import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

function SistemasLayout() {
  const { loading, systems, fetchSystems, updateSystem, deleteSystem } = useContext(AuthContext);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCsvLink, setNewCsvLink] = useState('');
  const navigation = useNavigation();

    // Cargar sistemas al montar el componente
    useEffect(() => {
        fetchSystems(); // Llamar a la función fetchSystems desde el contexto
    }, []);

    // Manejar la edición de un sistema
    const handleEditPress = (system) => {
        setSelectedSystem(system);
        setNewTitle(system.titulo);
        setNewCsvLink(system.csv_link);
        setModalVisible(true); // Muestra el modal para editar
    };

    
    // Visualizar datos
    const handleViewPress = (system) => {
        navigation.navigate('Sistema', { systemTitle: system.titulo });
    };
      

    // Guardar cambios del sistema
    const handleSave = async () => {
    if (!newTitle || !newCsvLink) {
      Alert.alert('Error', 'Ambos campos son obligatorios.');
      return;
    }
        const success = await updateSystem(selectedSystem.codigo_sistema, newTitle, newCsvLink);
            if (success) {
            Alert.alert('Éxito', 'Sistema actualizado correctamente.');
            fetchSystems(); // Refresca la lista de sistemas
            setModalVisible(false); // Cierra el modal
            } else {
            Alert.alert('Error', 'No se pudo actualizar el sistema.');
            }
    };

    // Manejar la eliminación de un sistema
    const handleDeletePress = (codigo_sistema) => {
        Alert.alert(
          'Eliminar Sistema',
          '¿Estás seguro de que deseas eliminar este sistema?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Eliminar',
              onPress: async () => {
                const success = await deleteSystem(codigo_sistema);
                if (success) {
                  Alert.alert('Éxito', 'Sistema eliminado correctamente.');
                } else {
                  Alert.alert('Error', 'No se pudo eliminar el sistema.');
                }
              },
              style: 'destructive',
            },
          ]
        );
      };
       

    // Renderizar cada tarjeta de sistema
    const renderSystemCard = ({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => handleViewPress(item)}>
                <Ionicons name="eye" size={20} color={colors.info} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEditPress(item)}>
                <Ionicons name="pencil" size={20} color={colors.primary} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(item.codigo_sistema)}>
                <Ionicons name="trash" size={20} color={colors.danger} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.cardDetail}>Código: {item.codigo_sistema}</Text>
          <Text style={styles.cardDetail}>CSV Link: {item.csv_link}</Text>
        </View>
      );   

  return (
    <SafeAreaView style={styles.container}>
      {/* Configuración del banner en Android */}
      {Platform.OS === 'android' && (
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      )}

      {/* Banner principal */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          AQUOX <Text style={styles.subText}>Monitoreo de sistemas</Text>
        </Text>
      </View>

      {/* Texto de bienvenida */}
      <Text style={styles.title}>¡Bienvenido/a a la aplicación de AQUOX</Text>
      <Text style={styles.paragraph}>
        Aquí podrás gestionar y monitorear de manera sencilla y eficiente tus sistemas, obteniendo
        información valiosa sobre el tratamiento de aguas residuales y la generación de energía
        sostenible.
      </Text>

      {/* Botón para añadir un sistema */}
      <View style={styles.ButtonContainer}>
        <AppButton text="Añadir espacio" color="primary" onPress={() => navigation.navigate('Registrar Sistema')} />
      </View>

      {/* Indicador de carga */}
      {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />}

      {/* Lista de sistemas */}
      {!loading && systems && systems.length > 0 ? (
        <FlatList
          data={systems}
          keyExtractor={(item) => item.codigo_sistema}
          renderItem={renderSystemCard}
          contentContainerStyle={styles.list}
        />
      ) : (
        !loading && (
          <Text style={styles.noSystemsText}>No hay sistemas registrados. Añade uno para comenzar.</Text>
        )
      )}

      {/* Modal para editar sistema */}
      <Modal visible={modalVisible} animationType="slide" transparent>
  <KeyboardAvoidingView
    style={styles.modalContainer}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Editar Sistema</Text>
      <TextInput
        style={styles.input}
        placeholder="Nuevo título"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Nuevo CSV Link"
        value={newCsvLink}
        onChangeText={setNewCsvLink}
      />
      <View style={styles.modalButtons}>
        <AppButton
          text="Guardar"
          color="primary"
          onPress={handleSave}
          style={{ marginRight: 10 }} // Espaciado entre los botones
        />
        <AppButton
          text="Cancelar"
          color="secondary"
          onPress={() => setModalVisible(false)}
        />
      </View>
    </View>
  </KeyboardAvoidingView>
</Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    width: '100%',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bannerText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },
  subText: {
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
  paragraph: {
    marginTop: 10,
    fontSize: 18,
    color: colors.black,
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  cardDetail: {
    fontSize: 16,
    color: colors.black,
  },
  loader: {
    marginVertical: 20,
  },
  noSystemsText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '50%'
  },
  input: {
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  }
});

export default SistemasLayout;
