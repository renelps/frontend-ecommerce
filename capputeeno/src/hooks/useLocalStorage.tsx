import { useEffect, useState } from "react";

export function useLocalStorage<T>(item: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        // Verifica se o valor já existe no localStorage
        if (typeof window !== "undefined") {
            const storedValue = localStorage.getItem(item);
            if (storedValue) return JSON.parse(storedValue);
        }
        return initialValue;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(item, JSON.stringify(value));
        }
    }, [item, value]);

    const updateLocalStorage = (newValue: T) => {
        setValue(newValue);
    };

    return {
        value,
        updateLocalStorage
    };
}
