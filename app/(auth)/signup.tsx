import { icons } from "@/constants/icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 20,
      }}
    >
      <Text className="text-4xl font-bold mb-6 text-center text-blue-500">
        Create Account
      </Text>
      <Text className="mb-8 text-center px-11">
        Fill your information below or register with your social account
      </Text>

      <Text className="font-bold pb-1 text-lg">Username</Text>
      <TextInput
        placeholder="Ex. john Doe"
        className="bg-gray-200 p-3 mb-4 rounded-lg"
      />

      <Text className="font-bold pb-1 text-lg">Email</Text>
      <TextInput
        placeholder="example@gmail.com"
        className="bg-gray-200 p-3 mb-4 rounded-lg"
      />

      <Text className="font-bold pb-1 text-lg">Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="bg-gray-200 p-3 mb-6 rounded-lg"
      />

      <Text className="font-bold pb-1 text-lg">Confirm Password</Text>
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        className="bg-gray-200 p-3 mb-6 rounded-lg"
      />

      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => setIsChecked(!isChecked)}
          className={`w-5 h-5 border-2 rounded mr-2 ${
            isChecked ? "bg-blue-500 border-blue-500" : "border-gray-400"
          }`}
        >
          {isChecked && <Text className="text-white text-center">✓</Text>}
        </TouchableOpacity>
        <Text className="text-gray-700">
          I agree with{" "}
          <Text className="text-blue-500 underline">Terms & Conditions</Text>
        </Text>
      </View>

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-full"
        onPress={() => router.replace("/(tabs)")}
      >
        <Text className="text-white text-center font-semibold text-xl">
          Create Account
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center my-9 mx-9">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="px-4 text-gray-500">Or sign up with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <View className="flex-row justify-center gap-4 mb-6">
        <TouchableOpacity className="w-16 h-16 rounded-full border border-gray-300 justify-center items-center">
          <Image source={icons.apple} className="w-7 h-7" />
        </TouchableOpacity>
        <TouchableOpacity className="w-16 h-16 rounded-full border border-gray-300 justify-center items-center">
          <Image source={icons.google} className="w-7 h-7" />
        </TouchableOpacity>
        <TouchableOpacity className="w-16 h-16 rounded-full border border-gray-300 justify-center items-center">
          <Image source={icons.facebook} className="w-8 h-8" />
        </TouchableOpacity>
      </View>

      <Link href="/(auth)/login" className="text-center text-blue-500">
        Already have an account? Login
      </Link>
    </ScrollView>
  );
}
