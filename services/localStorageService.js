const STORAGE_KEY = "items";

export const getItems = () => {
  if (typeof window !== "undefined") {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  }
  return [];
};

export const saveItem = (item) => {
  const items = getItems();
  items.unshift(item); // En son eklenen öğeyi en üste eklemek için
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const updateItem = (updatedItem) => {
  const items = getItems();
  const itemIndex = items.findIndex((item) => item.id === updatedItem.id);
  if (itemIndex > -1) {
    items[itemIndex] = updatedItem;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
};

export const deleteItem = (id) => {
  const items = getItems();
  const filteredItems = items.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
};
