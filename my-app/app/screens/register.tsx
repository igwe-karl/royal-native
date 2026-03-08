import { IconSymbol } from '@/components/ui/icon-symbol';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function RegisterScreen() {
    return (
        <View style={registerStyles.container}>
            {/* <Image source={require('@/assets/images/logo.png')} style={registerStyles.logo} /> */}
            <IconSymbol size={100} name="crown.fill" color="black" />

            <input type="text" placeholder="first name" />
            <input type="text" placeholder="last name" />
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
            <input type="text" placeholder="confirm password" />
            <Text style={registerStyles.title}>Register</Text>
            <Button title="Register" onPress={() => { }} />
        </View>
    );
}

const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});