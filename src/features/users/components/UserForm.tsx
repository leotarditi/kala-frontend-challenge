// features/users/components/UserForm.tsx

import { Form, Input, InputNumber, Button, Row, Col, DatePicker } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import type { User, UserFormData } from '../types';

interface UserFormProps {
  user: User;
  onSubmit: (data: Partial<UserFormData>) => void;
  loading?: boolean;
}

export function UserForm({ user, onSubmit, loading }: UserFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    age: user.age,
    username: user.username,
    birthDate: user.birthDate ? dayjs(user.birthDate) : undefined,
    university: user.university,
    'company.name': user.company?.name,
    'company.department': user.company?.department,
    'company.title': user.company?.title,
    'address.address': user.address?.address,
    'address.city': user.address?.city,
    'address.state': user.address?.state,
    'address.postalCode': user.address?.postalCode,
    'address.country': user.address?.country,
  };

  const handleFinish = (values: Record<string, unknown>) => {
    const formData: Partial<UserFormData> = {
      firstName: values.firstName as string,
      lastName: values.lastName as string,
      email: values.email as string,
      phone: values.phone as string,
      age: values.age as number,
      username: values.username as string,
      birthDate: values.birthDate ? (values.birthDate as dayjs.Dayjs).format('YYYY-MM-DD') : undefined,
      university: values.university as string,
      company: {
        name: values['company.name'] as string,
        department: values['company.department'] as string,
        title: values['company.title'] as string,
      },
      address: {
        address: values['address.address'] as string,
        city: values['address.city'] as string,
        state: values['address.state'] as string,
        postalCode: values['address.postalCode'] as string,
        country: values['address.country'] as string,
      },
    };

    onSubmit(formData);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      className="user-form"
      scrollToFirstError
    >
      <h3 className="user-form__section-title">Información Personal</h3>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="firstName"
            label="Nombre"
            rules={[
              { required: true, message: 'El nombre es obligatorio' },
              { min: 2, message: 'Mínimo 2 caracteres' },
              { max: 50, message: 'Máximo 50 caracteres' },
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="lastName"
            label="Apellido"
            rules={[
              { required: true, message: 'El apellido es obligatorio' },
              { min: 2, message: 'Mínimo 2 caracteres' },
              { max: 50, message: 'Máximo 50 caracteres' },
            ]}
          >
            <Input placeholder="Apellido" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'El email es obligatorio' },
              { type: 'email', message: 'Ingresá un email válido' },
            ]}
          >
            <Input placeholder="email@ejemplo.com" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="phone"
            label="Teléfono"
            rules={[
              { required: true, message: 'El teléfono es obligatorio' },
              {
                pattern: /^[+]?[\d\s()-]{7,20}$/,
                message: 'Ingresá un teléfono válido',
              },
            ]}
          >
            <Input placeholder="+1 234-567-8900" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="age"
            label="Edad"
            rules={[
              { required: true, message: 'La edad es obligatoria' },
              { type: 'number', min: 1, max: 120, message: 'Edad entre 1 y 120' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={120} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'El username es obligatorio' },
              { min: 3, message: 'Mínimo 3 caracteres' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Solo letras, números y guiones bajos' },
            ]}
          >
            <Input placeholder="username" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name="birthDate" label="Fecha de nacimiento">
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder="Seleccionar fecha"
              disabledDate={(current) => current && current > dayjs()}
            />
          </Form.Item>
        </Col>
      </Row>

      <h3 className="user-form__section-title">Educación y Trabajo</h3>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item name="university" label="Universidad">
            <Input placeholder="Universidad" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="company.name" label="Empresa">
            <Input placeholder="Nombre de empresa" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="company.department" label="Departamento">
            <Input placeholder="Departamento" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item name="company.title" label="Cargo">
            <Input placeholder="Cargo" />
          </Form.Item>
        </Col>
      </Row>

      <h3 className="user-form__section-title">Dirección</h3>
      <Row gutter={[16, 0]}>
        <Col xs={24}>
          <Form.Item name="address.address" label="Dirección">
            <Input placeholder="Calle y número" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name="address.city" label="Ciudad">
            <Input placeholder="Ciudad" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name="address.state" label="Estado/Provincia">
            <Input placeholder="Estado" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={8}>
          <Form.Item name="address.postalCode" label="Código Postal">
            <Input placeholder="Código postal" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className="user-form__actions">
        <Row gutter={12} justify="end">
          <Col>
            <Button icon={<CloseOutlined />} onClick={() => navigate(-1)}>
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Guardar cambios
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
}
