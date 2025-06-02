import CloseButton from "@/components/CloseButton";
import { Stack } from "expo-router";

export default function CarLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{
          title: "Add Car",
          headerShown: true,
          headerRight: () => null,
          headerLeft: () => <CloseButton />,
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "Edit Car",
          headerShown: true,
          headerRight: () => null,
          headerLeft: () => <CloseButton />,
        }}
      />
    </Stack>
  );
}
