import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

export default function BasketChip() {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const navigation = useNavigation();

  if (items.length === 0) return null;

  return (
    <View className="absolute w-full bottom-0 z-50  bg-white p-4 border-t-[#00000014] border-t-[1px]">
      <TouchableOpacity
        className="flex-row rounded-lg justify-between items-center px-6 py-3 bg-[#00CCBB]"
        onPress={() => navigation.navigate("Basket")}
      >
        <Text className="text-white text-xl font-extrabold px-2 bg-[#2e33331a] rounded-sm">
          {items.length}
        </Text>
        <Text className="text-white text-xl font-extrabold">View Basket</Text>
        <Text className="text-white text-xl font-extrabold">
          {basketTotal} €
        </Text>
      </TouchableOpacity>
    </View>
  );
}
