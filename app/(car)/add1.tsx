import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const paymentOptions = [
  "Cash",
  "Credit",
  "Leasing",
  "Takeover of leasing",
  "Installments with bank cards",
  "Trade-in",
  "Old for new",
];

const importOptions = [
  "The price includes all import costs into the Republic of Croatia",
  "The price excludes import costs",
];

const months = [
  { label: "January", value: "01" },
  { label: "February", value: "02" },
  { label: "March", value: "03" },
  { label: "April", value: "04" },
  { label: "May", value: "05" },
  { label: "June", value: "06" },
  { label: "July", value: "07" },
  { label: "August", value: "08" },
  { label: "September", value: "09" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

const categoryWarranty = [
  "6 months",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "6 years",
  "7 years",
  "8 years",
  "9 years",
  "10 or more years",
];

const categoryOwner = ["First", "Second", "Third or more"];

const Add1 = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setIsChecked] = useState<string[]>([]);

  const [price, setPrice] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [importChecked, setImportChecked] = useState("");

  const [isGaraged, setIsGaraged] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [tempMonth, setTempMonth] = useState("");
  const [monthModelVisible, setMonthModelVisible] = useState(false);

  const [Owner, setOwner] = useState("");
  const [tempOwner, setTempOwner] = useState("");
  const [ownerModelVisible, setOwnerModelVisible] = useState(false);

  const [yearInTraffic, setYearInTraffic] = useState("");
  const [registrationInHR, setRegistrationInHR] = useState("");

  const [serviceBook, setServiceBook] = useState(false);

  const [chassisNumber, setChassisNumber] = useState("");

  const [warranty, setWarranty] = useState("");
  const [tempWarranty, setTempWarranty] = useState("");
  const [warrantyModelVisible, setWarrantyModelVisible] = useState(false);

  const toggleOption = (option: string) => {
    setIsChecked((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const getFormattedDate = (month: string) => {
    if (!month) return "Select registration month";
    const year = new Date().getFullYear() + 1;
    return `${month}/${year}`;
  };

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

      <Text className="text-lg font-semibold mb-2">Title</Text>
      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
        value={title}
        onChangeText={setTitle}
      />
      <Text className="text-lg font-semibold mb-2">Description</Text>
      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
        value={description}
        onChangeText={setDescription}
      />

      <Text className="text-lg font-semibold mb-4">Payment options</Text>
      {paymentOptions.map((option) => (
        <View key={option} className="flex-row items-center mb-4 ml-2">
          <Checkbox
            value={isChecked.includes(option)}
            onValueChange={() => toggleOption(option)}
          />
          <Text className="ml-2 text-base">{option}</Text>
        </View>
      ))}

      <Text className="text-lg font-semibold mb-2">Price €</Text>
      <TextInput
        value={price}
        onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter the price"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <Text className="text-lg font-semibold mb-2">Import price</Text>
      {importOptions.map((opt) => (
        <TouchableOpacity
          key={opt}
          className="flex-row items-center mb-4 ml-2"
          onPress={() => setImportChecked(opt)}
        >
          <Checkbox
            value={importChecked === opt}
            onValueChange={() => setImportChecked(opt)}
            color={importChecked === opt ? "#3b82f6" : undefined}
          />
          <Text className="ml-2 text-base text-gray-700">{opt}</Text>
        </TouchableOpacity>
      ))}

      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Vehicle condition
      </Text>

      <View className="flex-row items-center mb-6">
        <Switch
          value={isGaraged}
          onValueChange={setIsGaraged}
          trackColor={{ false: "#ccc", true: "3b82f6" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#ccc"
        />
        <Text className="text-lg pl-4">Garaged</Text>
      </View>

      <Text className="text-lg font-semibold mb-2">Kilometers traveled</Text>
      <TextInput
        value={kilometers}
        onChangeText={(text) => setKilometers(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter the kilometers traveled"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <Text className="text-lg font-semibold mb-2">Registered until</Text>
      <TouchableOpacity
        onPress={() => {
          setTempMonth(selectedMonth || "");
          setMonthModelVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">{getFormattedDate(selectedMonth)}</Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
      <Modal transparent visible={monthModelVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setMonthModelVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">
              Select registereded date
            </Text>
            <Picker
              selectedValue={tempMonth}
              onValueChange={(mont) => setTempMonth(mont)}
            >
              <Picker.Item label="Not registereded" value="" />
              {months.map((mont) => (
                <Picker.Item
                  key={mont.value}
                  label={mont.label}
                  value={mont.value}
                />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setSelectedMonth(tempMonth);
                setMonthModelVisible(false);
              }}
              className="bg-blue-500 rounded-lg px-4 py-3 mt-4"
            >
              <Text className="text-white text-center font-semibold">
                Confirm
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Text className="text-lg font-semibold mb-2">Owner</Text>
      <TouchableOpacity
        onPress={() => {
          setTempOwner(Owner || "");
          setOwnerModelVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">{Owner || "Ownership"}</Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
      <Modal transparent visible={ownerModelVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setOwnerModelVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">Ownership</Text>
            <Picker
              selectedValue={tempOwner}
              onValueChange={(own) => setTempOwner(own)}
            >
              <Picker.Item label="Select ownership" value="" />
              {categoryOwner.map((own) => (
                <Picker.Item key={own} label={own} value={own} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setOwner(tempOwner);
                setOwnerModelVisible(false);
              }}
              className="bg-blue-500 rounded-lg px-4 py-3 mt-4"
            >
              <Text className="text-white text-center font-semibold">
                Confirm
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <Text className="text-lg font-semibold mb-2">In traffic from</Text>
      <TextInput
        value={yearInTraffic}
        onChangeText={(text) => setYearInTraffic(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={4}
        placeholder="e.g. 2020"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <Text className="text-lg font-semibold mb-2">
        First registration in HR
      </Text>
      <TextInput
        value={registrationInHR}
        onChangeText={(text) =>
          setRegistrationInHR(text.replace(/[^0-9]/g, ""))
        }
        keyboardType="numeric"
        maxLength={4}
        placeholder="e.g. 2018"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <View className="flex-row items-center mb-6">
        <Switch
          value={serviceBook}
          onValueChange={setServiceBook}
          trackColor={{ false: "#ccc", true: "3b82f6" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#ccc"
        />
        <Text className="text-lg pl-4">Service book</Text>
      </View>

      <Text className="text-lg font-semibold mb-2">Chassis number</Text>
      <TextInput
        className="bg-gray-100 rounded-lg px-4 py-3 mb-4"
        value={chassisNumber}
        onChangeText={setChassisNumber}
      />

      <Text className="text-lg font-semibold mb-2">Warranty</Text>
      <TouchableOpacity
        onPress={() => {
          setTempWarranty(warranty || "");
          setWarrantyModelVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">{warranty}</Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
      <Modal transparent visible={warrantyModelVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setWarrantyModelVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">
              Select Warranty for your vehicle
            </Text>
            <Picker
              selectedValue={tempWarranty}
              onValueChange={(w) => setTempWarranty(w)}
            >
              <Picker.Item label="Warranty" value="" />
              {categoryWarranty.map((w) => (
                <Picker.Item key={w} label={w} value={w} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setWarranty(tempWarranty);
                setWarrantyModelVisible(false);
              }}
              className="bg-blue-500 rounded-lg px-4 py-3 mt-4"
            >
              <Text className="text-white text-center font-semibold">
                Confirm
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      <TouchableOpacity
        className="bg-blue-500 w-full px-6 py-3 rounded-full items-center mt-8 mb-24"
        onPress={() => {
          alert("Form submitted!");
          router.push("/add2");
        }}
      >
        <Text className="text-white font-semibold text-xl">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Add1;
