import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  getSavedQuotes,
  SavedQuote,
  toggleSaveQuote,
} from '@/storage/savedQuotes';

export default function SavedQuotesScreen() {
  const [savedList, setSavedList] = useState<SavedQuote[]>([]);

  const loadSavedQuotes = async () => {
    const data = await getSavedQuotes();
    setSavedList(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedQuotes();
    }, [])
  );

  const handleRemove = async (item: SavedQuote) => {
    await toggleSaveQuote(item);
    loadSavedQuotes();
  };

  if (savedList.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>Henüz kaydedilmiş söz yok</Text>
        <Text style={styles.emptySubtitle}>
          Beğendiğiniz sözleri detay ekranından kaydedebilirsiniz.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.countText}>{savedList.length} kayıtlı söz</Text>
      <FlatList
        data={savedList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/detail',
                params: {
                  id: item.id,
                  quote: item.quote,
                  author: item.author,
                },
              })
            }>
            <Text style={styles.quoteText}>"{item.quote}"</Text>
            <View style={styles.bottomRow}>
              <Text style={styles.authorText}>- {item.author}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item)}>
                <Text style={styles.removeButtonText}>Çıkar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  emptyBox: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  countText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quoteText: {
    fontSize: 15,
    color: '#222',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  removeButtonText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
});
