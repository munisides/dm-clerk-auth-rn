import { Tabs } from "expo-router";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { usePathname } from "expo-router";

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

const TabsPage: React.FC = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: () => (
            <Ionicons
              name="home-outline"
              size={24}
              color={pathname === "/home" ? "#6c47ff" : "gray"}
            />
          ),
          tabBarLabel: "Home",
          tabBarLabelPosition: "below-icon",
          tabBarLabelStyle: {
            color: pathname === "/home" ? "#6c47ff" : "gray",
            fontWeight: "bold",
            fontSize: 12,
            marginBottom: 4
          },
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          headerTitle: "Tasks",
          tabBarIcon: () => (
            <FontAwesome5
              name="tasks"
              size={24}
              color={pathname === "/tasks" ? "#6c47ff" : "gray"}
            />
          ),
          tabBarLabel: "Tasks",
          tabBarLabelPosition: "below-icon",
          tabBarLabelStyle: {
            color: pathname === "/tasks" ? "#6c47ff" : "gray",
            fontWeight: "bold",
            fontSize: 12,
            marginBottom: 4
          },
          headerRight: () => <LogoutButton />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
};

export default TabsPage;
