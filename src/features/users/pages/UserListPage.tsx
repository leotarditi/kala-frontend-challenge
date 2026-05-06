// features/pages/UserListPage.tsx

import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { useUsers } from '../hooks';
import { UserSearch, UserTable } from '../components';
import { ErrorDisplay } from '../../../shared/components';
import { useDebounce } from '../../../shared/hooks';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { setCurrentPage, setPageSize, setSearchQuery } from '../store';

const { Title } = Typography;

export function UserListPage() {
  const dispatch = useAppDispatch();
  const { searchQuery, currentPage, pageSize } = useAppSelector((state) => state.users);
  const [inputValue, setInputValue] = useState(searchQuery);

  const debouncedSearch = useDebounce(inputValue, 400);

  useEffect(() => {
    if (debouncedSearch !== searchQuery) {
      dispatch(setSearchQuery(debouncedSearch));
    }
  }, [debouncedSearch, searchQuery, dispatch]);

  const skip = (currentPage - 1) * pageSize;
  const { data, isLoading, isFetching, isError, error, refetch } = useUsers(pageSize, skip, searchQuery);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
  };

  const handlePageChange = (page: number, size: number) => {
    if (size !== pageSize) {
      dispatch(setPageSize(size));
    } else {
      dispatch(setCurrentPage(page));
    }
  };

  if (isError) {
    return (
      <ErrorDisplay
        title="Error al cargar usuarios"
        message={error instanceof Error ? error.message : 'Error desconocido'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="user-list-page">
      <div className="user-list-page__header">
        <Title level={2}>
          <TeamOutlined /> Usuarios
        </Title>
        <p className="user-list-page__subtitle">
          Gestión de usuarios del sistema
        </p>
      </div>

      <div className="user-list-page__search">
        <UserSearch
          value={inputValue}
          onChange={handleSearchChange}
          loading={isFetching && !!searchQuery}
        />
      </div>

      <UserTable
        users={data?.users ?? []}
        total={data?.total ?? 0}
        currentPage={currentPage}
        pageSize={pageSize}
        loading={isLoading || isFetching}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
