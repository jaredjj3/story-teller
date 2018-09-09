import { Layout } from 'antd';
import * as React from 'react';
import { Content } from './Content';
import { Footer } from './Footer';
import { Header } from './Header';

export const App = () => (
  <Layout>
    <Header />
    <Content />
    <Footer />
  </Layout>
);
