import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import OrderTable from '../components/OrderTable';

const { Content } = Layout;

const AssistantPage = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* <Sidebar selectedKey={selectedKey} onSelect={handleSelectMenu} /> */}
            <Layout>
                <Header />

                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        <h1
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: '40px',
                                fontFamily: 'Arial, sans-serif',
                                textTransform: 'uppercase',
                            }}
                        >
                            Order Management
                        </h1>
                        <OrderTable />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AssistantPage;
