# Nwitter

## 🖇 Link

- 기능 사용해 보러 고고! ➔ [✨ Website URL ✨](https://joie-kim.github.io/Nwitter/#/)

<br>

## ⛳️ Purpose

- React를 다양한 방식으로 활용 해보기

<br>

## 💡 About

### Subject

- 트위터의 기능을 직접 구현해 보는 클론 프로젝트

### Features

1. User (회원 관리)

   `Firebase의 Authentication 기능을 사용했습니다.`

   - Email 계정 만들기
   - Email 계정으로 로그인
   - Social 계정으로 로그인 (Google, Github)
   - 로그아웃

2. Profile (프로필 관리)

   - 프로필명 변경

3. Post (트윗 관리)

   `DB 역할을 하는 NoSQL 기반의 Firebase의 Cloude Firestore 기능을 사용했습니다.`

   - 게시글 CRUD
     - Create && Read : 로그인한 사용자만 할 수 있음
     - Update && Delete : 게시글의 작성자만 할 수 있음

   `이미지 파일 저장을 위해 Firebase의 Storage 기능을 사용했습니다.`

   - 이미지 파일 업로드 및 미리보기
   - 게시글에 포함된 이미지 보여주기

4. Etc

   `react-router-dom 모듈을 사용했습니다.`

   - Routing을 통한 SPA 구현

<br>

## 🧑‍💻 Skills

### Programming

- React.js
- Firebase (Authentication / Cloude Firestore / Storage)
- CSS

### Deploy

`gh-pages 모듈을 사용했습니다.`

- github 호스팅

<br>

## 🚗 How to run

- 로컬에서 구동시키고 싶다면 아래와 같이 하세요.
- **npm** 대신 **yarn**을 사용할 수 있습니다.

```bash
# Install the dependancies
npm install

# Start the project
npm start
```
