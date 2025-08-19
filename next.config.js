/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker 배포를 위한 standalone 출력
  output: 'standalone',
  
  // 실험적 기능 활성화 (Next.js 15.4.7에 맞게 수정)
  experimental: {
    // Docker 환경에서 최적화
  },
  
  // 이미지 최적화 설정
  images: {
    unoptimized: true, // Docker 환경에서 이미지 최적화 비활성화
  },
  
  // 환경변수 설정
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // ESLint 설정 (빌드 시 검사 완화)
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 검사 건너뛰기
  },
  
  // 리다이렉트 설정
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
