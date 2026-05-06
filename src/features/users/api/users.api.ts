// features/users/api/users.api.ts

import { apiClient } from '../../../shared/api/client';
import type { User, UsersResponse, UserFormData } from '../types';

export const usersApi = {
  getUsers: async (limit: number, skip: number): Promise<UsersResponse> => {
    const { data } = await apiClient.get<UsersResponse>('/users', {
      params: { limit, skip, select: 'firstName,lastName,email,age,image,phone,username,company' },
    });
    return data;
  },

  searchUsers: async (query: string, limit: number, skip: number): Promise<UsersResponse> => {
    const { data } = await apiClient.get<UsersResponse>('/users/search', {
      params: { q: query, limit, skip },
    });
    return data;
  },

  getUserById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data;
  },

  updateUser: async (id: number, userData: Partial<UserFormData>): Promise<User> => {
    const { data } = await apiClient.put<User>(`/users/${id}`, userData);
    return data;
  },
};
