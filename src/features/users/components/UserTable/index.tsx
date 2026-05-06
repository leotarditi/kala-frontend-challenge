// features/users/components/UserForm/index.tsx

import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types';
import { getUserTableColumns } from './columns';

interface UserTableProps {
  users: User[];
  total: number;
  currentPage: number;
  pageSize: number;
  loading: boolean;
  onPageChange: (
    page: number,
    pageSize: number
  ) => void;
}

export function UserTable({
  users,
  total,
  currentPage,
  pageSize,
  loading,
  onPageChange,
}: UserTableProps) {
  const navigate = useNavigate();

  const columns = getUserTableColumns(navigate);

  return (
    <Table
      className="user-table"
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30'],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} de ${total} usuarios`,
        onChange: onPageChange,
        onShowSizeChange: onPageChange,
      }}
      locale={{
        emptyText: 'No se encontraron usuarios',
      }}
      scroll={{ x: 600 }}
      onRow={(record) => ({
        onClick: () =>
          navigate(`/users/${record.id}`),
        style: {
          cursor: 'pointer',
        },
      })}
    />
  );
}