// Dashboard/AccountPlans.jsx
import React, { useState } from 'react';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const plans = [
  {
    id: 1,
    name: 'Di động',
    price: '70.000 ₫',
    resolution: '480p',
    quality: 'Khá',
    devices: 'Điện thoại di động, máy tính bảng',
    maxDevices: 1,
    downloads: 1,
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    name: 'Cơ bản',
    price: '108.000 ₫',
    resolution: '720p (HD)',
    quality: 'Tốt',
    devices: 'TV, máy tính, điện thoại di động, máy tính bảng',
    maxDevices: 1,
    downloads: 1,
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 3,
    name: 'Tiêu chuẩn',
    price: '220.000 ₫',
    resolution: '1080p (Full HD)',
    quality: 'Tuyệt vời',
    devices: 'TV, máy tính, điện thoại di động, máy tính bảng',
    maxDevices: 2,
    downloads: 2,
    gradient: 'from-pink-500 to-purple-700'
  },
  {
    id: 4,
    name: 'Cao cấp',
    price: '260.000 ₫',
    resolution: '4K (Ultra HD) + HDR',
    quality: 'Tốt nhất',
    devices: 'TV, máy tính, điện thoại di động, máy tính bảng',
    maxDevices: 4,
    downloads: 6,
    gradient: 'from-red-500 to-blue-900'
  }
];

function AccountPlans() {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    if (selectedPlanId === id) {
      setSelectedPlanId(null);  // Deselect if the same plan is clicked twice
    } else {
      setSelectedPlanId(id);
    }
  };

  const handleContinue = () => {
    const selectedPlan = plans.find(p => p.id === selectedPlanId);
    if (!selectedPlan) {
      alert('Vui lòng chọn một gói trước khi tiếp tục.');
      return;
    }
    alert(`Bạn đã chọn gói ${selectedPlan.name}. Chuyển đến trang thanh toán...`);
    // navigate('/payment');
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6 font-sans">
        <h2 className="text-xl font-bold">Chọn gói dịch vụ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(plan => (
            <div
              key={plan.id}
              onClick={() => handleSelect(plan.id)}
              onDoubleClick={() => handleSelect(plan.id)}  // Add double-click functionality
              className={`cursor-pointer border rounded-lg bg-gray-800 text-white transition-all duration-200 overflow-hidden shadow-lg 
                ${selectedPlanId === plan.id 
                  ? 'border-blue-500 ring-2 ring-blue-500' 
                  : 'border-gray-700 hover:border-gray-500'}`}
            >
              <div className={`relative p-3 text-white text-center font-semibold bg-gradient-to-r ${plan.gradient}`}>
                <h3 className="text-2xl">{plan.name}</h3> {/* Increased font size for titles */}
                <div className="text-sm font-light opacity-90">{plan.resolution}</div>
                {selectedPlanId === plan.id && (
                  <CheckCircleIcon className="w-6 h-6 text-white absolute top-2 right-2" />
                )}
              </div>
              <div className="divide-y divide-gray-600">
                <div className="p-4">
                  <p className="text-lg font-bold">{plan.price}/tháng</p>
                </div>
                <div className="text-sm">
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-gray-300">Chất lượng hình và âm</p>
                    <p className="text-white font-semibold">{plan.quality}</p>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-gray-300">Độ phân giải</p>
                    <p className="text-white font-semibold">{plan.resolution}</p>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-gray-300">Thiết bị hỗ trợ</p>
                    <p className="text-white font-semibold">{plan.devices}</p>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-gray-300">Số thiết bị có thể xem cùng lúc</p>
                    <p className="text-white font-semibold">{plan.maxDevices}</p>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-gray-300">Số thiết bị được tải xuống</p>
                    <p className="text-white font-semibold">{plan.downloads}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedPlanId}
            className={`w-[300px] py-3 mt-6 rounded text-white font-semibold transition
              ${selectedPlanId ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default AccountPlans;
