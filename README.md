# 🖥️ 간단한 얼굴 인증 서비스 시뮬레이션

## 📖 프로젝트 소개
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/1a503599-3d1f-4e87-9d2c-c794ab59ea3f" height="400"><br>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/c2621f98-ab1e-4c54-b410-bd2576b6e6fd" height="400"><br>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/477a6836-fb58-4278-8aa8-36f477574281" height="400"><br>
    </td>
  </tr>
</table>

이 프로젝트는 오프라인 행사장에서 태블릿 PC를 통해 방문객이 얼굴 인식으로 간편하게 로그인하는 시나리오를 시뮬레이션합니다.

사용자는 모바일 앱을 통해 미리 계정을 생성하고 얼굴을 등록합니다. 이후 웹 키오스크에서 얼굴 인식을 통해 간편하게 로그인할 수 있습니다.

### 🛠 프로젝트 구조
```
📁 <project-root>
├── core-server/         # Express 백엔드 (API, DB 관리)
│   ├── prisma/          # DB 스키마 및 마이그레이션
│   └── src/             # 비즈니스 로직
├── ai-server/           # FastAPI AI 서버 (얼굴 인식 모델)
├── web-client/          # React 웹 클라이언트 (키오스크 UI)
└── app-client/          # React Native 앱 (사용자 등록)
```

| 서비스            | 역할                              | 기술 스택                                                                                                                                                                                                                          |
|----------------| ------------------------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **core-server** | 사용자 데이터 및 인증 관리 (Backend) | ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white) |
| **ai-server**  | 얼굴 인식 및 임베딩 벡터 추출 (AI)          | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi\&logoColor=white)                                                                                                                     |
| **web-client** | 얼굴 인증 로그인 키오스크 (Web)       | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)                                                                                                                           |
| **app-client** | 사용자 등록 및 얼굴 등록 (Mobile)         | ![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)                                                                                                             |

## 🏁 시작 가이드

### 📋 필수 요구사항

각 소프트웨어는 LTS 버전 사용을 권장합니다.

- Node.js
- Python
- PostgreSQL
- Yarn

### 1\. 루트 의존성 설치

프로젝트 최상위 경로에서 공통 의존성을 설치합니다.

```bash
yarn install
```

### 2\. 네트워크 환경 설정 (중요 ⚠️)

이 프로젝트는 얼굴 인식 및 카메라 접근을 위해 **HTTPS(SSL)** 환경이 필수입니다. 자체 서명 인증서를 사용하므로 `localhost`가 아닌 **실제 로컬 IP 주소**를 사용해야 합니다.

**나의 로컬 IP 확인하기:**

```bash
# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows (PowerShell)
ipconfig | findstr IPv4
```

### 3\. SSL 인증서 발급

로컬 개발 환경에서의 HTTPS 통신을 위해 `mkcert`로 인증서를 생성합니다.

#### 1) mkcert 설치 및 인증서 생성

**macOS**

```bash
mkdir cert && cd cert

# mkcert 설치
brew install mkcert
brew install nss # Firefox 사용자용

# 인증서 생성 (192.168.0.10을 본인의 실제 IP로 변경 필수)
mkcert -install
mkcert localhost 127.0.0.1 ::1 192.168.0.10

# 파일명 변경
mv localhost+3.pem localhost.pem
mv localhost+3-key.pem localhost-key.pem
cd ..
```

**Windows (PowerShell)**

```powershell
mkdir cert; cd cert

# mkcert 설치 (Chocolatey 사용 시)
choco install mkcert
# 또는 Scoop 사용 시: scoop install mkcert

# 인증서 생성 (192.168.0.10을 본인의 실제 IP로 변경 필수)
mkcert -install
mkcert localhost 127.0.0.1 ::1 192.168.0.10

# 파일명 변경
Move-Item localhost+3.pem localhost.pem
Move-Item localhost+3-key.pem localhost-key.pem
cd ..
```

#### 2) 기기에 루트 CA 인증서 설치 (필수)

모바일 기기 및 시뮬레이터가 자체 서명된 인증서를 신뢰하도록 설정해야 합니다.

1.  **CA 서버 실행:** 터미널에서 아래 명령어로 파일 서버를 엽니다.
    ```bash
    # macOS
    cd "$(mkcert -CAROOT)" && python3 -m http.server 8080

    # Windows
    cd (mkcert -CAROOT); python -m http.server 8080
    ```
2.  **기기에서 인증서 다운로드:** 모바일 브라우저에서 `http://<로컬 IP 주소>:8080/rootCA.pem`에 접속합니다.

**iOS 설정**

- 다운로드 프롬프트에서 "허용" 선택
- **설정 \> 일반 \> VPN 및 기기 관리**에서 다운로드된 프로파일 **설치**
- **설정 \> 일반 \> 정보 \> 인증서 신뢰 설정**에서 mkcert 루트 CA **활성화**

**Android 설정**

- **설정 \> 보안 \> 암호화 및 자격 증명 \> 인증서 설치 \> CA 인증서**
- 다운로드한 `rootCA.pem` 파일 선택하여 설치

> ✅ 설정이 완료되면 실행했던 Python 파일 서버는 종료해도 됩니다.

### 4\. 데이터베이스 및 환경 변수 설정

#### 데이터베이스 생성

```bash
# macOS
createdb face_recognition_db

# Windows
psql -U postgres -c "CREATE DATABASE face_recognition_db;"
```

#### 환경 변수 설정

각 디렉토리에 `.env` 파일을 생성합니다.

> ⚠️ **아래 예시의 `192.168.0.10` 부분을 반드시 본인의 실제 로컬 IP로 변경해야 합니다.**

**📄 루트 환경 변수 (`.env`)**

```env
HOST_IP=192.168.0.10
CORE_SERVER_PORT=3000
AI_SERVER_PORT=8000
WEB_CLIENT_PORT=5173
```

**📄 백엔드 환경 변수 (`core-server/.env`)**

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/face_recognition_db?schema=public"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN=604800
```

#### 마이그레이션 적용

```bash
cd core-server
yarn prisma:generate
yarn prisma:migrate
```

### 5\. AI 서버 설정

Python 가상환경을 구성하고 의존성을 설치합니다.

**macOS**

```bash
cd ai-server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Windows**

```powershell
cd ai-server
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 🚀 서버 실행

각각의 터미널 탭을 열어 서비스를 실행합니다.

**1️⃣ Core Server**

```bash
cd core-server
yarn dev
```

**2️⃣ AI Server**

```bash
cd ai-server
# 가상환경 활성화 후 (macOS: source venv/bin/activate, Win: .\venv\Scripts\Activate.ps1)
python -m app.main
```

**3️⃣ Web Client**

```bash
cd web-client
yarn dev --host
```

**4️⃣ App Client (Mobile)**

> 💡 React Native 프로젝트를 실행하기 위해서는 개발 환경이 사전에 올바르게 설정되어 있어야 합니다. 자세한 사항은 [React Native 공식 문서](https://reactnative.dev/docs/environment-setup)를 참고해 주세요.

App Client는 Metro Bundler를 별도 터미널에서 실행해야 합니다.

```bash
# 터미널 1 — Metro Bundler
cd app-client
yarn start
```

```bash
# 터미널 2 — iOS 또는 Android 실행
# iOS (macOS Only)
yarn ios

# Android
yarn android
```

## 🖥️ 사용 시나리오

### 1) 모바일 앱

1.  **회원가입:** `app-client`를 실행하여 계정을 생성합니다.
2.  **얼굴 등록:** 로그인 시 사용할 얼굴 사진을 등록합니다.

### 2) 웹 클라이언트

1.  웹 브라우저에서 `https://<로컬 IP 주소>:5173`에 접속합니다.
2.  **얼굴 인증 로그인:** 카메라 권한을 허용하고 얼굴 인증을 통해 로그인합니다.

## ⚠️ 문제 해결 가이드

### 🔒 SSL/인증서 오류

- 인증서가 **올바른 도메인/IP(SAN)** 으로 발급되었는지 확인해 주세요.
- 접속 주소가 인증서에 **정확히 포함**되어 있는지 점검해 주세요.
- **루트 CA 인증서**가 기기에 설치되고 '신뢰' 설정이 켜져 있는지 다시 확인해 주세요.

### 📡 네트워크 연결 실패

- 모든 기기가 **동일한 Wi-Fi**에 연결되어 있는지 확인해 주세요.
- 포트 `3000`, `5173`, `8000`이 방화벽에서 **허용되어 있는지** 확인해 주세요.
- **IP 주소가 변경된 경우**, 인증서와 `.env`의 주소 값을 갱신해 주세요.

### 📱 React Native 빌드 오류

- Metro 캐시 초기화

  ```bash
  yarn start --reset-cache
  ```
- 모듈 재설치

  ```bash
  rm -rf node_modules
  yarn install
  ```
- (iOS) Pod 재설치

  ```bash
  cd ios && pod install
  ```
