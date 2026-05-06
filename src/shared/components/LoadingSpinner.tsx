// shared/components/LoadingSpinner.tsx

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  tip?: string;
  fullPage?: boolean;
}

export function LoadingSpinner({ tip = 'Cargando...', fullPage = false }: LoadingSpinnerProps) {
  const spinner = (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} tip={tip}>
      <div style={{ minHeight: fullPage ? '60vh' : 200 }} />
    </Spin>
  );

  if (fullPage) {
    return (
      <div className="loading-spinner--full">
        {spinner}
      </div>
    );
  }

  return spinner;
}
