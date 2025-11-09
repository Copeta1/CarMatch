import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CarList from "../../components/CarList"; // Ovdje je FlatList
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";

// *** NOVA KOMPONENTA ZA GORNJI, NE-SCROLABLE DEO ***
const HeaderContent = () => {
  return (
    <View>
      <View className="bg-primary w-full h-64 rounded-b-3xl shadow-md">
        <View className="bg-primary w-full h-64 rounded-b-3xl shadow-md px-5 pt-12">
          <View className="flex-row justify-between items-center pt-8 px-5">
            {/* Left: Location */}
            <View>
              <Text className="text-white text-sm font-semibold">Location</Text>
              <View className="flex-row items-center space-x-2 mt-1">
                <Image
                  source={icons.location}
                  className="w-7 h-7 text-white"
                  resizeMode="contain"
                  tintColor="white"
                />
                <Text className="text-white text-lg font-semibold px-2">
                  Zagreb, Croatia
                </Text>
              </View>
            </View>

            {/* Right */}
            <TouchableOpacity className="w-11 h-11 bg-white/30 rounded-lg items-center justify-center">
              <Image
                source={icons.notification}
                className="w-7 h-7"
                resizeMode="contain"
                tintColor="white"
              />
            </TouchableOpacity>
          </View>
          <View className="my-9">
            <SearchBar placeholder="Search" />
          </View>
        </View>
      </View>
    </View>
  );
};

// *** NOVI KOMPONENTA KOJA SE SKROLA I KOJA IDE IZNAD LISTE AUTOMOBILA ***
const ListHeader = () => {
  const brands = [
    { name: "BMW", icon: require("../../assets/icons/car_brands/BMW.png") },
    { name: "VW", icon: require("../../assets/icons/car_brands/VW.png") },
    {
      name: "Mercedes",
      icon: require("../../assets/icons/car_brands/mercedes.png"),
    },
    { name: "Tesla", icon: require("../../assets/icons/car_brands/tesla.png") },
  ];

  return (
    <View className="px-8 py-8">
      {/* Brands Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="font-bold text-2xl">Brands</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-blue-500" onPress={() => router.push("/")}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Brands of cars (Scrollable content) */}
      <View className="flex-row flex-wrap justify-between py-4">
        {brands.map((brand, index) => (
          <TouchableOpacity
            key={index}
            className="items-center mb-6 w-1/5"
            onPress={() => console.log(`Selected ${brand.name}`)}
          >
            <View className="bg-gray-100 w-16 h-16 rounded-full justify-center items-center">
              <Image
                source={brand.icon}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </View>
            <Text className="mt-2 text-center font-medium text-gray-700">
              {brand.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="font-bold text-2xl">Popular Cars</Text>
    </View>
  );
};

export default function Index() {
  return (
    <View className="flex-1 bg-white">
      <HeaderContent />

      <CarList listHeaderComponent={ListHeader} />
    </View>
  );
}
