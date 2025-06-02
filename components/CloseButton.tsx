import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const CloseButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} className="mr-2">
      <Text className="text-2xl font-bold ">X</Text>
    </TouchableOpacity>
  );
};

export default CloseButton;
