import Onboarding from '@/components/Onboarding';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { common } from "@/constants"
export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
        <Onboarding />
        <StatusBar backgroundColor={common.PRIMARY} style='light' />
    </SafeAreaView>
  );
}
