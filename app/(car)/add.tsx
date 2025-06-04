import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const categoryOptions = [
  "Personal Vehicles",
  "Commercial Vehicles",
  "Oldtimers",
  "Motorcycles / Motorbikes",
  "Campers and Caravans",
  "Spare parts and equipment",
];

const subCategoryOptions: { [key: string]: string[] } = {
  "Commercial Vehicles": [
    "Vans and delivery vehicles",
    "Cargo vehicles",
    "Connected vehicles",
    "Passenger cars",
    "Buses",
    "Other commercial vehicles",
  ],
  Oldtimers: [
    "Oldtimer cars",
    "Oldtimer motorcycles",
    "Other oldtimer vehicles",
    "Parts and equipment for classic cars",
  ],
  "Motorcycles / Motorbikes": [
    "Sports motorcycles",
    "Road motorcycles",
    "Cross motorcycles",
    "Choppers",
    "Mopeds",
    "Scooters (up to 50 ccm)",
    "Scooters (over 50 ccm)",
    "Electric scooters",
    "Quad bikes",
  ],
  "Campers and Caravans": ["Campers", "Camp trailers"],
};

const categoryEngineOptions = [
  "Petrol",
  "Diesel",
  "Hybrid",
  "Plug-in Hybrid",
  "Electric",
];

const categoryDriveOptions = ["Front-wheel", "Rear-wheel", "4x4"];

const categoryTransmissionOptions = [
  "Manual",
  "Automatic",
  "Automatic Sequential",
  "Sequential Transmission",
];

const Add = () => {
  const [category, setCategory] = useState("");
  const [tempCategory, setTempCategory] = useState("");

  const [subcategory, setSubcategory] = useState("");
  const [tempSubcategory, setTempSubcategory] = useState("");

  const [productionYear, setProductionYear] = useState("");
  const [tempYear, setTempYear] = useState("");

  const [engineType, setEngineType] = useState("");
  const [tempEngineType, setTempEngineType] = useState("");

  const [driveType, setDriveType] = useState("");
  const [tempDriveType, setTempDriveType] = useState("");

  const [transmissionType, setTransmissionType] = useState("");
  const [tempTransmissionType, setTempTransmissionType] = useState("");

  const [modelYear, setModelYear] = useState("");
  const [enginePower, setEnginePower] = useState("");
  const [sweptVolume, setSweptVolume] = useState("");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [engineModalVisible, setEngineModalVisible] = useState(false);
  const [driveModalVisible, setDriveModalVisible] = useState(false);
  const [transmissionModalVisible, setTransmissionModalVisible] =
    useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <ScrollView className="flex-1 px-6 py-4 bg-white">
      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Basic Information
      </Text>

      <Text className="text-lg font-semibold mb-2">
        Choose Vehicle Category
      </Text>
      <TouchableOpacity
        onPress={() => {
          setTempCategory(category || "");
          setCategoryModalVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">
          {category || "Select category..."}
        </Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>

      <Modal transparent visible={categoryModalVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setCategoryModalVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">Select Category</Text>
            <Picker
              selectedValue={tempCategory}
              onValueChange={(val) => setTempCategory(val)}
            >
              <Picker.Item label="Select category..." value="" />
              {categoryOptions.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setCategory(tempCategory);
                setSubcategory("");
                setCategoryModalVisible(false);
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

      {subCategoryOptions[category] && (
        <>
          <Text className="text-lg font-semibold mb-2">Choose Subcategory</Text>
          <TouchableOpacity
            onPress={() => {
              setTempSubcategory(subcategory || "");
              setSubcategoryModalVisible(true);
            }}
            className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
          >
            <Text className="text-gray-800">
              {subcategory || "Select subcategory..."}
            </Text>
            <Text className="text-gray-400 text-lg">▼</Text>
          </TouchableOpacity>
        </>
      )}
      <Modal
        transparent
        visible={subcategoryModalVisible}
        animationType="slide"
      >
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setSubcategoryModalVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">
              Select Subcategory
            </Text>
            <Picker
              selectedValue={tempSubcategory}
              onValueChange={(val) => setTempSubcategory(val)}
            >
              <Picker.Item label="Select subcategory..." value="" />
              {subCategoryOptions[category]?.map((subcat) => (
                <Picker.Item key={subcat} label={subcat} value={subcat} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setSubcategory(tempSubcategory);
                setSubcategoryModalVisible(false);
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

      <Text className="text-lg font-semibold mb-2">Model year</Text>
      <TextInput
        value={modelYear}
        onChangeText={(text) => setModelYear(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={4}
        placeholder="Enter the model year"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <Text className="text-lg font-semibold mb-2">Year of manufacture</Text>
      <TouchableOpacity
        onPress={() => {
          setTempYear(productionYear || "");
          setYearModalVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">{productionYear || "Year of ..."}</Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
      <Modal transparent visible={yearModalVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setYearModalVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">
              Select the year of production
            </Text>
            <Picker
              selectedValue={tempYear}
              onValueChange={(val) => setTempYear(val)}
            >
              <Picker.Item label="Select the year of production" value="" />
              {years.map((year) => (
                <Picker.Item key={year} label={year} value={year} />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setProductionYear(tempYear);
                setYearModalVisible(false);
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

      <Text className="font-semibold text-2xl text-blue-500 mb-4">
        Technical Characteristics
      </Text>

      <Text className="text-lg font-semibold mb-2">Engine Type</Text>
      <TouchableOpacity
        onPress={() => {
          setTempEngineType(engineType || "");
          setEngineModalVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">
          {engineType || "Select engine type..."}
        </Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
      <Modal transparent visible={engineModalVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setEngineModalVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">Select Engine</Text>
            <Picker
              selectedValue={tempEngineType}
              onValueChange={(eng) => setTempEngineType(eng)}
            >
              <Picker.Item label="Select Engine Type" value="" />
              {categoryEngineOptions.map((eng) => (
                <Picker.Item key={eng} label={eng} value={eng} />
              ))}
            </Picker>

            <TouchableOpacity
              onPress={() => {
                setEngineType(tempEngineType);
                setEngineModalVisible(false);
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

      <Text className="text-lg font-semibold mb-2">Engine Power kW</Text>
      <TextInput
        value={enginePower}
        onChangeText={(text) => setEnginePower(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter the engine Power kW"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <Text className="text-lg font-semibold mb-2">Swept Volume</Text>
      <TextInput
        value={sweptVolume}
        onChangeText={(text) => setSweptVolume(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={10}
        placeholder="Enter the engine Power kW"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

      <Text className="text-lg font-semibold mb-2">Drive Type</Text>
      <TouchableOpacity
        onPress={() => {
          setTempDriveType(driveType || "");
          setDriveModalVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center mb-4"
      >
        <Text className="text-gray-800">
          {driveType || "Select drive type"}
        </Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
      <Modal transparent visible={driveModalVisible} animationType="slide">
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setDriveModalVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">
              Select Drive Type
            </Text>
            <Picker
              selectedValue={tempDriveType}
              onValueChange={(drive) => setTempDriveType(drive)}
            >
              <Picker.Item label="Select Drive Type" value="" />
              {categoryDriveOptions.map((drive) => (
                <Picker.Item key={drive} label={drive} value={drive} />
              ))}
            </Picker>

            <TouchableOpacity
              onPress={() => {
                setDriveType(tempDriveType);
                setDriveModalVisible(false);
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

      <Text className="text-lg font-semibold mb-2">Transmission Type</Text>
      <TouchableOpacity
        onPress={() => {
          setTempTransmissionType(transmissionType || "");
          setTransmissionModalVisible(true);
        }}
        className="bg-gray-100 rounded-lg px-4 py-3 flex-row justify-between items-center"
      >
        <Text className="text-gray-800">
          {transmissionType || "Select Transmission Type"}
        </Text>
        <Text className="text-gray-400 text-lg">▼</Text>
      </TouchableOpacity>
      <Modal
        transparent
        visible={transmissionModalVisible}
        animationType="slide"
      >
        <Pressable
          className="flex-1 bg-black/30 justify-end"
          onPress={() => setTransmissionModalVisible(false)}
        >
          <Pressable className="bg-white rounded-t-2xl p-4">
            <Text className="text-lg font-semibold mb-2">
              Select Transmission Type
            </Text>
            <Picker
              selectedValue={tempTransmissionType}
              onValueChange={(transmission) =>
                setTempTransmissionType(transmission)
              }
            >
              <Picker.Item label="Select Transmission Type" value="" />
              {categoryTransmissionOptions.map((transmission) => (
                <Picker.Item
                  key={transmission}
                  label={transmission}
                  value={transmission}
                />
              ))}
            </Picker>
            <TouchableOpacity
              onPress={() => {
                setTransmissionType(tempTransmissionType);
                setTransmissionModalVisible(false);
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
        onPress={() => alert("Form submitted!")}
      >
        <Text className="text-white font-semibold text-xl">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Add;
