'use client'
import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { palette } from '@/styles/palette'

interface NavItemProps {
  url: string
  Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>
  text: string
}

export default function NavItem({ url, Icon, text }: NavItemProps) {
  const pathname = usePathname()
  const isURLMatched = pathname === url

  return (
    <Link href={url}>
      <Icon
        stroke={isURLMatched ? palette.기본 : palette.비강조3}
        fill={isURLMatched ? palette.기본 : palette.비강조3}
      />
      <p>{text}</p>
    </Link>
  )
}
