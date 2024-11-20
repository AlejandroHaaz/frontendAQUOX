import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View} from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/AntDesign'; // Importa los íconos


function AppButton({text, color, onPress, icon, iconColor}) {
    return (
        <TouchableHighlight style={[styles.button, {backgroundColor: colors[color] }]}  onPress={onPress}>
                <View style={styles.buttonContent}>
                    {icon && <Icon name={icon} size={20} color={iconColor ? colors[iconColor]: "#fff"} style={styles.icon} />}
                    <Text style={styles.text}>{text}</Text>
                </View>
        </TouchableHighlight> 
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: 10
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text:{
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    icon: {
        marginRight: 0,
    }
})
export default AppButton;