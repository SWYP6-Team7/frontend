import React, { useState } from 'react'
import Bookmark from './Bookmark'
import HostTrip from './HostTrip'
import ApplyTrip from './ApplyTrip'

export default function MyTrip() {
  const [activeTab, setActiveTab] = useState<string>('북마크') // 현재 선택된 탭을 상태로 관리

  const renderTabContent = () => {
    switch (activeTab) {
      case '북마크':
        return <Bookmark />
      case '만든 여행':
        return <HostTrip />
      case '참가한 여행':
        return <ApplyTrip />
      default:
        return null
    }
  }
  return (
    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button onClick={() => setActiveTab('북마크')}>북마크</button>
          <button onClick={() => setActiveTab('만든 여행')}>만든 여행</button>
          <button onClick={() => setActiveTab('참가한 여행')}>
            참가한 여행
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>{renderTabContent()}</div>
      </div>
    </div>
  )
}
