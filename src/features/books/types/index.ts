export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  thumbnailUrl: string;
}

export interface SearchBookResult {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  userBookId: number;
  ownerUserId: string;
  status: number;
  communityId: number;
  communityName: string;
}

export interface UserBook {
  id: number;
  userId: string;
  bookId: number;
  status: number;
  book: Book;
}

export interface BookSearchResponse {
  books: Book[];
  hasMore: boolean;
}