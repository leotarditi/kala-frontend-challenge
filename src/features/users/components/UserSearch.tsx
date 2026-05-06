// features/users/components/UserSearch.tsx

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export function UserSearch({ value, onChange, loading }: UserSearchProps) {
  return (
    <Input
      className="user-search"
      placeholder="Buscar usuarios por nombre..."
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      size="large"
      loading={loading}
      aria-label="Buscar usuarios"
    />
  );
}
