// features/users/components/UserForm/columns.tsx

import { Avatar, Tag, Space, Button, Tooltip } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { NavigateFunction } from 'react-router-dom';
import type { User } from '../../types';

export function getUserTableColumns(
  navigate: NavigateFunction
): ColumnsType<User> {
  return [
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
      width: 60,
      render: (image: string) => (
        <Avatar
          src={image}
          icon={<UserOutlined />}
          size={40}
        />
      ),
    },
    {
      title: 'Nombre',
      key: 'name',
      sorter: (a, b) =>
        a.firstName.localeCompare(b.firstName),
      render: (_, record) => (
        <span className="user-table__name">
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      responsive: ['md'],
    },
    {
      title: 'Edad',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      sorter: (a, b) => a.age - b.age,
      responsive: ['sm'],
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['lg'],
    },
    {
      title: 'Empresa',
      key: 'company',
      responsive: ['xl'],
      render: (_, record) =>
        record.company?.name ? (
          <Tag color="blue">
            {record.company.name}
          </Tag>
        ) : (
          '—'
        ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Ver detalle">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/users/${record.id}`);
              }}
              aria-label={`Ver detalle de ${record.firstName} ${record.lastName}`}
            />
          </Tooltip>

          <Tooltip title="Editar">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/users/${record.id}/edit`);
              }}
              aria-label={`Editar ${record.firstName} ${record.lastName}`}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
}