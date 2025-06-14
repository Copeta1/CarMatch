import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

import PickerModal from "../../components/PickerModal";
import categoryData from "../../constants/category.json";

//Data

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 70 }, (_, i) =>
  (currentYear - i).toString()
);

type CategoryData = {
  categoryOptions: string[];
  subCategoryOptions: { [key: string]: string[] };
  categoryEngineOptions: string[];
  categoryDriveOptions: string[];
  categoryTransmissionOptions: string[];
};

const {
  categoryOptions,
  subCategoryOptions,
  categoryEngineOptions,
  categoryDriveOptions,
  categoryTransmissionOptions,
}: CategoryData = categoryData;

const Add = () => {
  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    modelYear: "",
    productionYear: "",
    engineType: "",
    driveType: "",
    transmissionType: "",
    enginePower: "",
    sweptVolume: "",
  });

  const [modal, setModal] = useState({
    key: "",
    visible: false,
    tempValue: "",
  });

  const openModal = (key: keyof typeof form) => {
    setModal({
      key,
      visible: true,
      tempValue: form[key] || "",
    });
  };

  const confirmModal = () => {
    setForm({ ...form, [modal.key]: modal.tempValue });
    setModal({ ...modal, visible: false });
    if (modal.key === "category") setForm((f) => ({ ...f, setcategory: "" }));
  };

  const inputField = (
    label: string,
    key: keyof typeof form,
    placeholder = ""
  ) => (
    <>
      <Text className="text-lg font-semibold mb-2">{label}</Text>
      <TextInput
        value={form[key]}
        onChangeText={(val) =>
          setForm({ ...form, [key]: val.replace(/[^0-9]/g, "") })
        }
        keyboardType="numeric"
        maxLength={4}
        placeholder={placeholder}
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />
    </>
  );

  const pickerField = (
    label: string,
    key: keyof typeof form,
    options: string[]
  ) => (
    <>
      <Text className="text-lg font-semibold mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() => openModal(key)}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">
          {form[key] || `Select ${label.toLocaleLowerCase()}...`}
        </Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Basic Information
      </Text>

      {pickerField("Vehicle Category", "category", categoryOptions)}

      {subCategoryOptions[form.category] &&
        pickerField(
          "Subcategory",
          "subcategory",
          subCategoryOptions[form.category]
        )}

      {inputField("Model Year", "modelYear", "Enter the model year")}
      {inputField("Year of Manufacture", "productionYear", "years")}

      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Technical Characteristics
      </Text>

      {pickerField("Engine Type", "engineType", categoryEngineOptions)}
      {inputField("Engine Power kW", "enginePower", "Enter the engine power")}
      {inputField("Swept Volume (cc)", "sweptVolume", "Enter the swept volume")}
      {pickerField("Drive Type", "driveType", categoryDriveOptions)}
      {pickerField(
        "Transmission Type",
        "transmissionType",
        categoryTransmissionOptions
      )}

      <TouchableOpacity
        className="bg-blue-500 w-full px-6 py-3 rounded-full items-center mt-8 mb-24"
        onPress={() => {
          alert("Form submitted!");
          router.push("/add1");
        }}
      >
        <Text className="text-white font-semibold text-xl">Continue</Text>
      </TouchableOpacity>

      <PickerModal
        visible={modal.visible}
        onClose={() => setModal({ ...modal, visible: false })}
        title={modal.key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase())}
        selectedValue={modal.tempValue}
        setTempValue={(val) => setModal((m) => ({ ...m, tempValue: val }))}
        options={
          modal.key === "category"
            ? categoryOptions
            : modal.key === "subcategory"
            ? subCategoryOptions[form.category] || []
            : modal.key === "engineType"
            ? categoryEngineOptions
            : modal.key === "driveType"
            ? categoryDriveOptions
            : modal.key === "transmissionType"
            ? categoryTransmissionOptions
            : modal.key === "productionYear"
            ? years
            : []
        }
        onConfirm={confirmModal}
      />
    </ScrollView>
  );
};

export default Add;
