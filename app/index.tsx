import Onboarding from '@/components/Onboarding';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { common } from "@/constants"
import { useGlobalContext } from '@/context/GlobalProvider';
import { Redirect } from 'expo-router';
export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
        <Onboarding />
        <StatusBar backgroundColor={common.PRIMARY} style='light' />
    </SafeAreaView>
  );
}
