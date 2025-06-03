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

const Add = () => {
  const [category, setCategory] = useState("");
  const [tempCategory, setTempCategory] = useState("");

  const [subcategory, setSubcategory] = useState("");
  const [tempSubcategory, setTempSubcategory] = useState("");

  const [productionYear, setProductionYear] = useState("");
  const [tempYear, setTempYear] = useState("");

  const [modelYear, setModelYear] = useState("");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [subcategoryModalVisible, setSubcategoryModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);

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

      <Text className="text-lg font-semibold mb-2">Model year</Text>
      <TextInput
        value={modelYear}
        onChangeText={(text) => setModelYear(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        maxLength={4}
        placeholder="Enter the model year"
        className="bg-gray-100 rounded-lg px-4 py-3 mb-6 text-gray-800"
      />

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
    </ScrollView>
  );
};

export default Add;
