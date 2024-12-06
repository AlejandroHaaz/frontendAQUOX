import React, { useState, useContext } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    TextInput, 
    Alert, 
    Switch, 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ActivityIndicator 
} from 'react-native';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext'; // Importamos el AuthContext

function RegisterScreen() {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

    const { register, loading } = useContext(AuthContext); // Usamos el contexto para manejar el registro y el estado de carga

    const handleRegister = async () => {
        if (!isPrivacyChecked) {
            Alert.alert('Debe aceptar la política de privacidad para continuar.');
            return;
        }

        if (!username || !email || !password) {
            Alert.alert('Todos los campos son obligatorios.');
            return;
        }

        const success = await register(username, email, password);
        if (success) {
            Alert.alert(
                'Registro exitoso',
                'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
                [{ text: 'OK', onPress: () => navigation.navigate('Welcome') }]
            );
        } else {
            Alert.alert('Error', 'Hubo un problema al registrar. Por favor, inténtalo de nuevo.');
        }
    };

    // Mostrar una pantalla de carga mientras el estado `loading` está activo
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Registrando usuario...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <SafeAreaView>
                        <View style={styles.buttonContainer}>
                            <AppButton
                                text={'Atrás'}
                                color="secondary"
                                onPress={() => navigation.goBack()}
                                icon="caretleft"
                                iconColor="white"
                            />
                        </View>
                        <Text style={styles.text}>¡Bienvenido/a a AQUOX!</Text>
                        <Text style={styles.subtext}>Ingresa tus datos</Text>

                        <View style={styles.formContainer}>
                            <Text style={styles.formText}> Nombre de Usuario </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Alejandro Haaz"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                            
                            <Text style={styles.formText}> Correo Electrónico </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. alejandro22@gmail.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            
                            <Text style={styles.formText}> Contraseña </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="*******"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            
                            <View style={styles.switchContainer}>
                                <Switch
                                    value={isPrivacyChecked}
                                    onValueChange={setIsPrivacyChecked}
                                    style={styles.switch}
                                />
                                <Text style={styles.switchLabel}>
                                    Acepto la <Text style={styles.linkText}>política de privacidad</Text>                        
                                </Text>
                            </View>

                            <AppButton
                                text="Continuar"
                                color="primary"
                                onPress={handleRegister}
                                disabled={loading} // Desactiva el botón mientras se registra
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        backgroundColor: colors.white,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        paddingLeft: 20,
        width: '35%',
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
        marginBottom: 20,
        fontSize: 20,
    },
    linkText: {
        color: colors.primary,
        textDecorationLine: 'underline',
    },
    subtext: {
        fontSize: 35,
        color: colors.secondary,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    switch: {
        marginRight: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
    },
    text: {
        marginTop: 10,
        fontSize: 50,
        color: colors.primary,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: colors.primary,
    },
});

export default RegisterScreen;
