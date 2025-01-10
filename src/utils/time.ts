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
    M: '1달',
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

export function daysAgoFormatted(date: string) {
  const format = 'YYYY년 MM월 DD일 HH시 mm분'
  const parsedDate = dayjs(date, format)

  return daysAgo(parsedDate.format('YYYY-MM-DD HH:mm'))
}
// 현재 시간을 2000-10-10 11:11 문자열로 반환.
export function getCurrentFormattedDate() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 참가 신청 목록을 조회한 최근 시간을 기록하는데 필요한 시간 변환 함수.
//현재 시간을 2000.10.10 11:11 문자열로 반환.
export function todayFormattedDate() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}:${minutes}`
}

// 새로 들어온 신청인지 확인하는 함수
export const isNewApply = (last: string, enrolledTime: string) => {
  // 문자열을 Date 객체로 변환
  const lastTime = new Date(last.replace('.', '-').replace('.', '-'))
  const enrolledAt = new Date(enrolledTime.replace('.', '-').replace('.', '-'))

  // 주어진 날짜가 현재 시간보다 이전인지 확인
  return lastTime < enrolledAt
}
