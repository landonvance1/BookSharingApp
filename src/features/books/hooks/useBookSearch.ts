import { useState, useEffect } from 'react';
import { booksApi } from '../api/booksApi';
import { Book } from '../types';

export const useBookSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = async (query: string) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await booksApi.searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

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
    loading,
    error,
    searchBooks,
  };
};