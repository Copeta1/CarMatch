import { icons } from "@/constants/icons";
import { account, ID } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }
    // ... other validations

    setLoading(true);

    try {
      await account.create(ID.unique(), email, password, username);

      try {
        await account.deleteSession("current");

        await login(email, password);
      } catch (logoutError) {
        console.log("No active session to logout", logoutError);
      }

      await account.createEmailPasswordSession(email, password);

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Signup failed:", error);
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "Signup failed";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      className="flex-1 px-8 bg-white"
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 20,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-4xl font-bold mb-6 text-center text-blue-500">
        Create Account
      </Text>
      <Text className="mb-8 text-center px-11 text-gray-600">
        Fill your information below or register with your social account
      </Text>

      <Text className="font-bold pb-1 text-lg text-gray-800">Username</Text>
      <TextInput
        placeholder="Ex. john Doe"
        placeholderTextColor="#9CA3AF"
        className="bg-gray-100 p-4 mb-4 rounded-lg text-gray-800"
        autoCapitalize="words"
        value={username}
        onChangeText={setUsername}
      />

      <Text className="font-bold pb-1 text-lg text-gray-800">Email</Text>
      <TextInput
        placeholder="example@gmail.com"
        placeholderTextColor="#9CA3AF"
        className="bg-gray-100 p-4 mb-4 rounded-lg text-gray-800"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text className="font-bold pb-1 text-lg text-gray-800">Password</Text>
      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        className="bg-gray-100 p-4 mb-4 rounded-lg text-gray-800"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text className="font-bold pb-1 text-lg text-gray-800">
        Confirm Password
      </Text>
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#9CA3AF"
        className="bg-gray-100 p-4 mb-6 rounded-lg text-gray-800"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => setIsChecked(!isChecked)}
          className={`w-5 h-5 border-2 rounded mr-2 ${
            isChecked ? "bg-blue-500 border-blue-500" : "border-gray-400"
          } justify-center items-center`}
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
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold text-xl">
            Create Account
          </Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center my-6 mx-9">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="px-4 text-gray-500">Or sign up with</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <View className="flex-row justify-center gap-4 mb-8">
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

      <View className="flex-row justify-center">
        <Link href="/(auth)/login" className="text-blue-500 font-medium">
          Already have an account? Login
        </Link>
      </View>
    </ScrollView>
  );
}
