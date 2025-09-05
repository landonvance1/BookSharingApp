import { api } from '../../../lib/api';
import { Book, SearchBookResult } from '../types';

export const booksApi = {
  searchBooks: async (search?: string): Promise<SearchBookResult[]> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    
    const query = params.toString();
    const endpoint = `/user-books/search${query ? `?${query}` : ''}`;
    
    return api.get(endpoint);
  },
  
  getAllBooks: async (): Promise<Book[]> => {
    return api.get('/books');
  },
  
  getBookById: async (id: number): Promise<Book> => {
    return api.get(`/books/${id}`);
  },
  
  addBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
    return api.post('/books', book);
  },
};