import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { logout } = useAuth();

  const handlelogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: logout,
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View className="flex-1 p-4 justify-center items-center">
      <Text className="text-xl font-bold mb-4">Profile</Text>
      <TouchableOpacity
        onPress={handlelogout}
        className="bg-red-500 py-3 px-6 rounded-lg mt-8"
      >
        <Text className="text-white font-medium">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
