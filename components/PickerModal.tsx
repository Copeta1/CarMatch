import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity } from "react-native";

type PickerModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  selectedValue: string;
  setTempValue: (val: string) => void;
  options: string[];
  onConfirm: () => void;
};

const PickerModal = ({
  visible,
  onClose,
  title,
  selectedValue,
  setTempValue,
  options,
  onConfirm,
}: PickerModalProps) => (
  <Modal transparent visible={visible} animationType="slide">
    <Pressable className="flex-1 bg-black/30 justify-end" onPress={onClose}>
      <Pressable className="bg-white rounded-t-2xl p-4">
        <Text className="text-lg font-semibold mb-2">{title}</Text>
        <Picker selectedValue={selectedValue} onValueChange={setTempValue}>
          <Picker.Item label={`Select ${title}`} value="" />
          {options.map((opt) => (
            <Picker.Item key={opt} label={opt} value={opt} />
          ))}
        </Picker>
        <TouchableOpacity
          onPress={onConfirm}
          className="bg-blue-500 rounded-lg px-4 py-3 mt-4"
        >
          <Text className="text-white text-center font-semibold">Confirm</Text>
        </TouchableOpacity>
      </Pressable>
    </Pressable>
  </Modal>
);

export default PickerModal;
