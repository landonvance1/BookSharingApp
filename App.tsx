import { StatusBar } from 'expo-status-bar';
import { BookSearchPage } from './src/features/books/components/BookSearchPage';

export default function App() {
  return (
    <>
      <BookSearchPage />
      <StatusBar style="auto" />
    </>
  );
}
