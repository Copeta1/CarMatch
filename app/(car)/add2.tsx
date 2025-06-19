import React from "react";
import { ScrollView, Text } from "react-native";
import categoryData from "../../constants/category.json";

const SeatsOptions = [
  ...Array.from({ length: 8 }, (_, i) => (i + 1).toString()),
  "9 or more",
];

const DoorsOptions = [
  ...Array.from({ length: 5 }, (_, i) => (i + 2).toString()),
];

const WidthTireSizeOptions = [
  ...Array.from({ length: (335 - 125) / 10 + 1 }, (_, i) =>
    (125 + i * 10).toString()
  ),
  "The rest",
];

const HightTireSizeOptions = [
  ...Array.from({ length: (90 - 25) / 5 + 1 }, (_, i) =>
    (25 + i * 5).toString()
  ),
  "The rest",
];

type CategoryData = {
  ecologicalOptions: string[];
  AirconditioningOptions: string[];
  BodyshapeOptions: string[];
  additionalequipmentOptions: string[];
  ComfortOptions: string[];
  CarradioOptions: string[];
  SafetyOptions: string[];
  AirbagsOptions: string[];
  AntitheftOptions: string[];
  SuspensionOptions: string[];
  ColorOptions: string[];
  DiameterTireSize: string[];
};

const {
  ecologicalOptions,
  AirconditioningOptions,
  BodyshapeOptions,
  additionalequipmentOptions,
  ComfortOptions,
  CarradioOptions,
  SafetyOptions,
  AirbagsOptions,
  AntitheftOptions,
  SuspensionOptions,
  ColorOptions,
  DiameterTireSize,
}: CategoryData = categoryData;

const Add2 = () => {
  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Additional data
      </Text>
    </ScrollView>
  );
};

export default Add2;
