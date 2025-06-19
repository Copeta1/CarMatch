import React from "react";
import { Text, TextInput } from "react-native";

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  placeholder?: string;
  numericOnly?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  placeholder = "",
  numericOnly = false,
}) => {
  const handleChange = (text: string) => {
    const finalValue = numericOnly ? text.replace(/[^0-9]/g, "") : text;
    onChangeText(finalValue);
  };

  return (
    <>
      <Text className="text-lg font-semibold mb-2">{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleChange}
        keyboardType={keyboardType}
        placeholder={placeholder}
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />
    </>
  );
};

export default InputField;
