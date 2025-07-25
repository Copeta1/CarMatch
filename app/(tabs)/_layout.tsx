import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, Image, View } from "react-native";
import FloatingButton from "../../components/FloatingButton";
import { icons } from "../../constants/icons";
import { useAuth } from "../contexts/AuthContext";

function TabIcon({ focused, icon }: { focused: boolean; icon: any }) {
  return (
    <View className="relative items-center justify-center">
      {focused && (
        <View className="absolute -top-7 w-5 h-5 rounded-full bg-blue-500" />
      )}
      <Image
        source={icon}
        className="size-6"
        style={{ tintColor: focused ? "" : "#A8B5DB" }}
      />
    </View>
  );
}

export default function TabsLayout() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarShowLabel: true,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            top: 10,
          },
          tabBarStyle: {
            position: "absolute",
            borderRadius: 50,
            overflow: "hidden",
            marginHorizontal: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} />
            ),
          }}
        />

        <Tabs.Screen
          name="favorite"
          options={{
            title: "Favorite",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.favorite} />
            ),
          }}
        />
        <Tabs.Screen
          name="spacer"
          options={{
            tabBarButton: () => <View className="w-16" />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.chat} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.profile} />
            ),
          }}
        />
      </Tabs>
      <FloatingButton />
    </View>
  );
}
