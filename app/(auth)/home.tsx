import { View, Text, Pressable, Button } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";

const Home: React.FC  = () => {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 16, fontWeight: "bold", fontSize: 20 }}>
        Welcome, {user?.emailAddresses[0].emailAddress}!
      </Text>
      <Link href={"/tasks"} asChild>
        <Button title="Start planning" color={"#6c47ff"} />
      </Link>
    </View>
  );
};

export default Home;
