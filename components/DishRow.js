import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  addToBasket,
  selectBasketItemWithId,
  removeFromBasket,
} from "../features/basketSlice";
import { urlFor } from "../sanity";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { TrashIcon } from "react-native-heroicons/outline";

export default function DishRow({ id, name, description, price, image }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemWithId(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <View
        className={`bg-[#f9fafa] border-[1px] p-4 border-gray-100 
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-xl font-bold mb-1">
              {items.length > 0 && (
                <Text className="text-[#00CCBB]">{items.length}x </Text>
              )}
              {name}
            </Text>
            {description && (
              <Text numberOfLines={2} className="text-gray-400">
                {description}
              </Text>
            )}
            <Text
              style={{ color: "#00CCBB" }}
              className="text-base text-gray-400 mt-2"
            >
              {price} €
            </Text>
          </View>
          <Image
            style={{
              borderWidth: 1,
              borderColor: "#F3F3F3",
            }}
            className="h-24 w-24 bg-gray-300"
            source={{
              uri: image ? urlFor(image).url() : null,
            }}
          />
          <View>
            {items.length === 0 && (
              <TouchableOpacity
                onPress={addItemToBasket}
                className="flex justify-center h-24 p-2 ml-4 border-[1px] border-gray-100"
              >
                <PlusIcon size={22} color="#00CCBB" />
              </TouchableOpacity>
            )}
            {items.length > 0 && (
              <View className="flex justify-between h-24 ml-4">
                <TouchableOpacity
                  className="border-[1px] p-2 border-gray-100"
                  onPress={addItemToBasket}
                >
                  <PlusIcon size={22} color="#00CCBB" />
                </TouchableOpacity>

                {items.length > 1 ? (
                  <TouchableOpacity
                    className="border-[1px] p-2 border-gray-100"
                    onPress={removeItemFromBasket}
                  >
                    <MinusIcon size={22} color="#00CCBB" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="border-[1px] p-2 border-gray-100"
                    onPress={removeItemFromBasket}
                  >
                    <TrashIcon size={22} color="#00CCBB" />
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
}
