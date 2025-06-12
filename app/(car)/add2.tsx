import React from "react";
import { ScrollView, Text } from "react-native";

const Add2 = () => {
  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Additional data
      </Text>

      <Text className="text-lg font-semibold mb-2">
        Fuel consumption (l/100km)
      </Text>
    </ScrollView>
  );
};

export default Add2;
