import { useState, useEffect, useCallback } from 'react';
import { UserBook } from '../../books/types';
import { userBooksApi } from '../api/userBooksApi';
import { useAuth } from '../../../contexts/AuthContext';

interface UseUserBooksReturn {
  userBooks: UserBook[];
  loading: boolean;
  error: string | null;
  refreshUserBooks: () => Promise<void>;
  updateUserBookStatus: (userBookId: number, status: number) => Promise<void>;
  removeUserBook: (userBookId: number) => Promise<void>;
}

export const useUserBooks = (): UseUserBooksReturn => {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  const refreshUserBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }
      
      const books = await userBooksApi.getUserBooks(userId);
      
      // Sort by author last name
      const sortedBooks = books.sort((a, b) => {
        const aLastName = a.book.author.split(' ').pop() || '';
        const bLastName = b.book.author.split(' ').pop() || '';
        return aLastName.localeCompare(bLastName);
      });
      
      setUserBooks(sortedBooks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user books';
      setError(errorMessage);
      console.error('Error fetching user books:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserBookStatus = useCallback(async (userBookId: number, status: number) => {
    try {
      await userBooksApi.updateUserBookStatus(userBookId, status);
      await refreshUserBooks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update book status';
      setError(errorMessage);
      console.error('Error updating book status:', err);
      throw err;
    }
  }, [refreshUserBooks]);

  const removeUserBook = useCallback(async (userBookId: number) => {
    try {
      await userBooksApi.deleteUserBook(userBookId);
      await refreshUserBooks();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove book';
      setError(errorMessage);
      console.error('Error removing book:', err);
      throw err;
    }
  }, [refreshUserBooks]);

  useEffect(() => {
    refreshUserBooks();
  }, [refreshUserBooks]);

  return {
    userBooks,
    loading,
    error,
    refreshUserBooks,
    updateUserBookStatus,
    removeUserBook,
  };
};