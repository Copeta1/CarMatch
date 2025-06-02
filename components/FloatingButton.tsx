import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const FloatingButton = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const icon1Translate = useRef(new Animated.Value(0)).current;
  const icon2Translate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const popIn = () => {
    setShowMenu(true);

    Animated.parallel([
      Animated.timing(icon1Translate, {
        toValue: -140,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(icon2Translate, {
        toValue: -70,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const popOut = () => {
    Animated.parallel([
      Animated.timing(icon1Translate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(icon2Translate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowMenu(false);
    });
  };

  return (
    <View className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 items-center">
      {showMenu && (
        <Animated.View
          style={{
            transform: [{ translateY: icon1Translate }],
            opacity,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              popOut();
              router.push("/add");
            }}
            className="w-16 h-16 rounded-full bg-blue-400 items-center justify-center shadow-lg"
          >
            <Text className="text-white text-sm font-semibold">ADD</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {showMenu && (
        <Animated.View
          style={{
            transform: [{ translateY: icon2Translate }],
            opacity,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              popOut();
              router.push("/edit");
            }}
            className="w-16 h-16 rounded-full bg-blue-400 items-center justify-center shadow-lg"
          >
            <Text className="text-white text-sm font-semibold">EDIT</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <TouchableOpacity
        className="w-16 h-16 rounded-full bg-blue-500 items-center justify-center shadow-lg"
        onPress={() => (showMenu ? popOut() : popIn())}
      >
        <Text className="text-white text-4xl font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;
