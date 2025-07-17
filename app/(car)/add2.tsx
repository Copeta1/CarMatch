import { Checkbox } from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { PickerField } from "../../components/formFields";
import { validateForm, ValidationRule } from "../../components/formValidation";
import InputField from "../../components/InputField";
import PickerModal from "../../components/PickerModal";
import categoryData from "../../constants/category.json";
import { databases, ID, storage } from "../../lib/appwrite";
import { useFormStore } from "../../store/formStore";

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
  AdditionalequipmentOptions: string[];
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
  AdditionalequipmentOptions,
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
  const [form, setForm] = useState<{
    fuelConsumption: string;
    co2Emission: string;
    ecological: string;
    seats: string;
    doors: string;
    airconditioning: string;
    bodyshape: string;
    additionalequipment: string[];
    comfort: string[];
    carradio: string;
    safety: string[];
    airbags: string;
    antitheft: string[];
    suspension: string;
    autogas: boolean;
    color: string;
    metallic: boolean;
    widthTireSize: string;
    hightTireSize: string;
    diameterTireSize: string;
    videoLink: string;
  }>({
    fuelConsumption: "",
    co2Emission: "",
    ecological: "",
    seats: "",
    doors: "",
    airconditioning: "",
    bodyshape: "",
    additionalequipment: [],
    comfort: [],
    carradio: "",
    safety: [],
    airbags: "",
    antitheft: [],
    suspension: "",
    autogas: false,
    color: "",
    metallic: false,
    widthTireSize: "",
    hightTireSize: "",
    diameterTireSize: "",
    videoLink: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});

  const [modal, setModal] = useState({
    key: "",
    visible: false,
    tempValue: "",
  });

  const openModel = (key: keyof typeof form) => {
    const value = form[key];
    setModal({
      key,
      visible: true,
      tempValue: typeof value === "string" ? value : "",
    });
  };

  const confirmModal = () => {
    setForm((prev) => ({ ...prev, [modal.key]: modal.tempValue }));
    setModal({ key: "", visible: false, tempValue: "" });
  };

  const toggleCheckbox = (key: keyof typeof form, value: string) => {
    setForm((prev) => {
      const prevArray = prev[key] as string[];
      return {
        ...prev,
        [key]: prevArray.includes(value)
          ? prevArray.filter((v) => v !== value)
          : [...prevArray, value],
      };
    });
  };

  type FormData = typeof form;
  const validationRules: ValidationRule<FormData>[] = [
    {
      field: "seats",
      validate: (val) => val.trim().length > 0,
      message: "Seats is required.",
    },
    {
      field: "doors",
      validate: (val) => val.trim().length > 0,
      message: "Doors is required.",
    },
    {
      field: "bodyshape",
      validate: (val) => val.trim().length > 0,
      message: "Body shape is required.",
    },
  ];

  const handleSubmit = async () => {
    const { valid, errors: validationErrors } = validateForm(
      form,
      validationRules
    );
    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    const store = useFormStore.getState();
    store.setStep3(form);
    const data = store.getCombinedForm();

    try {
      setLoading(true);

      const doc = await databases.createDocument(
        "68779122001fd7f92f56", // databaseId: car_ads
        "68779345003171b49730", // collectionId: vehicles
        ID.unique(),
        data
      );

      for (const uri of store.images) {
        const fileName = uri.split("/").pop() || `image-${Date.now()}.jpg`;
        const response = await fetch(uri);
        const blob = await response.blob();

        const file = new File([blob], fileName, { type: blob.type });

        await storage.createFile("68790aed002d3a582891", ID.unique(), file);
      }

      alert("Published successfully!");
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Appwrite error:", err);
      alert("There was an error sending. ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Additional data
      </Text>

      <InputField
        label="Fuel consumption (l/100kn)"
        value={form.fuelConsumption}
        onChangeText={(val) => setForm((f) => ({ ...f, fuelConsumption: val }))}
        keyboardType="numeric"
        placeholder="6,5"
      />
      <InputField
        label="Average CO2 emissions (g/km)"
        value={form.co2Emission}
        onChangeText={(val) => setForm((f) => ({ ...f, co2Emission: val }))}
        keyboardType="numeric"
        placeholder="106.4"
      />
      <PickerField
        label="Ecological vehicle category"
        value={form.ecological}
        onPress={() => openModel("ecological")}
      />

      <PickerField
        label="Number of seats *"
        value={form.seats}
        onPress={() => openModel("seats")}
      />
      {errors.seats && (
        <Text className="text-red-500 text-sm mb-4">{errors.seats}</Text>
      )}

      <PickerField
        label="Number of doors *"
        value={form.doors}
        onPress={() => openModel("doors")}
      />
      {errors.doors && (
        <Text className="text-red-500 text-sm mb-4">{errors.doors}</Text>
      )}
      <PickerField
        label="Air conditioning"
        value={form.airconditioning}
        onPress={() => openModel("airconditioning")}
      />

      <PickerField
        label="Body shape *"
        value={form.bodyshape}
        onPress={() => openModel("bodyshape")}
      />
      {errors.bodyshape && (
        <Text className="text-red-500 text-sm mb-4">{errors.bodyshape}</Text>
      )}

      <Text className="text-lg font-semibold mb-4">Additional equipment</Text>
      {AdditionalequipmentOptions.map((opt) => (
        <View key={opt} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={form.additionalequipment.includes(opt)}
            onValueChange={() => toggleCheckbox("additionalequipment", opt)}
          />
          <Text className="ml-2 text-base">{opt}</Text>
        </View>
      ))}

      <Text className="text-lg font-semibold mb-4">Comfort</Text>
      {ComfortOptions.map((opti) => (
        <View key={opti} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={form.comfort.includes(opti)}
            onValueChange={() => toggleCheckbox("comfort", opti)}
          />
          <Text className="ml-2 text-base">{opti}</Text>
        </View>
      ))}

      <PickerField
        label="Car radio"
        value={form.carradio}
        onPress={() => openModel("carradio")}
      />

      <Text className="text-lg font-semibold mb-4">Safety</Text>
      {SafetyOptions.map((optio) => (
        <View key={optio} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={form.safety.includes(optio)}
            onValueChange={() => toggleCheckbox("safety", optio)}
          />
          <Text className="ml-2 text-base">{optio}</Text>
        </View>
      ))}

      <PickerField
        label="Airbags"
        value={form.airbags}
        onPress={() => openModel("airbags")}
      />

      <Text className="text-lg font-semibold mb-4">Security against theft</Text>
      {AntitheftOptions.map((option) => (
        <View key={option} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={form.antitheft.includes(option)}
            onValueChange={() => toggleCheckbox("antitheft", option)}
          />
          <Text className="ml-2 text-base">{option}</Text>
        </View>
      ))}

      <PickerField
        label="Suspension"
        value={form.suspension}
        onPress={() => openModel("suspension")}
      />

      <View className="flex-row items-center mb-6 mt-4">
        <Switch
          value={form.autogas}
          onValueChange={(v) => setForm((f) => ({ ...f, autogas: v }))}
        />
        <Text className="text-lg pl-4">Autogas</Text>
      </View>

      <PickerField
        label="Color"
        value={form.color}
        onPress={() => openModel("color")}
      />

      <View className="flex-row items-center mb-6 mt-4">
        <Switch
          value={form.metallic}
          onValueChange={(v) => setForm((f) => ({ ...f, metallic: v }))}
        />
        <Text className="text-lg pl-4">Metallic</Text>
      </View>

      <PickerField
        label="Tire size - width"
        value={form.widthTireSize}
        onPress={() => openModel("widthTireSize")}
      />

      <PickerField
        label="Tire size - height"
        value={form.hightTireSize}
        onPress={() => openModel("hightTireSize")}
      />

      <PickerField
        label="Tire size - diameter"
        value={form.diameterTireSize}
        onPress={() => openModel("diameterTireSize")}
      />

      <InputField
        label="Video link"
        value={form.videoLink}
        onChangeText={(val) => setForm((f) => ({ ...f, videoLink: val }))}
        keyboardType="default"
        placeholder="Paste the video link"
      />

      <TouchableOpacity
        className="bg-blue-500 w-full px-6 py-3 rounded-full items-center mt-6 mb-32"
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-xl">Submit</Text>
      </TouchableOpacity>

      <PickerModal
        visible={modal.visible}
        onClose={() => setModal((m) => ({ ...m, visible: false }))}
        title={modal.key}
        selectedValue={modal.tempValue}
        setTempValue={(val) => setModal((m) => ({ ...m, tempValue: val }))}
        options={
          modal.key === "ecological"
            ? ecologicalOptions
            : modal.key === "airconditioning"
            ? AirconditioningOptions
            : modal.key === "bodyshape"
            ? BodyshapeOptions
            : modal.key === "carradio"
            ? CarradioOptions
            : modal.key === "airbags"
            ? AirbagsOptions
            : modal.key === "suspension"
            ? SuspensionOptions
            : modal.key === "color"
            ? ColorOptions
            : modal.key === "diameterTireSize"
            ? DiameterTireSize
            : modal.key === "widthTireSize"
            ? WidthTireSizeOptions
            : modal.key === "hightTireSize"
            ? HightTireSizeOptions
            : modal.key === "seats"
            ? SeatsOptions
            : modal.key === "doors"
            ? DoorsOptions
            : []
        }
        onConfirm={confirmModal}
      />
    </ScrollView>
  );
};

export default Add2;
