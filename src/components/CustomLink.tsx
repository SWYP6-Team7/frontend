import useViewTransition from '@/hooks/useViewTransition'
import React from 'react'
import { Link, LinkProps as RouterLinkProps } from 'react-router-dom'

type CustomLinkProps = RouterLinkProps & {
  children: React.ReactNode
}

const CustomLink = ({ to, children, ...props }: CustomLinkProps) => {
  const navigateWithTransition = useViewTransition()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    document.documentElement.style.viewTransitionName = 'forward'
    navigateWithTransition(to)
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      {...props}>
      {children}
    </Link>
  )
}

export default CustomLink
