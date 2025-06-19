import React from "react";
import { Text, TouchableOpacity } from "react-native";

type PickerFieldProps = {
  label: string;
  value: string;
  onPress: () => void;
};

export const PickerField = ({ label, value, onPress }: PickerFieldProps) => (
  <>
    <Text className="text-lg font-semibold mb-2">{label}</Text>
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
    >
      <Text className="text-gray-800">
        {value || `Select ${label.toLowerCase()}...`}
      </Text>
      <Text className="text-gray-400 text-lg">▼</Text>
    </TouchableOpacity>
  </>
);
