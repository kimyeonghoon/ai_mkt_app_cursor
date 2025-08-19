# 🐳 Docker Compose 배포 가이드

## 📋 개요

이 문서는 AI 마케팅 자동화 웹서비스를 Docker Compose를 사용하여 배포하는 방법을 설명합니다.

## 🚀 빠른 시작

### 1. 사전 요구사항

- Docker Desktop 설치
- Docker Compose 설치 (Docker Desktop에 포함됨)
- `.env.local` 파일에 OpenAI API 키 설정

### 2. 애플리케이션 실행

```bash
# 모든 서비스 시작 (백그라운드)
docker compose up -d

# 로그 확인
docker compose logs -f

# 특정 서비스 로그 확인
docker compose logs -f web
```

### 3. 애플리케이션 접속

- **웹 애플리케이션**: http://localhost:3000

## 🛠️ 개발 모드

### 코드 변경 시 자동 새로고침

```bash
# Watch 모드로 실행 (코드 변경 감지)
docker compose watch

# 또는 개발용 compose 파일 사용
docker compose -f compose.dev.yaml up
```

## 📁 파일 구조

```
ai_mkt_app/
├── compose.yaml          # Docker Compose 설정
├── Dockerfile            # Next.js 애플리케이션 빌드
├── .dockerignore         # Docker 빌드 제외 파일
├── next.config.js        # Next.js 설정 (Docker 최적화)
└── .env.local            # 환경변수 (OpenAI API 키 등)
```

## 🔧 서비스 구성

### Web Service (Next.js)
- **포트**: 3000
- **환경**: Production
- **헬스체크**: `/api/health` 엔드포인트
- **재시작**: `unless-stopped`
- **네트워크**: `ai_mkt_network`

## 🚀 배포 명령어

### 서비스 관리

```bash
# 서비스 시작
docker compose up -d

# 서비스 중지
docker compose down

# 서비스 재시작
docker compose restart

# 서비스 상태 확인
docker compose ps

# 서비스 로그 확인
docker compose logs
```

### 이미지 관리

```bash
# 이미지 빌드
docker compose build

# 이미지 강제 재빌드
docker compose build --no-cache

# 사용하지 않는 이미지 정리
docker image prune
```

### 볼륨 관리

```bash
# 볼륨 목록 확인
docker volume ls

# 사용하지 않는 볼륨 정리
docker volume prune
```

## 🔒 보안 설정

### 환경변수

```bash
# .env.local 파일 예시
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
```

### 네트워크 보안

- 웹 서비스는 `ai_mkt_network` 네트워크에서 실행
- 외부 접근은 웹 서비스(포트 3000)만 허용
- 내부 네트워크를 통한 안전한 통신

## 📊 모니터링

### 헬스체크

```bash
# 서비스 상태 확인
docker compose ps

# 헬스체크 로그 확인
docker compose logs web | grep healthcheck
```

### 리소스 사용량

```bash
# 컨테이너 리소스 사용량 확인
docker stats

# 웹 서비스 리소스 확인
docker stats web
```

## 🐛 문제 해결

### 일반적인 문제

#### 1. 포트 충돌
```bash
# 포트 사용 중인 프로세스 확인
netstat -tulpn | grep :3000

# Docker 컨테이너 중지
docker compose down
```

#### 2. 권한 문제
```bash
# 볼륨 권한 수정
sudo chown -R $USER:$USER ./data
```

#### 3. 메모리 부족
```bash
# Docker 메모리 제한 확인
docker system df

# 사용하지 않는 리소스 정리
docker system prune -a
```

### 로그 분석

```bash
# 에러 로그만 확인
docker compose logs web | grep ERROR

# 특정 시간대 로그 확인
docker compose logs --since="2024-01-01T00:00:00" web
```

## 🔄 업데이트

### 애플리케이션 업데이트

```bash
# 최신 코드로 빌드
git pull origin main

# 이미지 재빌드
docker compose build --no-cache

# 서비스 재시작
docker compose up -d
```

### 애플리케이션 데이터 관리

```bash
# 애플리케이션 로그 확인
docker compose logs web

# 컨테이너 내부 접근
docker compose exec web sh
```

## 📚 추가 리소스

- [Docker Compose 공식 문서](https://docs.docker.com/compose/)
- [Next.js Docker 배포 가이드](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

## 🤝 지원

문제가 발생하거나 질문이 있으시면 이슈를 등록해주세요.
