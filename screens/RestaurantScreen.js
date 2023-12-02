import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  MapPinIcon,
  StarIcon,
  ArrowLeftIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketChip from "../components/BasketChip";
import { PRIMARY_COLOR } from "../constants";

export default function RestaurantScreen() {
  const navigation = useNavigation();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketChip />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-400 pb-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={22} color={PRIMARY_COLOR} />
          </TouchableOpacity>
          <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold">{title}</Text>

              <View className="flex-row items-center space-x-1 mt-1">
                <StarIcon size={22} opacity={0.5} color="green" />
                <Text className="color-green-500">
                  {rating}
                  <Text className="text-xs text-gray-500 pr-1"> ꞏ {genre}</Text>
                </Text>
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500 pl-1">
                  Nearby ꞏ {address}
                </Text>
              </View>

              <Text className="pt-3 text-base pb-4 text-gray-500">
                {short_description}
              </Text>
            </View>
          </View>

          <View className="pb-36">
            <Text className="px-4 pt-6 mb-3 text-2xl font-bold">Menu</Text>
            {dishes.map((dish) => (
              <DishRow
                key={dish._id}
                id={dish._id}
                name={dish.name}
                description={dish.short_description}
                price={dish.price}
                image={dish.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
