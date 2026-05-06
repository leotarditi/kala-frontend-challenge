import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { store } from './app/store';
import { AppLayout } from './shared/components/AppLayout';
import { UserListPage, UserDetailPage, UserEditPage } from './features/users/pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={esES}
          theme={{
            token: {
              colorPrimary: '#4f46e5',
              borderRadius: 8,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            },
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/users" element={<UserListPage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
                <Route path="/users/:id/edit" element={<UserEditPage />} />
                <Route path="*" element={<Navigate to="/users" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
