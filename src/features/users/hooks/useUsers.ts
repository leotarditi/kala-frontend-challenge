// features/users/hooks/useUsers.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserFormData } from '../types';
import { usersApi } from '../api/users.api';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: { limit: number; skip: number; query: string }) =>
    [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

export function useUsers(limit: number, skip: number, query: string) {
  return useQuery({
    queryKey: userKeys.list({ limit, skip, query }),
    queryFn: () =>
      query
        ? usersApi.searchUsers(query, limit, skip)
        : usersApi.getUsers(limit, skip),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateUser(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: Partial<UserFormData>) => usersApi.updateUser(id, userData),
    onSuccess: (updatedUser) => {
      // Update the detail cache
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      // Invalidate list caches so they refetch
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
