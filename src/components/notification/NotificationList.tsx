'use client'
import { INotification } from '@/model/notification'
import React from 'react'
import NotificationItem from './NotificationItem'
import styled from '@emotion/styled'

interface NotificationListProps {
  data: { pages: INotification[] }
}

const NotificationList = ({ data }: NotificationListProps) => {
  let newNotificationDivider = false
  let prevNotificationDivider = false

  return (
    <Container>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.content.map((item, itemIndex) => {
            const isFirstUnread = !newNotificationDivider && !item.isRead
            const isFirstRead = !prevNotificationDivider && item.isRead

            if (isFirstUnread) {
              newNotificationDivider = true
            }
            if (isFirstRead) {
              prevNotificationDivider = true
            }

            return (
              <div key={itemIndex}>
                {isFirstRead && <PrevNotification>지난 알림</PrevNotification>}
                {isFirstUnread && (
                  <NewNotification>새로운 알림</NewNotification>
                )}
                <ItemContaner>
                  <NotificationItem data={item} />
                </ItemContaner>
              </div>
            )
          })}
        </React.Fragment>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 0 24px;
`

const NewNotification = styled.div`
  margin-top: 8px;

  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
`

const PrevNotification = styled.div`
  margin-top: 40px;

  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
`
const ItemContaner = styled.div`
  padding-top: 16px;
`

export default NotificationList
