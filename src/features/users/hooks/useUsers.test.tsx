import { renderHook, waitFor } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from 'vitest';
import type { ReactNode } from 'react';

import { useUsers } from './useUsers';
import { usersApi } from '../api/users.api';

vi.mock('../api/users.api', () => ({
  usersApi: {
    getUsers: vi.fn(),
    searchUsers: vi.fn(),
    getUserById: vi.fn(),
    updateUser: vi.fn(),
  },
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({
    children,
  }: {
    children: ReactNode;
  }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe('useUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch users successfully', async () => {
    const mockResponse = {
      users: [
        {
          id: 1,
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@test.com',
        },
      ],
      total: 1,
      skip: 0,
      limit: 10,
    };

    vi.mocked(usersApi.getUsers).mockResolvedValue(
      mockResponse as any
    );

    const { result } = renderHook(
      () => useUsers(10, 0, ''),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(usersApi.getUsers).toHaveBeenCalledWith(
      10,
      0
    );

    expect(result.current.data).toEqual(
      mockResponse
    );
  });

  it('should call searchUsers when query exists', async () => {
    const mockResponse = {
      users: [],
      total: 0,
      skip: 0,
      limit: 10,
    };

    vi.mocked(
      usersApi.searchUsers
    ).mockResolvedValue(mockResponse as any);

    const { result } = renderHook(
      () => useUsers(10, 0, 'juan'),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(
      usersApi.searchUsers
    ).toHaveBeenCalledWith(
      'juan',
      10,
      0
    );
  });

  it('should handle api error correctly', async () => {
    vi.mocked(usersApi.getUsers).mockRejectedValue(
      new Error('API Error')
    );

    const { result } = renderHook(
      () => useUsers(10, 0, ''),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(
      Error
    );
  });
});