import React, { useState, useContext } from 'react';
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
    Platform, 
    Alert, 
    ActivityIndicator 
} from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

function WelcomeScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { login, loading } = useContext(AuthContext);

    const handleLogin = async () => {
        if (loading) return;

        const success = await login(email, password);
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Systems' }],
            });
        } else {
            Alert.alert('Error', 'Correo o contraseña incorrectos.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require('../assets/LOGOTIPO-03.png')} />
                        </View>
                    
                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Correo electrónico"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                secureTextEntry
                                autoCapitalize="none"
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View style={styles.actionButtonContainer}>
                            <AppButton 
                                text="Iniciar sesión" 
                                color="primary" 
                                onPress={handleLogin} 
                                disabled={loading}
                            />
                            <AppButton 
                                text="Crear cuenta" 
                                color="secondary" 
                                onPress={() => navigation.navigate('Register')} 
                                disabled={loading}
                            />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
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
        alignSelf: 'center',
    },
    logoContainer: {
        alignItems: 'center', 
        paddingBottom: 20,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
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
    },
});

export default WelcomeScreen;


