import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function QuoteListScreen() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [dailyQuote, setDailyQuote] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/quotes?limit=30&skip=60')
      .then((res) => res.json())
      .then((data) => {
        setQuotes(data.quotes);
        if (data.quotes && data.quotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.quotes.length);
          setDailyQuote(data.quotes[randomIndex]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('Veri çekme hatası:', error);
        setLoading(false);
      });
  }, []);

  const filteredQuotes = quotes.filter((item) => {
    const query = search.toLowerCase();
    const matchesSearch =
      item.quote.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query);
    const matchesAuthor =
      selectedAuthor === '' || item.author === selectedAuthor;

    return matchesSearch && matchesAuthor;
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#333" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {dailyQuote && (
        <TouchableOpacity
          style={styles.dailyCard}
          onPress={() =>
            router.push({
              pathname: '/detail',
              params: {
                id: dailyQuote.id,
                quote: dailyQuote.quote,
                author: dailyQuote.author,
              },
            })
          }>
          <Text style={styles.dailyLabel}>Günün Sözü</Text>
          <Text style={styles.dailyQuoteText}>"{dailyQuote.quote}"</Text>
          <Text style={styles.dailyAuthorText}>- {dailyQuote.author}</Text>
        </TouchableOpacity>
      )}

      <TextInput
        style={styles.searchInput}
        placeholder="Söz veya yazar ara..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.infoRow}>
        <Text style={styles.countText}>{filteredQuotes.length} kayıt</Text>
        {selectedAuthor !== '' && (
          <TouchableOpacity
            style={styles.clearFilterButton}
            onPress={() => setSelectedAuthor('')}>
            <Text style={styles.clearFilterText}>
              Yazar: {selectedAuthor} ✕
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {filteredQuotes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
        </View>
      ) : (
        <FlatList
          data={filteredQuotes}
          keyExtractor={(item) => item.id.toString()}
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
              <Text style={styles.quoteText} numberOfLines={2}>
                "{item.quote}"
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedAuthor(item.author)}>
                <Text style={styles.authorText}>- {item.author}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 8,
    color: '#555',
  },
  dailyCard: {
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  dailyLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#93c5fd',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dailyQuoteText: {
    fontSize: 15,
    color: '#ffffff',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  dailyAuthorText: {
    fontSize: 13,
    color: '#cbd5e1',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 15,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  countText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  clearFilterButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  clearFilterText: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '600',
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
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
    marginBottom: 6,
  },
  authorText: {
    fontSize: 13,
    color: 'gray',
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
