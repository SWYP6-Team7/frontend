import React from 'react'
import { Helmet } from 'react-helmet-async'

interface MetaTagProps {
  meta: { title: string; description: string; imgsrc: string; url: string }
}

const MetaTag = ({ meta }: MetaTagProps) => {
  return (
    <Helmet>
      <title>{meta.title}</title>

      <meta
        name="description"
        content={meta.description}
      />

      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:title"
        content={meta.title}
      />
      <meta
        property="og:site_name"
        content={meta.title}
      />
      <meta
        property="og:description"
        content={meta.description}
      />
      <meta
        property="og:image"
        content={`https://www.moing.shop${meta.imgsrc}`}
      />
      <meta
        property="og:url"
        content={meta.url}
      />

      <meta
        name="twitter:title"
        content={meta.title}
      />
      <meta
        name="twitter:description"
        content={meta.description}
      />
      <meta
        name="twitter:image"
        content={`https://www.moing.shop${meta.imgsrc}`}
      />
    </Helmet>
  )
}

export default MetaTag
