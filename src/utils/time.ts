import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

// 로케일 설정
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s 전',
    s: '지금',
    m: '1분 ',
    mm: '%d분 ',
    h: '1시간 ',
    hh: '%d시간 ',
    d: '어제',
    dd: '%d일 ',
    M: '1달 전',
    MM: '%d달 ',
    y: '1년 ',
    yy: '%d년 '
  }
})

export function formatTime(date: string) {
  return dayjs(date).fromNow()
}

export function daysLeft(dateString: string) {
  const targetDate = dayjs(dateString)
  const today = dayjs()

  return targetDate.diff(today, 'day')
}

export function daysAgo(date: string) {
  return dayjs(date).fromNow()
}
