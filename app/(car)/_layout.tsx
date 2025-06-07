import CloseButton from "@/components/CloseButton";
import { Stack } from "expo-router";

export default function CarLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{
          title: "Advertisement ",
          headerShown: true,
          headerRight: () => null,
          headerLeft: () => <CloseButton />,
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#FFFFFF",
        }}
      />
      <Stack.Screen
        name="add1"
        options={{
          title: "Advertisement ",
          headerShown: true,
          headerRight: () => null,
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#FFFFFF",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "",
          headerShown: true,
          headerRight: () => null,
          headerLeft: () => <CloseButton />,
        }}
      />
    </Stack>
  );
}
