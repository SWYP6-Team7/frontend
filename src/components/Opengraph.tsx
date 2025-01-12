'use client'
import { Helmet } from 'react-helmet-async'

interface OpengraphProps {
  title: string
  description: string
  image: string
  url?: string
}

const Opengraph = ({ title, description, image, url }: OpengraphProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={image}
      />
      <meta
        name="keywords"
        content={`${title}`}
      />
      {url && (
        <meta
          property="og:url"
          content={url}
        />
      )}
    </Helmet>
  )
}

export default Opengraph
