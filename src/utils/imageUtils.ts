import { API_BASE_URL } from '../lib/constants';

export const getFullImageUrl = (thumbnailUrl?: string): string => {
  if (!thumbnailUrl || thumbnailUrl.trim() === '') {
    return 'https://via.placeholder.com/150x200?text=No+Image';
  }
  
  if (thumbnailUrl.startsWith('http://') || thumbnailUrl.startsWith('https://')) {
    return thumbnailUrl;
  }
  
  return `${API_BASE_URL}${thumbnailUrl.startsWith('/') ? '' : '/'}${thumbnailUrl}`;
};

export const getImageUrlFromId = (id: number): string => {
  if (id <= 0) {
    return 'https://via.placeholder.com/150x200?text=No+Image';
  }
  
  return `${API_BASE_URL}/images/${id}.jpg`;
};