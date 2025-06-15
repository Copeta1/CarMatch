import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PickerModal from "../../components/PickerModal";
import categoryData from "../../constants/category.json";

const getRegistrationOptions = (): string[] => {
  const now = new Date();
  const result: string[] = [];

  for (let i = 0; i <= 12; i++) {
    const future = new Date(now.getFullYear(), now.getMonth() + i);
    const month = (future.getMonth() + 1).toString().padStart(2, "0");
    const year = future.getFullYear();
    result.push(`${month}/${year}`);
  }

  return result;
};

type CategoryData = {
  paymentOptions: string[];
  importOptions: string[];
  categoryWarranty: string[];
  categoryOwner: string[];
};

const {
  paymentOptions,
  importOptions,
  categoryWarranty,
  categoryOwner,
}: CategoryData = categoryData;

const Add1 = () => {
  const [form, setForm] = useState<{
    title: string;
    description: string;
    price: string;
    kilometers: string;
    chassisNumber: string;
    yearInTraffic: string;
    registrationInHR: string;
    selectedMonth: string;
    owner: string;
    warranty: string;
    importOption: string;
    isGaraged: boolean;
    serviceBook: boolean;
    paymentMethods: string[];
  }>({
    title: "",
    description: "",
    price: "",
    kilometers: "",
    chassisNumber: "",
    yearInTraffic: "",
    registrationInHR: "",
    selectedMonth: "",
    owner: "",
    warranty: "",
    importOption: "",
    isGaraged: false,
    serviceBook: false,
    paymentMethods: [],
  });

  const [modal, setModal] = useState({
    key: "",
    visible: false,
    tempValue: "",
  });

  const toggleCheckbox = (value: string) => {
    setForm((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(value)
        ? prev.paymentMethods.filter((v) => v !== value)
        : [...prev.paymentMethods, value],
    }));
  };

  const confirmModal = () => {
    setForm((prev) => ({ ...prev, [modal.key]: modal.tempValue }));
    setModal({ key: "", visible: false, tempValue: "" });
  };

  const inputField = (
    label: string,
    key: keyof typeof form,
    keyboard: "default" | "numeric" | "email-address" | "phone-pad" = "default",
    placeholder: string = ""
  ) => (
    <>
      <Text className="text-lg font-semibold mb-2">{label}</Text>
      <TextInput
        value={form[key] as string}
        onChangeText={(val) => setForm((f) => ({ ...f, [key]: val }))}
        keyboardType={keyboard}
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
        placeholder={placeholder}
      />
    </>
  );

  type FormType = typeof form;

  type StringFormKey = {
    [K in keyof FormType]: FormType[K] extends string ? K : never;
  }[keyof FormType];

  const pickerField = (
    label: string,
    key: StringFormKey,
    options: string[]
  ) => (
    <>
      <Text className="text-lg font-semibold mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() =>
          setModal({
            key,
            visible: true,
            tempValue: form[key] || "",
          })
        }
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">
          {form[key] || `Select ${label.toLowerCase()}...`}
        </Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
    </>
  );

  const registrationMonths = getRegistrationOptions();

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

      {inputField("Title", "title")}
      {inputField("Description", "description")}

      <Text className="text-lg font-semibold mb-4">Payment options</Text>
      {paymentOptions.map((opt) => (
        <View key={opt} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={form.paymentMethods.includes(opt)}
            onValueChange={() => toggleCheckbox(opt)}
          />
          <Text className="ml-2 text-base">{opt}</Text>
        </View>
      ))}

      {inputField("Price (€)", "price", "numeric", "e.g. 10000")}

      <Text className="text-lg font-semibold mb-2">Import price</Text>
      {importOptions.map((opt) => (
        <TouchableOpacity
          key={opt}
          className="flex-row items-center mb-4 ml-2"
          onPress={() => setForm((f) => ({ ...f, importOption: opt }))}
        >
          <Checkbox
            value={form.importOption === opt}
            onValueChange={() => setForm((f) => ({ ...f, importOption: opt }))}
          />
          <Text className="ml-2 text-base">{opt}</Text>
        </TouchableOpacity>
      ))}

      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Vehicle condition
      </Text>
      <View className="flex-row items-center mb-4">
        <Switch
          value={form.isGaraged}
          onValueChange={(v) => setForm((f) => ({ ...f, isGaraged: v }))}
        />
        <Text className="text-lg pl-4">Garaged</Text>
      </View>

      {inputField("Kilometers", "kilometers", "numeric", "e.g. 150000")}
      {pickerField("Registration Until", "selectedMonth", registrationMonths)}
      {pickerField("Owner", "owner", categoryOwner)}
      {inputField("Year in Traffic", "yearInTraffic", "numeric", "e.g. 2015")}
      {inputField(
        "Registration in HR",
        "registrationInHR",
        "numeric",
        "e.g. 2015"
      )}

      <View className="flex-row items-center mb-4">
        <Switch
          value={form.serviceBook}
          onValueChange={(v) => setForm((f) => ({ ...f, serviceBook: v }))}
        />
        <Text className="text-lg pl-4">Service Book</Text>
      </View>

      {inputField(
        "Chassis Number",
        "chassisNumber",
        "default",
        "e.g. ABC123456789"
      )}
      {pickerField("Warranty", "warranty", categoryWarranty)}

      <TouchableOpacity
        className="bg-blue-500 w-full px-6 py-3 rounded-full items-center mt-6 mb-32"
        onPress={() => {
          alert("Form submitted!");
          router.push("/add2");
        }}
      >
        <Text className="text-white font-semibold text-xl">Continue</Text>
      </TouchableOpacity>

      <PickerModal
        visible={modal.visible}
        onClose={() => setModal((m) => ({ ...m, visible: false }))}
        title={modal.key}
        selectedValue={modal.tempValue}
        setTempValue={(val) => setModal((m) => ({ ...m, tempValue: val }))}
        options={
          modal.key === "selectedMonth"
            ? registrationMonths
            : modal.key === "owner"
            ? categoryOwner
            : modal.key === "warranty"
            ? categoryWarranty
            : []
        }
        onConfirm={confirmModal}
      />
    </ScrollView>
  );
};

export default Add1;
