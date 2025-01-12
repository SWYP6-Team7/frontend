/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  distDir: '.next',
  images: {
    domains: [] // 필요한 외부 이미지 도메인 추가
  }
}

module.exports = nextConfig
