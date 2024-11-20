import React, { useState } from 'react';
import { 
    Image, 
    SafeAreaView, 
    StyleSheet, 
    View, 
    TextInput, 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Platform 
} from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen(props) {
    const [email, setEmail] = useState(''); // Estado para el correo
    const [password, setPassword] = useState(''); // Estado para la contraseña
    const [showLoginForm, setShowLoginForm] = useState(true);
    const navigation = useNavigation();

    const handleLogin = () => {
        console.log('Iniciando sesión...');
        console.log('Correo:', email);
        console.log('Contraseña:', password);
        setShowLoginForm(true);
        
        // Navegar a la pantalla "Systems" al presionar el botón
         navigation.navigate('Systems');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    
                    

                    {/* Formulario y contenido */}
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        
                        {/* Contenedor del logo */}
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require('../assets/LOGOTIPO-03.png')} />
                        </View>
                    
                        <View style={styles.formContainer}>
                            
                            {/* Campo de correo */}
                            <TextInput
                                style={styles.input}
                                placeholder="Correo electrónico"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email} // Vincula el estado al campo
                                onChangeText={(text) => setEmail(text)} // Actualiza el estado
                            />

                            {/* Campo de contraseña */}
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                secureTextEntry
                                autoCapitalize="none"
                                value={password} // Vincula el estado al campo
                                onChangeText={(text) => setPassword(text)} // Actualiza el estado
                            />
                        </View>
                    

                        {/* Botones */}
                        <View style={styles.actionButtonContainer}>
                            <AppButton text="Iniciar sesión" color="primary" onPress={handleLogin} />
                            <AppButton text="Crear cuenta" color="secondary" onPress={() => navigation.navigate('Register')} />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    actionButtonContainer: {
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    logo: {
        width: 150, 
        height: 200,
        alignSelf: 'center', // Centrado en la pantalla
    },
    logoContainer: {
        alignItems: 'center', 
        paddingBottom: 20
    },
    contentContainer: {
        flexGrow: 1, // Hace que el contenido crezca
        justifyContent: 'center', // Centra el contenido verticalmente
        paddingVertical: 50,
        paddingHorizontal: 20
    },
    formContainer: {
        width: '100%',
        marginVertical: 10,
    },
    input: {
        backgroundColor: colors.lightGray,
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 20,
    }
});

export default WelcomeScreen;

