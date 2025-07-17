import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const CloseButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="w-8 h-8 rounded-full bg-black justify-center items-center ml-4"
    >
      <AntDesign name="closecircle" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CloseButton;
