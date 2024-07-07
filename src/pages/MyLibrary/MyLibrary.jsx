import React, { useState } from 'react';
import './MyLibrary.css'; // Import the CSS file
import Created from '../../components/Library/Created';
import Favourite from '../../components/Library/Favourite';
import Joined from '../../components/Library/Joined';

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState('favorite');

  const renderContent = () => {
    switch (activeTab) {
      case 'favorite':
        return <Favourite />;
      case 'joined':
        return <Joined />;
      case 'created':
        return <Created />;
      default:
        return <div>Invalid tab</div>;
    }
  };

  return (
    <div className="container-fluid d-flex">
      <div className="sidebar">
        <a className="d-flex align-items-center p-3 pt-0 link-body-emphasis text-decoration-none">
          <span className="fs-5 fw-semibold">Thư viện của tôi</span>
        </a>
        <div className="list-group list-group-flush border-bottom scrollarea mt-0">
          <a
            className={`list-group-item py-3 ${activeTab === 'favorite' ? 'active-item' : ''}`}
            aria-current="true"
            onClick={() => setActiveTab('favorite')}
          >
            <i className="fa-solid fa-heart"></i>
            <span>Yêu thích</span>
          </a>
          <a
            className={`list-group-item py-3 ${activeTab === 'created' ? 'active-item' : ''}`}
            aria-current="true"
            onClick={() => setActiveTab('created')}
          >
            <i className="fa-solid fa-pen"></i>
            <span>Đã tạo</span>
          </a>
          <a
            className={`list-group-item py-3 ${activeTab === 'joined' ? 'active-item' : ''}`}
            aria-current="true"
            onClick={() => setActiveTab('joined')}
          >
            <i className="fa-solid fa-paper-plane"></i>
            <span>Đã tham gia</span>
          </a>
        </div>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyLibrary;
