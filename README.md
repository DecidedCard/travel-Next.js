# 여행한탕 - Good Travel & Good Experience"

<p align="center">
  <img src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.5c17cd47.png&w=96&q=75" alt="logo">
</p>
<p align="center">
여행을 함께 즐기고 그 경험을 즐겁게 소통하는 커뮤니티
</p>

# 여행한탕 Web Page v0.1.0

> 내일배움캠프 React 4기 가현님 8방미인❤️<br/>
> 개발기간 : 2024.03.18 ~ 2024.03.22

## 🔗 배포주소

> 정식 배포 페이지 : https://kidnapped.vercel.app

## 🏃 웹개발팀 소개

|                              김현주                              |                              신서연                              |                              정해준                              |                              김형민                              |                              김경연                              |
| :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: | :--------------------------------------------------------------: |
| ![김현주](https://avatars.githubusercontent.com/u/154492235?v=4) | ![신서연](https://avatars.githubusercontent.com/u/128902050?v=4) | ![정해준](https://avatars.githubusercontent.com/u/152480392?v=4) | ![김형민](https://avatars.githubusercontent.com/u/153264541?v=4) | ![김경연](https://avatars.githubusercontent.com/u/105699149?v=4) |
|                [@HY965](https://github.com/HY965)                |         [@seoyeon-1206](https://github.com/seoyeon-1206)         |          [@DecidedCard](https://github.com/DecidedCard)          |              [@C1oudys](https://github.com/C1oudys)              |        [@KyeongyeonKim](https://github.com/KyeongyeonKim)        |
|                            Front-End                             |                            Front-End                             |                            Front-End                             |                            Front-End                             |                            Front-End                             |
|                               리더                               |                               팀원                               |                               팀원                               |                               팀원                               |                               팀원                               |

## 🚩 프로젝트 소개

여행한탕 - "여행한탕" 웹 서비스는 여행을 함께 즐기고 그 경험을 즐겁게 소통하는 커뮤니티입니다.
<br/>
여행을 다녀온 후 자신의 여행 경험에 대해 기록하여 여행을 추억하고 서로의 여행 경험을 나누며 소통하는 커뮤니티 서비스 입니다.

## 🛠️ 시작 가이드

### Installation

```
$ git clone https://github.com/DecidedCard/travel-Next.js.git
$ cd travel-Next.js
```

#### 환경 변수 설정

root 디렉토리에 .env 파일을 생성하고 환경변수를 입력 후 저장해주세요.

```
NEXT_PUBLIC_SUPABASE_URL = supabase URL
NEXT_PUBLIC_SUPABASE_KEY = supabase API Key
```

#### Frontend

```
$ cd travel-Next
$ yarn install
$ yarn json
$ yarn start
```

# 📚 Stacks

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Config

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

### Development

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### Hosting

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)

<br />

## 🗂️ 디렉토리 구조

```
📦src
 ┣ 📂app
 ┃ ┣ 📂community
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂detail
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜EyeFilledIcon.tsx
 ┃ ┃ ┣ 📜EyeSlashFilledIcon.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signUp
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂userProfile
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂write
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜Provider.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂assets
 ┃ ┣ 📜defaultUser.png
 ┃ ┣ 📜loginImg.jpg
 ┃ ┣ 📜mainimage.jpg
 ┃ ┗ 📜sky.jpg
 ┣ 📂components
 ┃ ┣ 📂communityComponents
 ┃ ┃ ┣ 📜CommunityForm.tsx
 ┃ ┃ ┣ 📜CommunityList.tsx
 ┃ ┃ ┗ 📜SearchCommunity.tsx
 ┃ ┣ 📂detailComponents
 ┃ ┃ ┣ 📜CommentEditForm.tsx
 ┃ ┃ ┣ 📜CommentInputForm.tsx
 ┃ ┃ ┣ 📜CommentList.tsx
 ┃ ┃ ┣ 📜Comments.tsx
 ┃ ┃ ┗ 📜PostDetail.tsx
 ┃ ┣ 📂profile
 ┃ ┃ ┣ 📜ContentList.tsx
 ┃ ┃ ┗ 📜Profile.tsx
 ┃ ┣ 📂writeComponents
 ┃ ┃ ┣ 📜InputForm.tsx
 ┃ ┃ ┗ 📜QuillEditor.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┗ 📜Header.tsx
 ┣ 📂hook
 ┃ ┣ 📂detail-write-hook
 ┃ ┃ ┣ 📜useComment.ts
 ┃ ┃ ┣ 📜useDetailPost.ts
 ┃ ┃ ┣ 📜useDetailQuery.ts
 ┃ ┃ ┣ 📜useUserInfo.ts
 ┃ ┃ ┗ 📜useWriteInputForm.ts
 ┃ ┣ 📜authService.ts
 ┃ ┣ 📜useInput.ts
 ┃ ┣ 📜usePostData.ts
 ┃ ┣ 📜useSetMutation.ts
 ┃ ┗ 📜useSortPosts.ts
 ┣ 📂store
 ┃ ┣ 📜authStore.ts
 ┃ ┣ 📜communityStore.ts
 ┃ ┗ 📜postBasicImageStore.ts
 ┣ 📂types
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜writePage.ts
 ┗ 📂util
 ┃ ┣ 📂detail-writeSupaBase
 ┃ ┃ ┣ 📜detailSupaBase.ts
 ┃ ┃ ┗ 📜writeSupaBase.ts
 ┃ ┣ 📜quillImageHandler.ts
 ┃ ┗ 📜supabase.ts
```

<br />

## 💻 화면 구성

|             로그인 페이지              |              메인 페이지               |
| :------------------------------------: | :------------------------------------: |
|  ![LoginPage](./images/LoginPage.png)  |   ![MainPage](./images/MainPage.png)   |
|              상세 페이지               |            커뮤니티 페이지             |
| ![DetailPage](./images/DetailPage.png) | ![ReviewPage](./images/ReviewPage.png) |

## 📦 주요 기능

#### ⭐️ 로그인 기능

- 로그아웃 상태에서도 여행 일기 검색 및 커뮤니티 조회 기능을 사용할 수 있습니다.
- 로그인을 원할 경우, 헤더에 위치한 로그인 버튼을 클릭하면 로그인 페이지로 이동합니다.
- 로그인 후 사용자는 자동으로 홈 페이지로 이동하며, 헤더에 표시된 사용자의 프로필을 통해 현재 로그인 상태를 확인할 수 있습니다.
- 아직 회원이 아니라면, 아이디, 비밀번호, 닉네임을 입력하여 회원가입을 진행할 수 있습니다.
- 회원가입 과정에서 유효하지 않은 정보를 입력한 경우, 알림창이 표시됩니다.
- 여행 일기 작성, 커뮤니티 글 작성, 프로필 변경 등의 회원 정보가 필요한 기능들은 로그인하거나 회원가입을 완료한 후에 이용 가능합니다.

#### ⭐️ 메인 페이지

- 헤더의 프로필 이미지를 클릭해 글쓰기, 마이페이지, 로그인/로그아웃을 할 수 있습니다.
- 헤더의 커뮤니티를 클릭해 커뮤니티 페이지로 이동할 수 있습니다.
- 키워드 검색 시 해당하는 여행 일기를 조회할 수 있습니다.
- 최신 순, 오래된 순, 댓글 순으로 여행 글을 조회할 수 있습니다.
- 특정 여행 일기의 자세히 보기 버튼을 누르면 상세 글을 볼 수 있습니다.

#### ⭐️ 여행 일기

- 로그인 후 여행 일기를 작성할 수 있습니다.
- 여행 일정을 선택할 수 있으며 여행지를 작성하고 사진을 업로드 하거나 글을 작성할 수 있습니다.
- 자신이 쓴 여행 일기는 로그인 후 수정/삭제 할 수 있습니다.
- 로그인 후 코맨트를 입력할 수 있습니다.
- 자신이 쓴 코멘트는 로그인 후 수정/삭제 할 수 있습니다.

#### ⭐️ 커뮤니티

- 리뷰 탭에서는 방탈출 카페에 대한 리뷰를 확인할 수 있습니다.
- 사용자는 방탈출 카페에 대해 자신의 리뷰를 작성, 수정, 삭제할 수 있습니다.
- 사용자는 리뷰 내용과 평점을 입력하여 리뷰를 등록할 수 있습니다.
- 등록된 리뷰들은 최신 순으로 정렬되어 표시됩니다.
- 사용자는 자신이 등록한 리뷰에 한해 수정 및 삭제 권한을 가집니다.
- 리뷰를 수정할 때는 리뷰의 내용과 평점 모두 수정이 가능합니다.
- 리뷰를 등록할 때 입력한 평점은 각 방탈출 카페의 평균 평점 계산에 반영됩니다.

#### ⭐️ 마이페이지

- 로그인 후 닉네임과 프로필 사진을 변경할 수 있습니다.
- 등록한 게시글을 모아 볼 수 있습니다.
- 댓글을 작성한 게시글을 모아 볼 수 있습니다.
  <br />

## 🚦 트러블 슈팅

<details>
<summary> 모달 개별 렌더링 및 모달 바깥 영역 클릭 시 닫힘 기능 구현 </summary>

<div>

1. 문제 상황 <br />
   댓글 기능을 구현하면서 댓글의 옵션 메뉴를 클릭하면 수정 및 삭제 모달이 뜨도록 하려 했으나, 옵션 버튼을 클릭할 때마다 전체 댓글의 모달이 뜨는 문제가 발생했습니다.
   <br />

2. 시도 <br />
   기존 코드에서는 점 버튼을 클릭했을 때 isOptionMenuOpen을 true로 설정하고, 리뷰 전체 컨테이너를 클릭하면 false로 설정하여 렌더링을 관리했습니다. 그러다 보니 각 리뷰 댓글 컴포넌트의 display 속성을 한번에 제어하게 된 것이었습니다.

```js
export const StOptionsMenuModal = styled.ul`
  z-index: 999;
  width: 65px;
  height: 65px;
  font-size: 12px;
  display: ${(props) => (props.$isOptionMenuOpen ? 'flex' : 'none')};
```

3. 해결방안 <br />
   3-1. 리뷰 아이디를 저장할 state를 만들고, 점 옵션 버튼을 클릭했을 때 해당 리뷰 아이디로 state를 설정합니다. <br />
   3-2. 클릭한 리뷰 아이디와 각 댓글의 아이디를 비교하여 해당하는 댓글에 대한 모달만 열리도록 조건부 렌더링을 구현합니다.<br />

```js
// 클릭한 리뷰 아이디를 저장할 state 선언
const [clickedReviewId, setClickedReviewId] = useState(null);

const handleOptionButtonClick = (id) => {
  setClickedReviewId(id);
};

// 점 메뉴를 클릭 시 클릭한 리뷰 아이디로 setState
<StHiOutlineDotsVertical onClick={() => handleOptionButtonClick(item.id)} />;

// map 함수 return 부분
{
  clickedReviewId === item.id && <StOptionsMenuModal>...</StOptionsMenuModal>;
}
```

3-3. 모달 바깥 영역을 클릭했을 때 모달이 닫히도록 구현합니다. <br />

```js
const handleModalClose = () => {
  if (modalRef.current) setClickedReviewId(null);
};
```

모달창이 열려있는지를 확인하기 위해 modalRef의 값을 사용하였습니다.
옵션버튼을 클릭하면 모달이 열리면서 DOM node가 생기고, 따라서 modalRef의 참조값이 생겨 null이 아니게 됩니다. <br />옵션버튼은 handleModalClose 이벤트 함수가 걸려있는 컨테이너 안에 있으므로, modalRef값을 검사하는 if 조건을 추가하여 리뷰 컨테이너를 클릭했을 때 모달창이 열려있어야만 클릭한 리뷰 아이디를 null로 설정하여 모달을 닫습니다.

</div>
</details>
<details>
<summary> 지민 </summary>
<div>
여기에 내용
</div>
</details>
<details>
<summary> 시은 </summary>
<div>
여기에 내용
</div>
</details>
<details>
<summary> 지현 </summary>
<div>
여기에 내용
</div>
</details>
<details>
<summary> 서연 </summary>
<div>
여기에 내용
</div>
</details>
