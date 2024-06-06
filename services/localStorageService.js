// services/localStorageService.js
const STORAGE_KEY = "items";

export const getItems = () => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem(STORAGE_KEY);
    // console.log(items);
    return items ? JSON.parse(items) : [];
  } else {
    return [];
  }
};

export const saveItem = (item) => {
  if (typeof window !== "undefined") {
    const items = getItems();
    items.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

export const updateItem = (updatedItem) => {
  if (typeof window !== "undefined") {
    const items = getItems();
    const index = items.findIndex((item) => item.id === updatedItem.id);
    items[index] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

export const deleteItem = (id) => {
  if (typeof window !== "undefined") {
    let items = getItems();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};
