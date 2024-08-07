import { Link, Stack } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

const NotFoundScreen: React.FC = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Oops!",
          headerStyle: { backgroundColor: "#6c47ff" },
        }}
      />
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>This screen doesn't exist.</Text>
        {/* @ts-ignore */}
        <Link href="/" style={styles.link}>
          <Text style={{ fontWeight: "bold" }}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default NotFoundScreen;
