// features/pages/UserEditPage.tsx

import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useUser, useUpdateUser } from '../hooks';
import { UserForm } from '../components';
import { LoadingSpinner, ErrorDisplay } from '../../../shared/components';
import type { UserFormData } from '../types';

const { Title } = Typography;

export function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);

  const { data: user, isLoading, isError, error, refetch } = useUser(userId);
  const updateMutation = useUpdateUser(userId);

  const handleSubmit = (data: Partial<UserFormData>) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        message.success('Usuario actualizado correctamente');
        navigate(`/users/${userId}`);
      },
      onError: (err) => {
        message.error(
          err instanceof Error
            ? `Error: ${err.message}`
            : 'Error al actualizar el usuario'
        );
      },
    });
  };

  if (isLoading) {
    return <LoadingSpinner tip="Cargando usuario..." fullPage />;
  }

  if (isError || !user) {
    return (
      <ErrorDisplay
        title="Error al cargar el usuario"
        message={error instanceof Error ? error.message : 'No se encontró el usuario'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="user-edit-page">
      <div className="user-edit-page__header">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      </div>

      <Card className="user-edit-page__card">
        <Title level={3}>
          Editar: {user.firstName} {user.lastName}
        </Title>
        <UserForm
          user={user}
          onSubmit={handleSubmit}
          loading={updateMutation.isPending}
        />
      </Card>
    </div>
  );
}
