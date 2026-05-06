// shared/components/ErrorDisplay.tsx

import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ErrorDisplayProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  title = 'Error',
  message = 'Ocurrió un error inesperado. Por favor, intentá de nuevo.',
  onRetry,
}: ErrorDisplayProps) {
  const navigate = useNavigate();

  return (
    <Result
      status="error"
      title={title}
      subTitle={message}
      extra={[
        onRetry && (
          <Button type="primary" key="retry" onClick={onRetry}>
            Reintentar
          </Button>
        ),
        <Button key="back" onClick={() => navigate(-1)}>
          Volver
        </Button>,
      ].filter(Boolean)}
    />
  );
}
