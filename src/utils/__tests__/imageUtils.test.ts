import { getFullImageUrl, getImageUrlFromId } from '../imageUtils';
import { API_BASE_URL } from '../../lib/constants';

// Mock the API_BASE_URL constant
jest.mock('../../lib/constants', () => ({
  API_BASE_URL: 'http://localhost:5155',
  BookStatus: {
    Available: 1,
    BeingShared: 2,
    Unavailable: 3,
  },
  ShareStatus: {
    Requested: 1,
    Ready: 2,
    PickedUp: 3,
    Returned: 4,
    HomeSafe: 5,
    Disputed: 6,
    Declined: 7,
  },
}));

describe('imageUtils', () => {
  describe('getFullImageUrl', () => {
    it('should return placeholder for empty string', () => {
      expect(getFullImageUrl('')).toBe(
        'https://via.placeholder.com/150x200?text=No+Image'
      );
    });

    it('should return placeholder for undefined', () => {
      expect(getFullImageUrl(undefined)).toBe(
        'https://via.placeholder.com/150x200?text=No+Image'
      );
    });

    it('should return placeholder for whitespace string', () => {
      expect(getFullImageUrl('   ')).toBe(
        'https://via.placeholder.com/150x200?text=No+Image'
      );
    });

    it('should return full URL if it starts with http://', () => {
      const url = 'http://example.com/image.jpg';
      expect(getFullImageUrl(url)).toBe(url);
    });

    it('should return full URL if it starts with https://', () => {
      const url = 'https://example.com/image.jpg';
      expect(getFullImageUrl(url)).toBe(url);
    });

    it('should prepend API_BASE_URL to relative paths with leading slash', () => {
      expect(getFullImageUrl('/images/book.jpg')).toBe(
        `${API_BASE_URL}/images/book.jpg`
      );
    });

    it('should prepend API_BASE_URL and slash to relative paths without leading slash', () => {
      expect(getFullImageUrl('images/book.jpg')).toBe(
        `${API_BASE_URL}/images/book.jpg`
      );
    });
  });

  describe('getImageUrlFromId', () => {
    it('should return placeholder for id <= 0', () => {
      expect(getImageUrlFromId(0)).toBe(
        'https://via.placeholder.com/150x200?text=No+Image'
      );
      expect(getImageUrlFromId(-1)).toBe(
        'https://via.placeholder.com/150x200?text=No+Image'
      );
    });

    it('should return correct URL for valid id', () => {
      expect(getImageUrlFromId(1)).toBe(`${API_BASE_URL}/images/1.jpg`);
      expect(getImageUrlFromId(42)).toBe(`${API_BASE_URL}/images/42.jpg`);
    });
  });
});
