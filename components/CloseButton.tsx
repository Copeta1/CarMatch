import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CloseButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className="w-9 h-9 rounded-full bg-blue-100 justify-center items-center ml-4"
    >
      <Text className="text-2xl font-bold">X</Text>
    </TouchableOpacity>
  );
};

export default CloseButton;
