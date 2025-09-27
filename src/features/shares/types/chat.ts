import { User } from "../../../types/auth";

export interface ChatMessage {
  id: number;
  content: string;
  sender: User;
  senderName: string;
  shareId: number;
  sentAt: string;
}

export interface SendMessageRequest {
  content: string;
}

export interface ChatMessagesResponse {
  messages: ChatMessage[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface ChatPaginationParams {
  page?: number;
  pageSize?: number;
}

export enum ConnectionStatus {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected',
  Reconnecting = 'reconnecting',
  Failed = 'failed'
}

export interface ChatState {
  messages: ChatMessage[];
  connectionStatus: ConnectionStatus;
  isLoading: boolean;
  error: string | null;
  hasMoreMessages: boolean;
  currentPage: number;
}