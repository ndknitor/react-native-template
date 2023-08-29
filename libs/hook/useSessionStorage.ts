import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
class Storage {
    private data: Map<string, any>;

    constructor() {
        this.data = new Map<string, any>();
    }

    public key(n: number) {
        return [...this.data.keys()][n];
    }
    public getItem(key: string) {
        return this.data.get(key);
    }
    public get length() {
        return this.data.size;
    }

    public setItem(key: string, value: any) {
        this.data.set(key, value);
    }
    public removeItem(key: string) {
        this.data.delete(key);
    }
    public clear() {
        this.data = new Map<string, any>();
    }

}
const sessionStorage = new Storage();

const useSessionStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const storedValue = sessionStorage.getItem(key);
        if (storedValue !== null || storedValue != undefined) {
            setValue(JSON.parse(storedValue));
        }
    }, [key]);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key]);

    return [value, setValue];
};

export default useSessionStorage;
