import React, { FunctionComponent, ReactElement } from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import HomeIcon from './icons/HomeIcon'
import { palette } from '@/styles/palette'

interface NavItemProps {
  url: string
  Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
}

export default function NavItem({ url, Icon, text }: NavItemProps) {
  const isURLMatched = useMatch(url)

  return (
    <NavLink to={url}>
      <Icon
        stroke={isURLMatched ? `${palette.기본}` : `${palette.비강조3}`}
        fill={isURLMatched ? `${palette.기본}` : `${palette.비강조3}`}
      />
      <p>{text}</p>
    </NavLink>
  )
}
