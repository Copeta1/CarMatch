import { icons } from "@/constants/icons";
import { Link, router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const login = () => {
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
        Sign In
      </Text>
      <Text className="mb-8 text-center px-11">
        Hi! Welcome back, you&apos;ve been missed{" "}
      </Text>

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

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-full"
        onPress={() => router.replace("/(tabs)")}
      >
        <Text className="text-white text-center font-semibold text-xl">
          Sign In{" "}
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

      <Link href="/(auth)/signup" className="text-center text-blue-500">
        Don&apos;t have an account? Sign Up
      </Link>
    </ScrollView>
  );
};

export default login;
