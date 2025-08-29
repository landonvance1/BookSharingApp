import { useState, useEffect, useCallback } from 'react';
import { booksApi } from '../api/booksApi';
import { Book, SearchBookResult } from '../types';

export const useBookSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<SearchBookResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const results = await booksApi.searchBooks(query);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAllBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await booksApi.getAllBooks();
      setBooks(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load books');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllBooks();
  }, []);

  return {
    books,
    searchResults,
    loading,
    error,
    searchBooks,
  };
};