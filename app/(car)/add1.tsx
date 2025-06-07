import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const paymentOptions = [
  "Cash",
  "Credit",
  "Leasing",
  "Takeover of leasing",
  "Installments with bank cards",
  "Trade-in",
  "Old for new",
];

const importOptions = [
  "The price includes all import costs into the Republic of Croatia",
  "The price excludes import costs",
];

const Add1 = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState<string[]>([]);

  const [price, setPrice] = useState("");
  const [importChecked, setImportChecked] = useState("");

  const toggleOption = (option: string) => {
    setIsChecked((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Attach photos
      </Text>

      <Text className="texr-gray-600 text-base mb-4">
        You can attach up to 20 images to your ad. Supported formats are .jpg,
        .gif and .png.
      </Text>
      <Text className="text-gray-600 text-base mb-4">
        The first image will be the main image of your ad.
      </Text>
      <TouchableOpacity className="bg-gray-200 rounded-lg h-48 p-4 mb-6 justify-center">
        <Text className="text-gray-500 text-center text-base">
          Tap to add images
        </Text>
      </TouchableOpacity>

      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        General information
      </Text>

      <Text className="text-lg font-semibold mb-2">Title</Text>
      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
        value={title}
        onChangeText={setTitle}
      />
      <Text className="text-lg font-semibold mb-2">Description</Text>
      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
        value={description}
        onChangeText={setDescription}
      />

      <Text className="text-lg font-semibold mb-4">Payment options</Text>
      {paymentOptions.map((option) => (
        <View key={option} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={isChecked.includes(option)}
            onValueChange={() => toggleOption(option)}
          />
          <Text className="ml-2 text-base">{option}</Text>
        </View>
      ))}

      <Text className="text-lg font-semibold mb-2">Price €</Text>
      <TextInput
        value={price}
        onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter the price"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <Text className="text-lg font-semibold mb-2">Import price</Text>
      {importOptions.map((opt) => (
        <TouchableOpacity
          key={opt}
          className="flex-row items-center mb-2"
          onPress={() => setImportChecked(opt)}
        >
          <Checkbox
            value={importChecked === opt}
            onValueChange={() => setImportChecked(opt)}
            color={importChecked === opt ? "#3b82f6" : undefined}
          />
          <Text className="ml-2 text-base text-gray-700">{opt}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Add1;
