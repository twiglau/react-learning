import classNames from 'classnames'
import { PoweroffOutlined } from '@ant-design/icons';
import { Button, Space, DatePicker } from 'antd';
import React, { useState } from 'react';
import moment from 'moment'
import HomeRecommend from 'components/home/childCpns/home-recommend'
const App = () => {
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  
  return (
    <>
      <HomeRecommend />
      <Space
        style={{
          width: '100%',
        }}
      >
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading />
      </Space>

      <Space
        style={{
          width: '100%',
        }}
      >
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[1]}
          onClick={() => enterLoading(1)}
        >
          Click me!
        </Button>
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          loading={loadings[2]}
          onClick={() => enterLoading(2)}
        />
         <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} format={'YYYY/MM/DD'} />
      </Space>
    </>
  );
};
export default App;

