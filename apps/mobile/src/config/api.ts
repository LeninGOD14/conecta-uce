import { Platform } from 'react-native';

// Ajusta EXPO_PUBLIC_API_URL en el entorno de tu equipo.
// Android Emulator suele acceder al host mediante 10.0.2.2.
const defaultUrl = Platform.select({
  android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080',
  default: 'http://localhost:8080',
});

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? defaultUrl!;
