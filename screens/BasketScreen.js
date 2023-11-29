import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { MinusIcon, XMarkIcon, PlusIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { urlFor } from "../sanity";
import { DELIVERY_FEE } from "../constants";

export default function BasketScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const [groupItemsInBasket, setGroupItemsInBasket] = useState([]);

  useEffect(() => {
    const groupItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupItemsInBasket(groupItems);
  }, [items]);

  const addItemToBasket = ({ id, name, description, price, image }) => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = (id) => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-full">
        <ScrollView className="px-5 pt-5">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl pb-3">Your Order</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <XMarkIcon size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            {Object.entries(groupItemsInBasket).map(([key, groupItems]) => (
              <View key={key} className="flex-row items-center py-4">
                <View className="flex-row items-center flex-1">
                  <Image
                    source={{
                      uri: urlFor(groupItems[0].image).url(),
                    }}
                    className="w-16 h-16"
                  />
                  <View className="px-2 justify-start flex-1">
                    <Text className="font-semibold text-lg leading-5">
                      {groupItems[0]?.name}
                    </Text>
                    <Text>{groupItems[0]?.price} € / unit</Text>
                    <Text className="font-semibold text-lg leading-6  text-[#00CCBB]">
                      {groupItems[0].price * groupItems.length} €
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-center items-center border-[1px] rounded-md px-3 h-10 border-[#00CCBB]">
                  <TouchableOpacity
                    onPress={() => removeItemFromBasket(groupItems[0]?.id)}
                  >
                    <MinusIcon size={20} color="#00CCBB" />
                  </TouchableOpacity>
                  <Text className="text-base px-3">{groupItems.length}</Text>
                  <TouchableOpacity
                    onPress={() => addItemToBasket(groupItems[0])}
                  >
                    <PlusIcon size={20} color="#00CCBB" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View className="absolute w-full bottom-0 z-50 bg-white p-4 border-t-[#00000014] border-t-[1px]">
          <View className="flex-row justify-between pb-4">
            <Text className="text-xl">Subtotal</Text>
            <Text className="text-xl">{basketTotal} €</Text>
          </View>
          <View className="flex-row justify-between pb-4">
            <Text className="text-xl">Delivery Fee</Text>
            <Text className="text-xl">{DELIVERY_FEE} €</Text>
          </View>
          <View className="flex-row justify-between pb-4">
            <Text className="font-bold text-xl">Total</Text>
            <Text className="font-bold text-xl">
              {basketTotal + DELIVERY_FEE} €
            </Text>
          </View>
          <TouchableOpacity
            className="flex-row rounded-lg justify-center items-center px-6 py-3 bg-[#00CCBB]"
            onPress={() => navigation.navigate("PreparingOrder")}
          >
            <Text className="text-white text-xl font-extrabold">
              Go to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
