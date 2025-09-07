export interface Book {
  id: number;
  title: string;
  author: string;
  thumbnailUrl: string;
}

export interface SearchBookResult {
  bookId: number;
  title: string;
  author: string;
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

export interface ExternalBookSearchResponse {
  books: Book[];
  hasMore: boolean;
}