
# Table of Contents

1.  [참가 신청서](#org670d2bb)
2.  [개발 기획서](#org0490a93)
    1.  [추진배경](#org23e1e10)
    2.  [개발 목표 및 내용](#org4e93f16)
        1.  [개발 목표](#org9336ea9)
        2.  [개발 내용](#org57d3bcf)
        3.  [개발 범위](#org1684cbc)
            1.  [시스템 부분](#orge9016bb)
            2.  [웹 인터페이스 부분](#orgf6b8ae8)
        4.  [시스템 구조](#org41a1940)
            1.  [블록 구조](#org69f3ebc)
            2.  [트랜잭션 구성](#org75f8147)
            3.  [채널 구조](#org24f2343)
            4.  [블록 생명주기](#org6deda8f)
        5.  [웹 인터페이스 구조](#org62b3823)
            1.  [홈 화면](#orgf240ae5)
            2.  [청구 화면](#org940e4ec)
            3.  [대금 지급 화면](#org23484bc)
        6.  [시연용 시스템 구성](#org17e3c4a)
    3.  [주요 특징 및 핵심 기술](#orgfaa6b22)
    4.  [기대효과 및 활용방안](#org0a6ab4f)
    5.  [개발 추진 체계](#org1c0bea6)
        1.  [일정](#org79b0ba9)
        2.  [팀장 및 팀원 역할](#orgf1a079e)



<a id="org670d2bb"></a>

# 참가 신청서

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-left">응모분야</td>
<td class="org-left">창업모델분야</td>
</tr>


<tr>
<td class="org-left">활용 기술</td>
<td class="org-left">Hyperledger Fabric</td>
</tr>


<tr>
<td class="org-left">언어</td>
<td class="org-left">Go, NodeJS</td>
</tr>


<tr>
<td class="org-left">서비스</td>
<td class="org-left">클라우드, Web</td>
</tr>
</tbody>
</table>

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-right" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">분류</th>
<th scope="col" class="org-left">이름</th>
<th scope="col" class="org-left">소속</th>
<th scope="col" class="org-right">생년월일</th>
<th scope="col" class="org-left">이메일</th>
<th scope="col" class="org-left">비고</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">팀장</td>
<td class="org-left">이동수</td>
<td class="org-left">고려대학교</td>
<td class="org-right">931201</td>
<td class="org-left">dongsoolee8@gmail.com</td>
<td class="org-left">프로젝트 관리, 개발</td>
</tr>


<tr>
<td class="org-left">팀원</td>
<td class="org-left">박준우</td>
<td class="org-left">고려대학교</td>
<td class="org-right">970201</td>
<td class="org-left">junwoopark97@naver.com</td>
<td class="org-left">개발</td>
</tr>


<tr>
<td class="org-left">팀원</td>
<td class="org-left">옥준우</td>
<td class="org-left">수성GN(주)</td>
<td class="org-right">&#xa0;</td>
<td class="org-left">jwok91@naver.com</td>
<td class="org-left">아이디어 제공, 자문</td>
</tr>
</tbody>
</table>

블록체인 해커톤을 통해 B2B 거래에서 존재하는 문제점들을 블록체인을 이용해서 해결할 수 있을지 고민하고,
블록체인 기술이 암호화폐 뿐만 아니라 다양한 분야에서 응용될 수 있는 기술임을 증명하고자 합니다.
또한 Hyperledger Fabric(이하 HLF) 기술을 이용하여 기업들이 선호하는 프라이빗 블록체인의 구조를 연구하고 이를 사업화를 하기 위한 프로토타입 구현을 하기 위해 지원하였습니다.


<a id="org0490a93"></a>

# 개발 기획서


<a id="org23e1e10"></a>

## 추진배경


<a id="org4e93f16"></a>

## 개발 목표 및 내용


<a id="org9336ea9"></a>

### 개발 목표

기업들간 거래시 청구 및 수금을 원활하게 할 수 있는 블록체인 시스템 구현과 기업들이 시스템을 간편하게 사용할 수 있도록 웹 기반 인터페이스 제공을 목표로 한다.


<a id="org57d3bcf"></a>

### 개발 내용

HFL을 이용해 Peer간 채널 연결을 통하여 거래하는 기업간 장부를 공유하는 시스템을 구축하고 해당 장부들은 MSP 인증을 통해서만 접근권한을 얻을 수 있게 함으로써 경쟁업체로부터 기업의 거래 장부 데이터를 보호할 수 있도록 개발 한다.
참여하는 기업들이 서로 합의해 채널에 들어올 새로운 기업을 추가 및 제거할 수 있도록 하고, 기업별로 각 채널의 장부를 통합 관리하는 내부 장부를 백업본으로 저장할 수 있도록 개발 한다.

거래에 참여하는 기업들은 웹 인터페이스를 통해 청구, 대금 지급 등의 액션으로 블록을 생성 및 업데이트를 할 수 있고, 청구 현황, 대금 현황 등으로 생성된 블록을 열람할 수 있도록 개발 한다.


<a id="org1684cbc"></a>

### 개발 범위


<a id="orge9016bb"></a>

#### 시스템 부분

HLF 체인코드와 API를 이용하여 전반적인 블록체인 시스템 및 웹 서버를 구축하는 부분이다.

1.  HLF 기반으로 거래하는 기업들간 인증을 통해 서로의 거래 장부를 공유하는 시스템 구축
2.  HLF의 체인코드로 '청구', '수금', '수금 취소', '수금 확인' 등의 트랜잭션 구현
3.  기업간 거래에 참여하는 다른 기업들을 Chnnel을 추가하고 삭제하는 등의 기능 구현
4.  사용자 접근을 위한 웹 서버 구축
5.  사용자가 로그인을 통해 기업 Organization에 인증하는 기능 구현


<a id="orgf6b8ae8"></a>

#### 웹 인터페이스 부분

HLF 클라이언트 API와 Vue.js를 기반으로 사용자가 블록체인 시스템에 접근하기 쉽도록 인터페이스를 구축하는 부분이다.

1.  로그인 인터페이스 구현
2.  채널 리스트, 선택, 추가, 삭제 인터페이스 구현
3.  청구, 수금현황, 대금지급, 대금현황 등의 인터페이스 구현


<a id="org41a1940"></a>

### 시스템 구조


<a id="org69f3ebc"></a>

#### 블록 구조

본 시스템에서 블록 구조는 두 종류로 나뉜다.
첫번째는 둘 이상의 다른 기업 간에 공유하는 '거래 장부'이고, 두번째는 하나의 기업 내부 보관용으로 사용되는 '내부 장부'이다.

1.  거래 장부
    이 장부는 다른 기업간의 거래 시 사용되는 장부로, 둘 이상의 기업이 참여하여 청구/수금 요청을 위한 장부를 작성한다.
    다음과 같은 정보가 장부에 기록된다.
    
    <table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">
    
    
    <colgroup>
    <col  class="org-left" />
    
    <col  class="org-left" />
    </colgroup>
    <thead>
    <tr>
    <th scope="col" class="org-left">스키마</th>
    <th scope="col" class="org-left">내용</th>
    </tr>
    </thead>
    
    <tbody>
    <tr>
    <td class="org-left">source</td>
    <td class="org-left">다른 기업에게 청구를 하는 주체</td>
    </tr>
    
    
    <tr>
    <td class="org-left">target</td>
    <td class="org-left">청구를 요청 받은 기업</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items[]</td>
    <td class="org-left">청구 품목 내용</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items.name</td>
    <td class="org-left">청구 물품 이름</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items.price</td>
    <td class="org-left">청구 물품 가격</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items.quantity</td>
    <td class="org-left">청구 물품 개수</td>
    </tr>
    
    
    <tr>
    <td class="org-left">total</td>
    <td class="org-left">전체 대금</td>
    </tr>
    
    
    <tr>
    <td class="org-left">balance</td>
    <td class="org-left">잔금</td>
    </tr>
    
    
    <tr>
    <td class="org-left">payment date</td>
    <td class="org-left">결제 기준일</td>
    </tr>
    
    
    <tr>
    <td class="org-left">confirm</td>
    <td class="org-left">수금 확인 여부</td>
    </tr>
    </tbody>
    </table>
2.  내부 장부
    
    <table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">
    
    
    <colgroup>
    <col  class="org-left" />
    
    <col  class="org-left" />
    </colgroup>
    <thead>
    <tr>
    <th scope="col" class="org-left">스키마</th>
    <th scope="col" class="org-left">내용</th>
    </tr>
    </thead>
    
    <tbody>
    <tr>
    <td class="org-left">channel</td>
    <td class="org-left">해당 장부가 생성된 채널 이름</td>
    </tr>
    
    
    <tr>
    <td class="org-left">source</td>
    <td class="org-left">다른 기업에게 청구를 하는 주체</td>
    </tr>
    
    
    <tr>
    <td class="org-left">target</td>
    <td class="org-left">청구를 요청 받은 기업</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items[]</td>
    <td class="org-left">청구 품목 내용</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items.name</td>
    <td class="org-left">청구 물품 이름</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items.price</td>
    <td class="org-left">청구 물품 가격</td>
    </tr>
    
    
    <tr>
    <td class="org-left">items.quantity</td>
    <td class="org-left">청구 물품 개수</td>
    </tr>
    
    
    <tr>
    <td class="org-left">total</td>
    <td class="org-left">전체 대금</td>
    </tr>
    
    
    <tr>
    <td class="org-left">balance</td>
    <td class="org-left">잔금</td>
    </tr>
    
    
    <tr>
    <td class="org-left">payment date</td>
    <td class="org-left">결제 기준일</td>
    </tr>
    
    
    <tr>
    <td class="org-left">confirm</td>
    <td class="org-left">수금 확인 여부</td>
    </tr>
    </tbody>
    </table>


<a id="org75f8147"></a>

#### 트랜잭션 구성

본 시스템에서 트랜잭션은 '액션 트랜잭션', '자동 트랜잭션', '반자동 트랜잭션'으로 구성한다.

액션 트랜잭션은 사용자의 행동으로 인해 발생되는 트랜잭션으로, '청구' 및 '수금', '수금 취소' 트랜잭션으로 구성된다.
청구 트랜잭션은 A기업이 B기업에게 대금을 청구할 때 수행되는 트랜잭션이다. A기업이 청구하는 품목 이름과 가격 및 수량을 입력하면 본 시스템에서 자동으로 전체 대금과 잔금을 나타내는 블록을 생성한다.
수금 트랜잭션은 B기업이 A기업이 청구한 대금을 납부할 때 수행되는 트랜잭션이다. B기업이 A기업이 청구한 품목 이름과 수량을 보고 지급한 대금에 해당하는 품목 이름과 수량을 선택하면 본 시스템에서 자동으로 트랜잭션에 B기업이 내야하는 대금 중 남은 금액을 계산하여 기록한다.
수금 취소 트랜잭션은 A기업, B기업이 모두 진행할 수 있는 트랜잭션이다. 기록된 장부의 블록에서 취소할 품목 이름과 수량을 선택하면 해당하는 금액만큼 잔금이 올라가고, 만약 수금 확인이 된 블록이면 수금 확인이 취소된다.

자동 트랜잭션은 액션 트랜잭션이 발생하였을 때 자동으로 발생하는 트랜잭션으로, '장부 업데이트' 트랜잭션 하나로 구성된다.
장부 업데이트 트랜잭션은 A기업이 B기업에게 대금을 청구하여 청구 트랜잭션이 진행되고 블록이 장부에 기록되었을 때, 해당 블록 정보와 채널 정보등을 추가하여 A기업과 B기업 각각 내부에서 사용하는 장부에 새로이 기록이 된다. 그리고 B기업이 대금을 납부하였을 때도 마찬가지로 해당 채널에 연결된 각 기업의 내부 장부에 추가가 된다.

반자동 트랜잭션은 특정 조건을 만족하면 발생하는 트랜잭션으로, 사용자가 직접 발생시킬 수 있다. '수금 확인' 트랜잭션 하나로 구성된다.
A기업이 B기업에게 대금을 청구하여 새로운 블록이 생성되고, B기업이 A기업에게 잔금을 모두 치르게 되어 블록에 기록된 잔금이 0이 되면 본 시스템은 정해진 기간(기본값: 30일) 후에 해당 블록을 자동으로 수금 확인으로 변경한다.


<a id="org24f2343"></a>

#### 채널 구조

채널은 HLF에서 제공되는 프라이빗 블록체인에 특화된 기술로, 블록체인상에 정해진 Peer들만 접근 할 수 있는 채널을 구성하여 해당 채널에서만 공유하는 장부를 만든다.
거래를 시작하기 위해서는 먼저 두 기업간에 거래 장부를 공유할 수 있는 새로운 채널을 만든다. 해당 채널에 만들어진 장부는 채널에 접근권한이 있는 기업들만 장부를 열람하거나 블록을 생성할 수 있다. 
이는 장부가 공개되어 있는 퍼블릭 블록체인과는 달리 경쟁사로 부터 자사 데이터의 보안을 유지하는 장점을 가진다.


<a id="org6deda8f"></a>

#### 블록 생명주기

전제 : A기업과 B기업은 채널 A-B로 장부를 공유한다.

1.  청구 : A기업이 B기업에게 결제대금 청구, Channel-A<sub>B의</sub> 거래 장부에 청구 블록을 생성한다.
2.  장부 업데이트 : A기업과 B기업 내부 장부에 Channel-A<sub>B에서</sub> 추가된 청구 블록을 추가한다.
3.  수금 : B기업이 A기업에게 결제대금 지급, 청구 블록에 잔금(Balance)이 기록된다.
4.  장부 업데이트 : A기업과 B기업 내부 장부에 Channel-A<sub>B에서</sub> 지급된 품목 정보와 잔금 정보가 업데이트 된다.
5.  수금 : B기업이 A기업에게 결제대금 지급, 청구 블록에 잔금(Balance)이 0이 된다.
6.  장부 업데이트 : A기업과 B기업 내부 장부에 Channel-A<sub>B에서</sub> 지급된 품목 정보와 잔금 정보가 업데이트 된다.
7.  수금 확인 : 잔금이 0이된 블록이 일정 기간이 지나면 자동으로 수금 확인으로 바뀌어 블록이 업데이트가 된다.
8.  장부 업데이트 : A기업과 B기업 내부 장부에 해당하는 블록에 수금 확인 업데이트를 진행한다.


<a id="org62b3823"></a>

### 웹 인터페이스 구조


<a id="orgf240ae5"></a>

#### 홈 화면

-   로그인이 되어있지 않은 경우
    기업 사용자가 시스템에 로그인을 한다.
-   로그인이 되어있는 경우
    청구 및 대금 지급 선택 박스가 나온다.


<a id="org940e4ec"></a>

#### 청구 화면

-   수금 현황
    -   잔고가 0이 된 블록은 '수금 확인'을 할 수 있다.
-   청구 기능
    -   Channel 및 청구할 기업을 선택한다. Channel에 접근권한이 있는 기업들만 청구가 가능하다.
    -   청구할 물품 및 마감일 등을 선택할 수 있다.


<a id="org23484bc"></a>

#### 대금 지급 화면

-   대금 지급 현황
    -   현재 다른 기업으로부터 받은 청구 블록을 확인할 수 있다.
-   대금 지급
    -   물품과 수량을 선택하여 대금을 지급할 수 있다.


<a id="org17e3c4a"></a>

### 시연용 시스템 구성

본 시스템에서 시연을 위해 구성하는 시스템 구조는 다음과 같다.

Peer 구성

-   기업A
-   기업B
-   기업C
-   기업D

Channel 구성

-   Channel-A<sub>B</sub> : 기업A와 기업B의 거래를 위한 채널
-   Channel-A<sub>C</sub><sub>D</sub> : 기업A, C, D의 거래를 위한 채널
-   Channel-B<sub>C</sub> : 기업B, C의 거래를 위한 채널
-   Channel-B<sub>D</sub> : 기업B, D의 거래를 위한 채널


<a id="orgfaa6b22"></a>

## 주요 특징 및 핵심 기술


<a id="org0a6ab4f"></a>

## 기대효과 및 활용방안


<a id="org1c0bea6"></a>

## 개발 추진 체계


<a id="org79b0ba9"></a>

### 일정

-   7/18 ~ 7/27 : 시스템 구상
-   7/28 ~ 8/20 : 개발 진행
    -   청구 및 수금 Chain code 구현
    -   Peer 노드 구성
    -   MSP 인증 부분 설정
    -   웹 인터페이스 구현
    -   클라우드 구축 및 배포
    -   사례 탐구
-   8/21 ~ 8/29 : 테스트
    -   Chain code 유닛 테스트
    -   웹 인터페이스 테스트


<a id="orgf1a079e"></a>

### 팀장 및 팀원 역할

-   팀장
    -   일정 관리 : 팀원 간 일정 조율 및 개발 일정 관리
    -   기술 검토 : 시스템 구현을 위해 사용할 기술 검토 및 사용 방법 제시
    -   제약 사항 검토 : 해커톤 기간 내에 개발을 완수 할 수 있도록 개발 범위 제약
    -   구현 부분 : Peer 노드 구성, 웹 인터페이스 구현
-   팀원
    -   사례 탐구 : 기존 ERP 서비스의 현실적인 문제점 사례 및 해결 시 얻을 수 있는 효용성 탐구
    -   구현 부분 : MSP 인증 부분 설정
-   공통
    -   구현 : 청구 및 수금 부분 Chain code 구현, 클라우드 구축 및 배포, Channel 구성
    -   시스템 구상
    -   테스트 : Chain code 유닛 테스트, 웹 인터페이스 테스트
    -   코드 리뷰 : 구현물에 대한 오류 및 기능 검증

