# UniMate-Webview

- UniMate Webview

### URL

- Test: https://test.unimate.site
- Prod: https://unimate.site

## Pipeline

- Test:
- Prod:

### 프로젝트 실행 방법

```bash
$ npm install

# eslint prettier option
$ npm run huskyinstall
```

mkcert를 이용해서 local.unimate.site 에 대한 인증서를 생성한다.

참고: https://github.com/FiloSottile/mkcert

```bash
$ mkcert -install
$ mkcert local.unimate.site
```

개발 기기의 dns 에 테스트도메인(local.unimate.site)을 추가한다.

```bash
$ sudo vi /etc/hosts
# 아래 라인을 추가
127.0.0.1       local.unimate.site
```

이후 아래의 명령어로 개발 서버 (https://local.unimate.site)를 실행시킨다.

```bash
$ npm run dev:local
```
