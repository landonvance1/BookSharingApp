import { StyleSheet } from 'react-native';

export const bookCardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFCF9',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    position: 'relative',
    shadowColor: '#1C3A5B',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  trashIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 8,
    zIndex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 80,
    height: 120,
    backgroundColor: '#E8E6E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginRight: 16,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  thumbnailText: {
    color: '#6B6B6B',
    fontSize: 10,
    textAlign: 'center',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  author: {
    color: '#6B6B6B',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  title: {
    color: '#1C3A5B',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
    marginBottom: 12,
  },
  actionButtons: {
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#8FA68E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8FA68E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  destructiveButton: {
    backgroundColor: '#C4443C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: '#FEFCF9',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6B6B6B',
    fontSize: 14,
    fontWeight: '500',
  },
  destructiveButtonText: {
    color: '#FEFCF9',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    color: '#6B6B6B',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusAvailable: {
    backgroundColor: '#8FA68E',
  },
  statusOnLoan: {
    backgroundColor: '#D4A574',
  },
  statusUnavailable: {
    backgroundColor: '#C4443C',
  },
  statusText: {
    color: '#FEFCF9',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    width: 100
  },
  
  // Legacy styles for backward compatibility - will be removed after components are updated
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    paddingTop: 0,
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
});