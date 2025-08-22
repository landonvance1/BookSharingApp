export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  thumbnailUrl: string;
}

export interface UserBook {
  id: number;
  userId: string;
  bookId: number;
  status: number;
  book: Book;
}