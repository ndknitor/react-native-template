import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from 'use-async-effect';
<<<<<<< HEAD

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState(initialValue);

  useAsyncEffect(async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue));
      }
    } catch (error) {
      console.log('Error retrieving data from AsyncStorage:', error);
    }
  }, [key]);

  useAsyncEffect(async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error saving data to AsyncStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
=======
import useDebounce from './useDebounce';

export default function useLocalStorage<T>(key: string, initialValue: T, debounceDelay: number = 600): [T, (value: T) => void] {
    const [value, setValue] = useState(initialValue);
    const debounce = useDebounce<T>(value, debounceDelay);

    useAsyncEffect(async () => {
        try {
            const storedValue = await AsyncStorage.getItem(key);
            if (storedValue !== null) {
                setValue(JSON.parse(storedValue));
            }
        } catch (error) {
            console.log('Error retrieving data from AsyncStorage:', error);
        }
    }, [key]);

    useAsyncEffect(async () => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log('Error saving data to AsyncStorage:', error);
        }
    }, [key, debounce]);

    return [value, setValue];
}
>>>>>>> 389c747d864afad23cbcb60fee1bcfd02a117f8e
