import { StatusBar } from 'expo-status-bar';
import TabNavigator from './src/components/TabNavigator';

export default function App() {
  return (
    <>
      <TabNavigator />
      <StatusBar style="auto" />
    </>
  );
}
