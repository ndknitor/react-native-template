import { Dispatch, SetStateAction, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from 'use-async-effect';
import useDebounce from './useDebounce';

export default function useLocalStorage<T>(key: string, initialValue: T, debounceDelay: number = 600): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);
  const debounce = useDebounce<T>(value, debounceDelay);

  useAsyncEffect(async () => {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue !== null || storedValue != undefined) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  useAsyncEffect(async () => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }, [key, debounce]);

  return [value, setValue];
}
