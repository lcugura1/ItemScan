import AsyncStorage from "@react-native-async-storage/async-storage";

export const formPersist = {
  save: async (key: string, data: Record<string, string>) => {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  },
  load: async <T>(key: string): Promise<Partial<T>> => {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : {};
  },
  clear: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
};
