import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'saved_quotes';

export interface SavedQuote {
  id: string;
  quote: string;
  author: string;
}

export async function getSavedQuotes(): Promise<SavedQuote[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log('Okuma hatası:', error);
    return [];
  }
}

export async function isQuoteSaved(id: string): Promise<boolean> {
  const list = await getSavedQuotes();
  return list.some((item) => item.id === id);
}

export async function toggleSaveQuote(quote: SavedQuote): Promise<boolean> {
  try {
    const list = await getSavedQuotes();
    const exists = list.some((item) => item.id === quote.id);

    let updatedList: SavedQuote[];
    if (exists) {
      updatedList = list.filter((item) => item.id !== quote.id);
    } else {
      updatedList = [quote, ...list];
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    return !exists;
  } catch (error) {
    console.log('Kaydetme hatası:', error);
    return false;
  }
}
