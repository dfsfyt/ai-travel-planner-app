import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: Function) => {
  const [data, setData] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const responseData = await fn();
      setData(responseData);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return {
    data,
    isLoading,
    refetch
  };
};

export default useAppwrite;
