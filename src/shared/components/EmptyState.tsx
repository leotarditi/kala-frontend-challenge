// shared/components/EmptyState.tsx

import { Empty } from 'antd';

interface EmptyStateProps {
  description?: string;
}

export function EmptyState({ description = 'No se encontraron resultados' }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <Empty description={description} />
    </div>
  );
}
