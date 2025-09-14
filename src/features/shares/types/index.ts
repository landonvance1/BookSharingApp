import { Book } from '../../books/types';
import { User } from '../../../types/auth';

export interface UserBookWithOwner {
  id: number;
  userId: string;
  bookId: number;
  status: number;
  book: Book;
  user: User;
}

export interface Share {
  id: number;
  userBookId: number;
  borrower: string;
  returnDate: string | null;
  status: number;
  userBook: UserBookWithOwner;
}