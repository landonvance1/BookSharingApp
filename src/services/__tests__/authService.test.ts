import { authService } from '../authService';
import * as SecureStore from 'expo-secure-store';
import { createMockUser } from '../../__tests__/utils/factories';

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const response = await authService.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(response).toHaveProperty('user');
      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('refreshToken');
      expect(response.user.email).toBe('test@example.com');
    });

    it('should throw error for invalid credentials', async () => {
      await expect(
        authService.login({
          email: 'wrong@example.com',
          password: 'wrong',
        })
      ).rejects.toThrow();
    });
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      const response = await authService.register({
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'New',
        lastName: 'User',
      });

      expect(response).toHaveProperty('user');
      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('refreshToken');
      expect(response.user.email).toBe('newuser@example.com');
      expect(response.user.firstName).toBe('New');
      expect(response.user.lastName).toBe('User');
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh token', async () => {
      const response = await authService.refreshToken('mock-refresh-token');

      expect(response).toHaveProperty('token');
      expect(response).toHaveProperty('refreshToken');
    });

    it('should throw error for invalid refresh token', async () => {
      await expect(
        authService.refreshToken('invalid-token')
      ).rejects.toThrow();
    });
  });

  describe('token storage', () => {
    it('should store tokens in SecureStore', async () => {
      const mockUser = createMockUser();
      const authResponse = {
        user: mockUser,
        token: 'test-token',
        refreshToken: 'test-refresh-token',
        expires: ''
      };

      await authService.storeTokens(authResponse);

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'auth_token',
        'test-token'
      );
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'refresh_token',
        'test-refresh-token'
      );
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        'user_data',
        JSON.stringify(mockUser)
      );
    });

    it('should retrieve token from SecureStore', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce('stored-token');

      const token = await authService.getToken();

      expect(token).toBe('stored-token');
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('auth_token');
    });

    it('should retrieve refresh token from SecureStore', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce('stored-refresh');

      const refreshToken = await authService.getRefreshToken();

      expect(refreshToken).toBe('stored-refresh');
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('refresh_token');
    });

    it('should retrieve user from SecureStore', async () => {
      const mockUser = createMockUser();
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(
        JSON.stringify(mockUser)
      );

      const user = await authService.getUser();

      expect(user).toEqual(mockUser);
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('user_data');
    });

    it('should return null when no user is stored', async () => {
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(null);

      const user = await authService.getUser();

      expect(user).toBeNull();
    });

    it('should clear all tokens from SecureStore', async () => {
      await authService.clearTokens();

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth_token');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('refresh_token');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('user_data');
    });
  });
});
