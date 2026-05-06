// shared/components/AppLayout.tsx

import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export function AppLayout() {
  const navigate = useNavigate();

  return (
    <Layout className="app-layout">
      <Header className="app-layout__header">
        <div
          className="app-layout__logo"
          onClick={() => navigate('/users')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/users')}
        >
          <TeamOutlined className="app-layout__logo-icon" />
          <Title level={4} className="app-layout__logo-text">
            Kala Users
          </Title>
        </div>
      </Header>
      <Content className="app-layout__content">
        <div className="app-layout__container">
          <Outlet />
        </div>
      </Content>
      <Footer className="app-layout__footer">
        Kala Users © {new Date().getFullYear()} — Challenge Frontend
      </Footer>
    </Layout>
  );
}
