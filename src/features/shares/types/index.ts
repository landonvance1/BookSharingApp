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

// Base share interface
export interface BaseShare {
  id: number;
  userBookId: number;
  borrower: string;
  returnDate: string | null;
  status: number;
}

// Share from borrower's perspective (what you've borrowed)
export interface BorrowerShare extends BaseShare {
  userBook: UserBookWithOwner; // Includes the owner's info
}

// Share from lender's perspective (what you've lent out)
export interface LenderShare extends BaseShare {
  userBook: UserBookWithOwner; // Your book
  borrowerUser: User; // The person who borrowed it
}