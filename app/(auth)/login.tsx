import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants/icons";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed:", err.message);
      } else {
        console.error("Login failed:", err);
      }
      alert("Login failed. Check credentials.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

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
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text className="font-bold pb-1 text-lg">Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        className="bg-gray-200 p-3 mb-6 rounded-lg"
      />

      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-full"
        onPress={handleLogin}
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
}
