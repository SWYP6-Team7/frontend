import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(updateLocale)
dayjs.extend(utc)

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
  const now = dayjs().utcOffset(9)
  const inputDate = dayjs.utc(date).utcOffset(9) // locale utc 변환해보기

  const diffInMinutes = now.diff(inputDate, 'minute')
  const diffInHours = now.diff(inputDate, 'hour')
  const diffInDays = now.diff(inputDate, 'day')

  if (diffInMinutes < 60) {
    return inputDate.fromNow()
  } else if (diffInHours < 24) {
    return inputDate.fromNow()
  } else if (diffInDays === 1) {
    return '어제'
  } else {
    return inputDate.fromNow()
  }
}

export function daysLeft(dateString: string) {
  const today = dayjs().utcOffset(9).toDate()
  const targetDate = dayjs.utc(dateString).utcOffset(9).toDate()
  const timeDifference = targetDate.getTime() - today.getTime()
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}

export function daysAgo(date: string) {
  const now = dayjs().utcOffset(9)
  const inputDate = dayjs.utc(date).utcOffset(9)

  const diffInMinutes = now.diff(inputDate, 'minute')
  const diffInHours = now.diff(inputDate, 'hour')
  const diffInDays = now.diff(inputDate, 'day')

  if (diffInMinutes < 10) {
    return '지금'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  } else if (diffInDays === 1) {
    return '어제'
  } else {
    return `${diffInDays}일 전`
  }
}
