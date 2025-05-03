import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";

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
  return (
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
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.explore} />
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
  );
}
