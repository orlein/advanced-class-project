import React from 'react';

const Tag = ({ tag }) => {
  return (
    <div>
      <div
        className={`px-[10px] rounded-xl text-white flex items-center justify-center ${tagColors[tag]}`}
        key={tag}
      >
        {tag}
      </div>
    </div>
  );
};
const tagColors = {
  운동: 'bg-[#ff5733]', // 빨간색 계열
  건강: 'bg-[#28b463]', // 초록색 계열
  챌린지: 'bg-[#f1c40f]', // 노란색 계열
  독서: 'bg-[#3498db]', // 파란색 계열
  자기계발: 'bg-[#9b59b6]', // 보라색 계열
  다이어트: 'bg-[#e67e22]', // 주황색 계열
  코딩: 'bg-[#2ecc71]', // 연두색 계열
  기술: 'bg-[#34495e]', // 어두운 회색 계열
  사진: 'bg-[#e74c3c]', // 진한 빨간색 계열
  예술: 'bg-[#8e44ad]', // 진한 보라색 계열
};
export default Tag;
