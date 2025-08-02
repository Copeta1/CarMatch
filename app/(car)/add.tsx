import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { PickerField } from "../../components/formFields";
import { validateForm, ValidationRule } from "../../components/formValidation";
import { useFormStore } from "../../store/formStore";

import InputField from "../../components/InputField";
import PickerModal from "../../components/PickerModal";
import categoryData from "../../constants/category.json";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 70 }, (_, i) =>
  (currentYear - i).toString()
);

type FormData = {
  category: string;
  subcategory: string;
  carBrand: string;
  carModel: string;
  modelYear: string;
  productionYear: string;
  engineType: string;
  driveType: string;
  transmissionType: string;
  enginePower: string;
  sweptVolume: string;
};

type CategoryData = {
  categoryOptions: string[];
  subCategoryOptions: { [key: string]: string[] };
  carBrandOptions: { [brand: string]: string[] };
  categoryEngineOptions: string[];
  categoryDriveOptions: string[];
  categoryTransmissionOptions: string[];
};

const {
  categoryOptions,
  subCategoryOptions,
  carBrandOptions,
  categoryEngineOptions,
  categoryDriveOptions,
  categoryTransmissionOptions,
}: CategoryData = categoryData;

const Add = () => {
  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    carBrand: "",
    carModel: "",
    modelYear: "",
    productionYear: "",
    engineType: "",
    driveType: "",
    transmissionType: "",
    enginePower: "",
    sweptVolume: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

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

  const validationRules: ValidationRule<FormData>[] = [
    {
      field: "category",
      validate: (val: string) => val.trim().length > 0,
      message: "Vehicle Category is required.",
    },
    {
      field: "subcategory",
      validate: (val: string, form: FormData) =>
        !subCategoryOptions[form.category] || val.trim().length > 0,
      message: "Subcategory is required.",
    },
    {
      field: "carBrand",
      validate: (val: string) => val.trim().length > 0,
      message: "Car brand is required.",
    },
    {
      field: "carModel",
      validate: (val: string) => val.trim().length > 0,
      message: "Car model is required.",
    },
    {
      field: "engineType",
      validate: (val: string) => val.trim().length > 0,
      message: "Engine Type is required.",
    },
    {
      field: "sweptVolume",
      validate: (val: string) => val.trim().length > 0,
      message: "Swept Volume (cc) is required.",
    },
    {
      field: "transmissionType",
      validate: (val: string) => val.trim().length > 0,
      message: "Transmission Type is required.",
    },
  ];

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Basic Information
      </Text>

      <PickerField
        label="Vehicle Category *"
        value={form.category}
        onPress={() => openModal("category")}
      />
      {errors.category && (
        <Text className="text-red-600 text-sm">{errors.category}</Text>
      )}

      {subCategoryOptions[form.category] && (
        <PickerField
          label="Subcategory *"
          value={form.subcategory}
          onPress={() => openModal("subcategory")}
        />
      )}
      {errors.category && (
        <Text className="text-red-600 text-sm">{errors.subcategory}</Text>
      )}

      <PickerField
        label="Car brand *"
        value={form.carBrand}
        onPress={() => openModal("carBrand")}
      />
      {errors.category && (
        <Text className="text-red-600 text-sm">{errors.carBrand}</Text>
      )}

      {form.carBrand && carBrandOptions[form.carBrand] && (
        <PickerField
          label="Model *"
          value={form.carModel}
          onPress={() => openModal("carModel")}
        />
      )}
      {errors.category && (
        <Text className="text-red-600 text-sm">{errors.carModel}</Text>
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
        label="Engine Type *"
        value={form.engineType}
        onPress={() => openModal("engineType")}
      />
      {errors.category && (
        <Text className="text-red-600 text-sm mb-4">{errors.engineType}</Text>
      )}

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
        label="Swept Volume (cc) *"
        value={form.sweptVolume}
        onChangeText={(val) =>
          setForm({ ...form, sweptVolume: val.replace(/[^0-9]/g, "") })
        }
        keyboardType="numeric"
        placeholder="Enter the swept volume"
      />
      {errors.category && (
        <Text className="text-red-600 text-sm mb-4">{errors.sweptVolume}</Text>
      )}
      <PickerField
        label="Drive Type"
        value={form.driveType}
        onPress={() => openModal("driveType")}
      />
      <PickerField
        label="Transmission Type *"
        value={form.transmissionType}
        onPress={() => openModal("transmissionType")}
      />
      {errors.category && (
        <Text className="text-red-600 text-sm mb-4">
          {errors.transmissionType}
        </Text>
      )}

      <TouchableOpacity
        className="bg-blue-500 w-full px-6 py-3 rounded-full items-center mt-8 mb-24"
        onPress={() => {
          const { valid, errors: validationErrors } = validateForm(
            form,
            validationRules
          );

          if (!valid) {
            setErrors(validationErrors);
            return;
          }

          useFormStore.getState().setStep1(form);
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
            : modal.key === "carBrand"
            ? Object.keys(carBrandOptions)
            : modal.key === "carModel"
            ? carBrandOptions[form.carBrand] || []
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
