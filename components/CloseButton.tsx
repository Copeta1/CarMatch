import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const CloseButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="w-9 h-9 rounded-full justify-center items-center"
    >
      <AntDesign name="close-circle" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CloseButton;
