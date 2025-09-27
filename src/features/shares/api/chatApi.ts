import { api } from '../../../lib/api';
import {
  ChatMessage,
  SendMessageRequest,
  ChatMessagesResponse,
  ChatPaginationParams
} from '../types/chat';

export const chatApi = {
  getChatMessages: async (
    shareId: number,
    params?: ChatPaginationParams
  ): Promise<ChatMessagesResponse> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());

    const queryString = queryParams.toString();
    const endpoint = `/shares/${shareId}/chat/messages${queryString ? `?${queryString}` : ''}`;

    return api.get(endpoint);
  },

  sendMessage: async (
    shareId: number,
    message: SendMessageRequest
  ): Promise<ChatMessage> => {
    return api.post(`/shares/${shareId}/chat/messages`, message);
  },
};