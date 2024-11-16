import {
  Layout, theme, ConfigProvider,
} from 'antd';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'; 
import AuthRoutes from 'modules/auth';
import MediaRoutes from 'modules/mediaFiles';

const { Content } = Layout;

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
    >
      <Layout
        style={{
          padding: '0 8px 24px',
        }}
      >
        <Content
          style={{
            padding: 8,
            margin: 0,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Provider store={store}>
            <Router>
              <Routes>
                <Route path="/*" element={!isAuthenticated ? <AuthRoutes /> : <Navigate to="/media" />} />
                <Route
                  path="/media/*"
                  element={<MediaRoutes />}
                />
              </Routes>
            </Router>
          </Provider>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
