import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-white">
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
      <ScrollView className="flex-1 px-5"></ScrollView>
    </View>
  );
}
