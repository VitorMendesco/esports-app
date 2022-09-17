// react
import { StatusBar } from 'react-native';

// components
import { Loader } from "./src/components/Loader/index";
import { Routes } from './src/routes';
import { Background } from './src/components/Background';

// styles
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loader />}
    </Background>
  );
}
