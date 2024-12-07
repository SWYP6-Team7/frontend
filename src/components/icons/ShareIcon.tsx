import { CopyToClipboard } from 'react-copy-to-clipboard'
import ResultToast from '../designSystem/toastMessage/resultToast'
import { useState } from 'react'

interface ShareIconProps {
  width?: number
  height?: number
}

export default function ShareIcon({ width = 16, height = 20 }: ShareIconProps) {
  const [isToastShow, setIsToastShow] = useState(false) // 삭제 완료 메시지.

  return (
    <CopyToClipboard
      text={`${window.location.href}?share=true`}
      onCopy={() => setIsToastShow(true)}>
      <button>
        <svg
          width={width}
          height={height}
          viewBox="0 0 18 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 11V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V11"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 5L9 1L5 5"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 1V14"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ResultToast
        bottom="80px"
        isShow={isToastShow}
        setIsShow={setIsToastShow}
        text="댓글이 삭제되었어요."
      />
    </CopyToClipboard>
  )
}
