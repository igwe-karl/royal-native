import { Image } from 'expo-image';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/authContext';
import { Ionicons } from '@expo/vector-icons';
import BankCard from '@/components/bankCard';
import { Button } from '@/components/ui/button';

export default function TabTwoScreen() {
  const { user } = useAuth()

  console.log(user, "user")

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView
        // contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}>

        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/300",
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{user?.fname}  {user?.lname}</Text>
            <Text style={styles.wallet_balance}>{user?.wallet_balance}</Text>
          </View>

          <View style={styles.walletContainer}>
            <View style={styles.fund}>
              <Ionicons name="wallet" size={22} color="#7F1945" /><Text style={styles.fundText}>Fund wallet</Text></View>
            <View style={styles.withdraw}>
              <Ionicons name="wallet" size={22} color="white" /><Text style={styles.withdrawText}>
                Withdraw funds
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bankCard}>
          <Text>Bank Account</Text>
          <BankCard
            cardImage={require("../../assets/images/card.png")}
            title="Visa •••• 1234"
            subtitle="Expires 09/28"

          />
          <BankCard
            cardImage={require("../../assets/images/card.png")}
            title="Master •••• 1234"
            subtitle="Expires 09/28"

          />

          <Button><Ionicons name="wallet" size={22} color="#ffff" />
            Add New card</Button>
        </View>

      </ScrollView >
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#7F1945",
    borderBottomLeftRadius: 40,
    borderBottomEndRadius: 40,

  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    padding: 18,
    justifyContent: "space-between"
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  walletContainer: {
    flexDirection: 'row',
    // gap: 8,
    padding: 18,
    justifyContent: "space-between"
  },
  wallet_balance: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  withdraw: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "black",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  withdrawText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  fund: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  fundText: {
    fontSize: 14,
    fontWeight: "600",
    // color: "white",
  },
  bankCard: {
    padding: 18,
    marginVertical: -8,
    marginHorizontal: 10,
    backgroundColor: "#FDF2F8",
    borderRadius: 22,
  },

});
