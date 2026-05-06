// features/pages/UserDetailPage.tsx

import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Avatar,
  Tag,
  Button,
  Row,
  Col,
  Divider,
  Typography,
  Space,
} from 'antd';
import {
  EditOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BankOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { useUser } from '../hooks';
import { LoadingSpinner, ErrorDisplay } from '../../../shared/components';

const { Title, Text } = Typography;

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = Number(id);

  const { data: user, isLoading, isError, error, refetch } = useUser(userId);

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
    <div className="user-detail-page">
      <div className="user-detail-page__actions">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/users')}
        >
          Volver al listado
        </Button>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/users/${user.id}/edit`)}
        >
          Editar
        </Button>
      </div>

      <Card className="user-detail-page__card">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={6} className="user-detail-page__avatar-col">
            <Avatar src={user.image} size={120} icon={<UserOutlined />} />
          </Col>
          <Col xs={24} sm={18}>
            <Title level={3} style={{ marginBottom: 4 }}>
              {user.firstName} {user.lastName}
              {user.maidenName && <Text type="secondary"> ({user.maidenName})</Text>}
            </Title>
            <Space wrap>
              <Tag color="blue">@{user.username}</Tag>
              <Tag color="green">{user.role}</Tag>
              <Tag>{user.gender}</Tag>
              <Tag color="orange">{user.age} años</Tag>
            </Space>
          </Col>
        </Row>

        <Divider />

        <Title level={5}>
          <MailOutlined /> Contacto
        </Title>
        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Teléfono">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Fecha de nacimiento">{user.birthDate}</Descriptions.Item>
          <Descriptions.Item label="Grupo sanguíneo">{user.bloodGroup}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={5}>
          <HomeOutlined /> Dirección
        </Title>
        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
          <Descriptions.Item label="Dirección">{user.address?.address}</Descriptions.Item>
          <Descriptions.Item label="Ciudad">{user.address?.city}</Descriptions.Item>
          <Descriptions.Item label="Estado">{user.address?.state}</Descriptions.Item>
          <Descriptions.Item label="Código Postal">{user.address?.postalCode}</Descriptions.Item>
          <Descriptions.Item label="País">{user.address?.country}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={5}>
          <BankOutlined /> Trabajo
        </Title>
        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
          <Descriptions.Item label="Empresa">{user.company?.name || '—'}</Descriptions.Item>
          <Descriptions.Item label="Departamento">{user.company?.department || '—'}</Descriptions.Item>
          <Descriptions.Item label="Cargo">{user.company?.title || '—'}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={5}>
          <BookOutlined /> Educación
        </Title>
        <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
          <Descriptions.Item label="Universidad">{user.university || '—'}</Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={5}>Información adicional</Title>
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} bordered size="small">
          <Descriptions.Item label="Altura">{user.height} cm</Descriptions.Item>
          <Descriptions.Item label="Peso">{user.weight} kg</Descriptions.Item>
          <Descriptions.Item label="Color de ojos">{user.eyeColor}</Descriptions.Item>
          <Descriptions.Item label="Cabello">
            {user.hair?.color} - {user.hair?.type}
          </Descriptions.Item>
          <Descriptions.Item label="IP">{user.ip}</Descriptions.Item>
          <Descriptions.Item label="MAC">{user.macAddress}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
