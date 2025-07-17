import { Checkbox } from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PickerField } from "../../components/formFields";
import { validateForm, ValidationRule } from "../../components/formValidation";
import InputField from "../../components/InputField";
import PickerModal from "../../components/PickerModal";
import categoryData from "../../constants/category.json";
import { useFormStore } from "../../store/formStore";

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

  const [images, setImages] = useState<string[]>([]);

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

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

  const openModal = (key: keyof typeof form) => {
    const value = form[key];
    setModal({
      key,
      visible: true,
      tempValue: typeof value === "string" ? value : "",
    });
  };

  const registrationMonths = getRegistrationOptions();

  const pickImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 20 - images.length,
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...newImages].slice(0, 20));
    }
  };

  const removeImage = (uriToRemove: string) => {
    setImages((prevImages) => prevImages.filter((uri) => uri !== uriToRemove));
  };

  const validationRules: ValidationRule<typeof form>[] = [
    {
      field: "title",
      validate: (val) => val.trim().length > 0,
      message: "Title is required.",
    },
    {
      field: "description",
      validate: (val) => val.trim().length > 0,
      message: "Description is required.",
    },
    {
      field: "paymentMethods",
      validate: (val) => val.length > 0,
      message: "At least one payment method is required.",
    },
    {
      field: "price",
      validate: (val) => /^\d+$/.test(val),
      message: "Valid price is required.",
    },
    {
      field: "kilometers",
      validate: (val) => /^\d+$/.test(val),
      message: "Valid kilometers value is required.",
    },
  ];

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
      <TouchableOpacity
        className="bg-gray-200 rounded-lg h-48 p-4 mb-6 justify-center"
        onPress={pickImages}
      >
        <Text className="text-gray-500 text-center text-base">
          {images.length === 0
            ? "Tap to add images"
            : `${images.length} image(s) selected. Tap to add more.`}
        </Text>
      </TouchableOpacity>
      <View className="flex-row flex-wrap mb-6 gap-2 justify-center">
        {images.map((uri, index) => (
          <View
            key={index}
            className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100"
          >
            <Image
              source={{ uri }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => removeImage(uri)}
              className="absolute top-1 right-1 bg-black/50 rounded-full p-1"
            >
              <Text className="text-white text-xs">✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        General information
      </Text>

      <InputField
        label="Title *"
        value={form.title}
        onChangeText={(val) => setForm((f) => ({ ...f, title: val }))}
        keyboardType="default"
        placeholder="Enter Title"
      />
      {errors.title && (
        <Text className="text-red-600 text-sm mb-2">{errors.title}</Text>
      )}

      <InputField
        label="Description *"
        value={form.description}
        onChangeText={(val) => setForm((f) => ({ ...f, description: val }))}
        keyboardType="default"
        placeholder="Enter description"
      />
      {errors.description && (
        <Text className="text-red-600 text-sm mb-2">{errors.description}</Text>
      )}

      <Text className="text-lg font-semibold mb-4">Payment options *</Text>
      {paymentOptions.map((opt) => (
        <View key={opt} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={form.paymentMethods.includes(opt)}
            onValueChange={() => toggleCheckbox(opt)}
          />
          <Text className="ml-2 text-base">{opt}</Text>
        </View>
      ))}
      {errors.paymentMethods && (
        <Text className="text-red-600 text-sm mb-2 ml-2">
          {errors.paymentMethods}
        </Text>
      )}

      <InputField
        label="Price (€) *"
        value={form.price}
        onChangeText={(val) => setForm((f) => ({ ...f, price: val }))}
        keyboardType="numeric"
        placeholder="e.g. 10000"
      />
      {errors.price && (
        <Text className="text-red-600 text-sm mb-2">{errors.price}</Text>
      )}

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

      <InputField
        label="Kilometers *"
        value={form.kilometers}
        onChangeText={(val) => setForm((f) => ({ ...f, kilometers: val }))}
        keyboardType="numeric"
        placeholder="200000"
      />
      {errors.kilometers && (
        <Text className="text-red-600 text-sm mb-2">{errors.kilometers}</Text>
      )}

      <PickerField
        label="Registration Until"
        value={form.selectedMonth}
        onPress={() => openModal("selectedMonth")}
      />
      <PickerField
        label="Owner"
        value={form.owner}
        onPress={() => openModal("owner")}
      />
      <InputField
        label="Year in Traffic"
        value={form.yearInTraffic}
        onChangeText={(val) => setForm((f) => ({ ...f, yearInTraffic: val }))}
        keyboardType="numeric"
        placeholder="e.g. 2015"
      />
      <InputField
        label="Registration in HR"
        value={form.registrationInHR}
        onChangeText={(val) =>
          setForm((f) => ({ ...f, registrationInHR: val }))
        }
        keyboardType="numeric"
        placeholder="e.g. 2015"
      />

      <View className="flex-row items-center mb-4">
        <Switch
          value={form.serviceBook}
          onValueChange={(v) => setForm((f) => ({ ...f, serviceBook: v }))}
        />
        <Text className="text-lg pl-4">Service Book</Text>
      </View>

      <InputField
        label="Chassis Number"
        value={form.chassisNumber}
        onChangeText={(val) => setForm((f) => ({ ...f, chassisNumber: val }))}
        keyboardType="default"
        placeholder="e.g. ABC123456789"
      />

      <PickerField
        label="Warranty"
        value={form.warranty}
        onPress={() => openModal("warranty")}
      />

      <TouchableOpacity
        className="bg-blue-500 w-full px-6 py-3 rounded-full items-center mt-6 mb-32"
        onPress={() => {
          const { valid, errors: validationErrors } = validateForm(
            form,
            validationRules
          );
          if (!valid) {
            setErrors(validationErrors);
            return;
          }

          const store = useFormStore.getState();
          store.setStep2(form);
          store.setImages(images);
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
