import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { PickerField } from "../../components/formFields";
import InputField from "../../components/InputField";
import PickerModal from "../../components/PickerModal";
import categoryData from "../../constants/category.json";

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
        label="Number of seats"
        value={form.seats}
        onPress={() => openModel("seats")}
      />

      <PickerField
        label="Number of doors"
        value={form.doors}
        onPress={() => openModel("doors")}
      />

      <PickerField
        label="Air conditioning"
        value={form.airconditioning}
        onPress={() => openModel("airconditioning")}
      />

      <PickerField
        label="Body shape"
        value={form.bodyshape}
        onPress={() => openModel("bodyshape")}
      />

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
        onPress={() => {
          alert("Form submitted!");
        }}
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
