
# Table of Contents

1.  [참가 신청서](#org3f72a81)
2.  [개발 기획서](#org482ac49)
    1.  [추진배경](#org1e802fd)
    2.  [개발 목표 및 내용](#orgc545492)
        1.  [구현 목표](#orge6b1f08)
        2.  [개발 내용](#org5c36376)
        3.  [개발 범위](#org4e79e1c)
        4.  [시스템 구조](#orga42f6c4)
            1.  [장부 구조](#orgc682c6b)
            2.  [트랜잭션 구성](#org30af723)
            3.  [채널 구조](#orgd9a1c92)
            4.  [블록 생명주기](#orgd4b231b)
    3.  [주요 특징 및 핵심 기술](#org9628d66)
    4.  [기대효과 및 활용방안](#org3aad837)
    5.  [개발 추진 체계](#org8453df7)
        1.  [일정](#org20fc3db)
        2.  [팀장 및 팀원 역할](#org659ef64)



<a id="org3f72a81"></a>

# 참가 신청서

-   응모분야 : 창업모델분야
-   활용기술
    -   블록체인 : 하이퍼레저
    -   언어 : Go, NodeJS
    -   서비스 : 클라우드, Web
-   해커톤 지원동기


<a id="org482ac49"></a>

# 개발 기획서


<a id="org1e802fd"></a>

## 추진배경


<a id="orgc545492"></a>

## 개발 목표 및 내용


<a id="orge6b1f08"></a>

### 구현 목표

기업들간 거래시 청구 및 수금을 원활하게 할 수 있는 블록체인 시스템 구현과 이를 바탕으로 한 웹 서비스 구현을 목표로 한다.


<a id="org5c36376"></a>

### 개발 내용

Hyper-ledger Fabric(이하 HF)의 MSP 인증과 Peer 간 Channel 등을 이용하여 


<a id="org4e79e1c"></a>

### 개발 범위


<a id="orga42f6c4"></a>

### 시스템 구조


<a id="orgc682c6b"></a>

#### 장부 구조

본 시스템에서 장부 구조는 두 종류로 나뉜다.
첫번째는 둘 이상의 다른 기업 간에 공유하는 장부이고,
두번째는 하나의 기업 내부에서 공유하는 장부이다.

1.  다른 기업 간에 공유하는 장부
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
    <td class="org-left">items</td>
    <td class="org-left">청구하는 품목 이름과 가격 및 수량</td>
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
    <td class="org-left">confirm</td>
    <td class="org-left">수금 확인 여부</td>
    </tr>
    </tbody>
    </table>
2.  기업 내부에서 공부하는 장부
    
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
    <td class="org-left">items</td>
    <td class="org-left">청구하는 품목 이름과 가격 및 수량</td>
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
    <td class="org-left">confirm</td>
    <td class="org-left">수금 확인 여부</td>
    </tr>
    </tbody>
    </table>


<a id="org30af723"></a>

#### 트랜잭션 구성

본 시스템에서 트랜잭션 구성은 크게 세 가지로 분류한다.
첫번째는 사용자(기업)의 액션(행동)으로 인해 진행되는 '액션 트랜잭션'이라 분류하고
두번째는 블록 트랜잭션이 생기면 자동으로 진행되는 '자동 트랜잭션'이라 분류하고,
세번째는 사용자 액션으로 생길 수도 있고, 자동으로 생길 수도 있는 트랜잭션을 '반자동 트랜잭션'이라고 분류한다.

액션 트랜잭션은 '청구' 및 '수금', '수금 취소' 트랜잭션으로 구성된다.
청구 트랜잭션은 A기업이 B기업에게 대금을 청구할 때 수행되는 트랜잭션이다. A기업이 청구하는 품목 이름과 가격 및 수량을 입력하면 본 시스템에서 자동으로 전체 대금과 잔금을 나타내는 블록을 생성한다.
수금 트랜잭션은 B기업이 A기업이 청구한 대금을 납부할 때 수행되는 트랜잭션이다. B기업이 A기업이 청구한 품목 이름과 수량을 보고 지급한 대금에 해당하는 품목 이름과 수량을 선택하면 본 시스템에서 자동으로 트랜잭션에 B기업이 내야하는 대금 중 남은 금액을 계산하여 기록한다.
수금 취소 트랜잭션은 A기업, B기업이 모두 진행할 수 있는 트랜잭션이다. 기록된 장부의 블록에서 취소할 품목 이름과 수량을 선택하면 해당하는 금액만큼 잔금이 올라가고, 만약 수금 확인이 된 블록이면 수금 확인이 취소된다.

자동 트랜잭션은 '장부 업데이트' 트랜잭션 하나로 구성된다.
장부 업데이트 트랜잭션은 A기업이 B기업에게 대금을 청구하여 청구 트랜잭션이 진행되고 블록이 장부에 기록되었을 때, 해당 블록 정보와 채널 정보등을 추가하여 A기업과 B기업 각각 내부에서 사용하는 장부에 새로이 기록이 된다. 그리고 B기업이 대금을 납부하였을 때도 마찬가지로 해당 채널에 연결된 각 기업의 내부 장부에 추가가 된다.

반자동 트랜잭션은 '수금 확인' 트랜잭션 하나로 구성된다.
A기업이 B기업에게 대금을 청구하여 새로운 블록이 생성되고, B기업이 A기업에게 잔금을 모두 치르게 되어 블록에 기록된 잔금이 0이 되면 본 시스템은 정해진 기간(기본값: 30일) 후에 해당 블록을 자동으로 수금 확인으로 변경한다.


<a id="orgd9a1c92"></a>

#### 채널 구조

Channel은 HLF에서 특화된 기술로, 블록체인상에 정해진 Peer들만 접근 할 수 있는 Channel을 구성하여 해당 Channel 에서만 공유하는 장부를 만들 수 있다.

Channel 기술을 이용하여 하나의 Organization이 


<a id="orgd4b231b"></a>

#### 블록 생명주기


<a id="org9628d66"></a>

## 주요 특징 및 핵심 기술


<a id="org3aad837"></a>

## 기대효과 및 활용방안


<a id="org8453df7"></a>

## 개발 추진 체계


<a id="org20fc3db"></a>

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


<a id="org659ef64"></a>

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
    -   구현 : 청구 및 수금 부분 Chain code 구현, 클라우드 구축 및 배포
    -   시스템 구상
    -   테스트 : Chain code 유닛 테스트, 웹 인터페이스 테스트
    -   코드 리뷰 : 구현물에 대한 오류 및 기능 검증

