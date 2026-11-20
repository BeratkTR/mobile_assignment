import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { isQuoteSaved, toggleSaveQuote } from '@/storage/savedQuotes';

export default function QuoteDetailScreen() {
  const params = useLocalSearchParams();
  const [saved, setSaved] = useState(false);

  const quoteId = String(params.id || '');
  const quoteText = String(params.quote || '');
  const authorName = String(params.author || '');

  useEffect(() => {
    if (quoteId) {
      isQuoteSaved(quoteId).then(setSaved);
    }
  }, [quoteId]);

  const handleToggleSave = async () => {
    const newState = await toggleSaveQuote({
      id: quoteId,
      quote: quoteText,
      author: authorName,
    });
    setSaved(newState);
  };

  let otherQuotes: any[] = [];
  if (typeof params.otherQuotes === 'string') {
    try {
      otherQuotes = JSON.parse(params.otherQuotes);
    } catch {
      otherQuotes = [];
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.quote}>"{quoteText}"</Text>
        <Text style={styles.author}>- {authorName}</Text>

        <TouchableOpacity
          style={[styles.saveButton, saved && styles.savedButton]}
          onPress={handleToggleSave}>
          <Text style={styles.saveButtonText}>
            {saved ? 'Kaydedilenlerden Çıkar' : 'Kaydet'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Yazarın Listedeki Diğer Sözleri</Text>

      {otherQuotes.length === 0 ? (
        <Text style={styles.emptyText}>
          Bu yazarın listede başka sözü yok.
        </Text>
      ) : (
        otherQuotes.map((item) => (
          <View key={item.id} style={styles.otherCard}>
            <Text style={styles.otherQuote}>"{item.quote}"</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#222',
    lineHeight: 26,
    marginBottom: 12,
  },
  author: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'right',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: '#dc2626',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: 'gray',
  },
  otherCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  otherQuote: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
