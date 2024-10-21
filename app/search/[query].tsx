import { FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { common } from "@/constants";
import SearchInput from "@/components/ui/SearchInput";
import EmptyState from "@/components/ui/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/ui/VideoCard";
import { router, useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() =>
    searchPosts(query as string)
  );
  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }: any) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-agdregular text-sm text-gray-100">
              Search Result
            </Text>
            <Text className="text-xl font-agdbold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput
                placeholder="Search for a video topic"
                initialQuery={query as string}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found for this search query"
            btnName="Back to Explore"
            handlePress={() => router.push('/home')}
          />
        )}
      />
      <StatusBar backgroundColor={common.PRIMARY} style="light" />
    </SafeAreaView>
  );
};

export default Search;
