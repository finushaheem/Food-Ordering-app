import products from "@assets/data/products";
import { Stack } from "expo-router";

export default function MenuStack () {
    return < Stack>
    <Stack.Screen 
    name="index"
    options={{ title: 'Menu' }}
    />
    </Stack>
}