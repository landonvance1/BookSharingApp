import Constants from "expo-constants";

//local
//const devServerUri = 'http://' + Constants.expoConfig?.hostUri?.split(':').shift() + ':5155';

//container
const devServerUri = 'http://' + Constants.expoConfig?.hostUri?.split(':').shift() + ':3001';

export const API_BASE_URL = __DEV__ ? devServerUri : 'http://192.168.1.72:5155'; //todo replace with prod api url