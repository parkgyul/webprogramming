# 기반이 되는 이미지를 선택합니다.
FROM --platform=linux/amd64 node:lts-alpine

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 의존성 설치를 위해 package.json 및 package-lock.json을 복사합니다.
COPY package*.json ./

# 의존성 설치를 실행합니다.
RUN npm install

# 소스 코드를 복사합니다.
COPY . .

# 앱을 빌드합니다.
RUN npm run build

# 앱을 실행합니다.
CMD ["npm", "start"]

RUN chmod +x /usr/local/bin/npm
