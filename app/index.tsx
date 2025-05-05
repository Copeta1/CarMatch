import { icons } from "@/constants/icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function StartedScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white px-8">
      <Image source={icons.home} className="w-72 h-72 mb-28" />
      <Text className="text-3xl font-bold mb-8 text-center">
        Your Ultimate <Text className="text-blue-500 ">Car Selling</Text>{" "}
        Experience
      </Text>
      <Text className="mb-8 text-center">
        List your car in seconds, connect with real buyers, and close the deal
        on your terms!
      </Text>
      <TouchableOpacity
        className="bg-blue-500 w-full px-6 py-4 rounded-full items-center"
        onPress={() => router.replace("/signup")}
      >
        <Text className="text-white font-semibold text-xl">
          Let&apos;s Get Started
        </Text>
      </TouchableOpacity>
      <Text className="text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <Text
          className="text-blue-500 font-semibold"
          onPress={() => router.replace("/login")}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}
