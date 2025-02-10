function getData(key: string) {
    const data: string | null = localStorage.getItem(key);
    return data;
}

function populateStorage<Type>(data: Type, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
}

function checkStorage<Type>(key: string, defaultValue: Type) {
    if (!localStorage.getItem(key)) {
        return defaultValue;
    } else {
        return getData(key);
    }
}

export { populateStorage, checkStorage };