import { api } from '../../../lib/api';
import { UserBook } from '../../books/types';

export const userBooksApi = {
  getUserBooks: async (userId: string): Promise<UserBook[]> => {
    return api.get(`/user-books/user/${userId}`);
  },

  updateUserBookStatus: async (userBookId: number, status: number): Promise<UserBook> => {
    return api.put(`/user-books/${userBookId}/status`, status);
  },

  deleteUserBook: async (userBookId: number): Promise<void> => {
    return api.delete(`/user-books/${userBookId}`);
  },
};