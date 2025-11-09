import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Query } from "react-native-appwrite";

import {
  appwriteBucketVehicleImagesId,
  appwriteCollectionVehiclesId,
  appwriteDatabaseId,
  appwriteProjectId,
  client,
  databases,
} from "../lib/appwrite";

export default function CarList({
  listHeaderComponent,
}: {
  listHeaderComponent: React.ComponentType<any>;
}) {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const fetchCars = async (append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const currentOffset = append ? offset + limit : 0;

      const response = await databases.listDocuments(
        appwriteDatabaseId,
        appwriteCollectionVehiclesId,
        [
          Query.limit(limit),
          Query.offset(currentOffset),
          Query.orderDesc("$createdAt"),
        ]
      );

      const newDocs = response.documents || [];
      if (newDocs.length < limit) setHasMore(false);

      if (append && newDocs.length > 0) {
        setOffset(currentOffset);
      }

      setCars((prev) => (append ? [...prev, ...newDocs] : newDocs));
    } catch (error) {
      console.error("❌ Greška pri dohvaćanju automobila:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCars(false);
  }, []);

  useEffect(() => {
    if (offset === 0) return;
    fetchCars(true);
  }, [offset]);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    setOffset((prev) => prev + limit);
  };

  const renderItem = ({ item }: { item: any }) => {
    let imageUrl = "https://via.placeholder.com/400x250?text=No+Image";

    const firstImageId = item.imageRefs?.[0];

    if (firstImageId) {
      try {
        // Dobavljamo sve potrebne ID-eve
        const endpoint = client.config.endpoint;
        const bucketId = appwriteBucketVehicleImagesId;
        const fileId = firstImageId;
        const projectId = appwriteProjectId;

        imageUrl = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
      } catch (e) {
        console.warn("❌ Greška pri generiranju URL-a slike:", e);
      }
    }

    return (
      <TouchableOpacity
        onPress={() => console.log(`Odabran ${item.carBrand} ${item.carModel}`)}
        className="bg-gray-100 rounded-2xl p-4 mb-5 shadow-sm"
      >
        <Image
          // Koristimo ručno generirani, pouzdani URL
          source={{ uri: imageUrl }}
          className="w-full h-44 rounded-xl"
          resizeMode="cover"
        />
        <View className="mt-3">
          <View className="flex-1 flex-row justify-between items-center">
            <Text className="font-bold text-lg">
              {item.carBrand} {item.carModel}
            </Text>
            {item.price && (
              <Text className="text-blue-600 font-semibold text-lg">
                {item.price} €
              </Text>
            )}
          </View>
          <View className="h-0.5 w-full bg-gray-300 my-4"></View>
          <View className="flex-1 flex-row justify-between items-center">
            {item.modelYear && (
              <Text className="text-gray-600">{item.modelYear}</Text>
            )}
            {item.kilometers && <Text>{item.kilometers}</Text>}
            {item.engineType && <Text>{item.engineType}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading && cars.length === 0) {
    return (
      <View className="py-10 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-500 mt-3">Učitavanje automobila...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.$id}
      renderItem={renderItem}
      ListHeaderComponent={listHeaderComponent}
      contentContainerStyle={{
        paddingVertical: 16,
        paddingBottom: 100,
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator size="small" color="#3b82f6" className="my-5" />
        ) : null
      }
    />
  );
}
