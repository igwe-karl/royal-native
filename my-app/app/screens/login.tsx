import { IconSymbol } from '@/components/ui/icon-symbol';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={loginStyles.container}>
            <IconSymbol size={100} name="crown.fill" color="black" />
            <input type="text" placeholder="email" />
            <input type="text" placeholder="password" />
            <Text style={loginStyles.title}>Log IN</Text>
            <Button title="Register" onPress={() => { }} />
        </View>
    );
}

    const loginStyles = StyleSheet.create({
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