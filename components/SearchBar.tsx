import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center rounded-lg bg-white px-4">
      <Image
        source={icons.search}
        className="w-7 h-7"
        resizeMode="contain"
        tintColor="#017CFE"
      />
      <TextInput
        className="flex-1 ml-2 h-14"
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
