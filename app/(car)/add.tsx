import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { PickerField } from "../../components/formFields";

import InputField from "../../components/InputField";
import PickerModal from "../../components/PickerModal";
import categoryData from "../../constants/category.json";

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
    if (modal.key === "category") setForm((f) => ({ ...f, subcategory: "" }));
  };

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Basic Information
      </Text>

      <PickerField
        label="Vehicle Category"
        value={form.category}
        onPress={() => openModal("category")}
      />

      {subCategoryOptions[form.category] && (
        <PickerField
          label="Subcategory"
          value={form.subcategory}
          onPress={() => openModal("subcategory")}
        />
      )}

      <InputField
        label="Model Year"
        value={form.modelYear}
        onChangeText={(val) =>
          setForm({ ...form, modelYear: val.replace(/[^0-9]/g, "") })
        }
        keyboardType="numeric"
        placeholder="Enter the model year"
      />
      <InputField
        label="Year of Manufacture"
        value={form.productionYear}
        onChangeText={(val) =>
          setForm({ ...form, productionYear: val.replace(/[^0-9]/g, "") })
        }
        keyboardType="numeric"
        placeholder="years"
      />

      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Technical Characteristics
      </Text>

      <PickerField
        label="Engine Type"
        value={form.engineType}
        onPress={() => openModal("engineType")}
      />
      <InputField
        label="Engine Power kW"
        value={form.enginePower}
        onChangeText={(val) =>
          setForm({ ...form, enginePower: val.replace(/[^0-9]/g, "") })
        }
        keyboardType="numeric"
        placeholder="Enter the engine power"
      />
      <InputField
        label="Swept Volume (cc)"
        value={form.sweptVolume}
        onChangeText={(val) =>
          setForm({ ...form, sweptVolume: val.replace(/[^0-9]/g, "") })
        }
        keyboardType="numeric"
        placeholder="Enter the swept volume"
      />
      <PickerField
        label="Drive Type"
        value={form.driveType}
        onPress={() => openModal("driveType")}
      />
      <PickerField
        label="Transmission Type"
        value={form.transmissionType}
        onPress={() => openModal("transmissionType")}
      />

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
