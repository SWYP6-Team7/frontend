import PersonIcon from '@/components/icons/PersonIcon'
import { createTripStore } from '@/store/client/createTripStore'
import React, { useState, useEffect, useRef } from 'react'
import Picker from 'react-mobile-picker'

const date = new Date()
const year: number = date.getFullYear()
const month: number = date.getMonth() + 1
const day = date.getDate()

// 윤년을 확인하는 함수
const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// 각 달의 최대 일수 계산 함수
const getMaxDays = (year: number, month: number) => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31
}

interface DateValue {
  year: number
  month: number
  day: number
}
interface Props {
  duedate: { year: number; month: number; day: number }
  setDuedate: React.Dispatch<React.SetStateAction<DateValue>>
}

const DuedatePickerView = ({ duedate, setDuedate }: Props) => {
  const pickerRef = useRef<HTMLDivElement>(null)
  const { addDueDate } = createTripStore()
  const [value, setValue] = useState(duedate)
  const [dayOptions, setDayOptions] = useState(
    Array.from({ length: 31 }, (v, i) => i + 1)
  )

  // 현재 날짜
  const today: DateValue = { year, month, day }

  // year 또는 month가 변경되면 해당 달에 맞는 day 배열 업데이트
  useEffect(() => {
    const maxDays = getMaxDays(value.year, value.month)
    setDayOptions(Array.from({ length: maxDays }, (v, i) => i + 1))

    // 선택된 day가 현재 달의 최대 일수를 넘으면 day를 최대값으로 설정
    if (value.day > maxDays) {
      setValue(prevValue => ({ ...prevValue, day: maxDays }))
    }
  }, [value.year, value.month])

  // 날짜가 변경될 때마다 현재 날짜와 비교하여 이전 날짜를 선택하면 일정 시간 후 오늘 날짜로 되돌림
  useEffect(() => {
    setDuedate(value)
    addDueDate(`${value.year}-${value.month}-${value.day}`)
    const selectedDate = new Date(value.year, value.month - 1, value.day)
    const todayDate = new Date(today.year, today.month - 1, today.day)

    // 선택한 날짜가 오늘보다 이전이면 일정 시간 후에 오늘 날짜로 다시 설정
    if (selectedDate < todayDate) {
      setTimeout(() => {
        setValue(today)
      }, 500) // 1초 후에 오늘 날짜로 되돌아오게 함
    }
  }, [value])

  const selections: { [key: string]: number[] | string[] } = {
    year: Array.from({ length: 12 }, (v, i) => i + Number(year)),
    month: Array.from({ length: 12 }, (v, i) => i + 1),
    day: dayOptions
  }
  useEffect(() => {
    // 라이브러리 사용으로, 커스텀 디자인을 위해 만드는 부분.
    // 위 아래 자동으로 생기는 회색 선을 없애고, 디자인 시안대로 구현.
    if (pickerRef.current) {
      const divs = pickerRef.current.querySelector('div')
      const lastDiv = divs?.lastChild as HTMLDivElement

      if (lastDiv) {
        const childDivs = lastDiv.querySelectorAll('div')

        childDivs.forEach(div => {
          div.style.background = 'none'
          div.style.display = 'flex'
          div.style.justifyContent = 'space-between'
          // 3개의 새로운 div를 만들고 추가
          const numDivs = 3
          for (let i = 0; i < numDivs; i++) {
            const newDiv = document.createElement('div')
            newDiv.style.width = '31%' // 가로로 3등분
            newDiv.style.height = '1px' // 높이를 1px로 설정
            newDiv.style.background = 'black' // 검은색 border 역할
            newDiv.style.display = 'inline-block' // 가로로 배치
            newDiv.style.margin = '0' // 마진 제거

            div.appendChild(newDiv)
          }
        })
      }
    }
  }, [])

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center' }}
      ref={pickerRef}>
      <Picker
        value={value}
        onChange={setValue}
        wheelMode="natural"
        className="custom-picker"
        itemHeight={50.3} // 각 항목의 높이 설정
        height={160} // 3개의 항목만 보이도록 전체 높이 설정
      >
        {Object.keys(selections).map(date => (
          <Picker.Column
            key={date}
            name={date}>
            {selections[date].map(option => (
              <Picker.Item
                key={option}
                value={option}>
                {({ selected }) => (
                  <div
                    style={{
                      color: selected ? 'black' : '#CDCDCD',
                      //   backgroundColor: selected ? '#d9d9d9' : 'white',
                      padding: '13.5px 18.5px',

                      width: '80px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                      //   borderTop: selected ? '1px solid black' : 'none',
                      //   borderBottom: selected ? '1px solid black' : 'none'
                    }}>
                    {option}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
    </div>
  )
}

export default DuedatePickerView
