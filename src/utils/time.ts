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
  const now = dayjs()
  const inputDate = dayjs(date)

  // 현재 시간과의 차이를 계산
  const diffInMinutes = now.diff(inputDate, 'minute')
  const diffInHours = now.diff(inputDate, 'hour')
  const diffInDays = now.diff(inputDate, 'day')

  // 59분까지는 'x분 전'
  if (diffInMinutes < 60) {
    return inputDate.fromNow()
    // 1시간 이상 24시간 미만은 'x시간 전'
  } else if (diffInHours < 24) {
    return inputDate.fromNow()
    // 1일 차이는 '어제'
  } else if (diffInDays === 1) {
    return '어제'
    // 1일 초과 7일 이하는 'x일 전'
  } else if (diffInDays <= 7) {
    return inputDate.fromNow()
    // 그 외는 'yy.mm.dd'
  } else {
    return inputDate.format('YY.MM.DD')
  }
}

export function daysLeft(dateString: string) {
  // 오늘 날짜
  const today = new Date()

  // 주어진 날짜
  const targetDate = new Date(dateString)

  // 밀리초 단위로 차이 계산
  const timeDifference = targetDate.getTime() - today.getTime()

  // 밀리초를 일 수로 변환
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

  return daysDifference
}
