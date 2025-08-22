import { StyleSheet } from 'react-native';

export const bookCardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  author: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 120,
    height: 160,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  thumbnailText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#000',
    padding: 16,
    paddingTop: 0,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  borrowButton: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  borrowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  statusContainer: {
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'center',
  },
  statusAvailable: {
    backgroundColor: '#4caf50',
  },
  statusOnLoan: {
    backgroundColor: '#ff9800',
  },
  statusUnavailable: {
    backgroundColor: '#f44336',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});