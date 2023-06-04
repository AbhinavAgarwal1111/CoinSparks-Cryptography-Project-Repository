import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">International Blockchain Data</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Inventory of Cryptocurrencies:" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Count of Cryptocurrency Exchanges:" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Value of Cryptocurrencies:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
        <Col span={12}><Statistic title="Total Value Traded in the Past 24 Hours:" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title="Total Markets Supporting Cryptocurrencies:" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Best Performing Cryptocurrencies Across the Globe</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Fresh Updates on Cryptocurrencies</Title>
        <Title level={3}><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;