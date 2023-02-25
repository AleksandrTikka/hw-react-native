import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 0,
    // marginHorizontal: 0,
  },
});
