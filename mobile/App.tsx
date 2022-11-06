import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Pools } from './src/screens/Pools';

import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold });

  //AuthContextProvider é o header da aplicação onde fica o token do servidor assim sempre que o sistema fizer uma requisição não é necessario  passar o token pois ele ja esta no header
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider> 
        <StatusBar 
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
          />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}