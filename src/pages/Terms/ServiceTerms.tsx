import { css } from '@emotion/react'
import styled from '@emotion/styled'

const ServiceTerms = () => {
  return (
    <div css={containerStyle}>
      <Title>서비스 이용약관</Title>
      <p>
        <strong>배포일자: 2024년 10월 6일</strong>
      </p>
      <SubTitle>제1장 총칙</SubTitle>
      <Subscription>제1조(목적)</Subscription>
      <p>
        본 약관은 모잉 팀(이하 "팀"이라 함)가 제공하는 서비스(이하"서비스"라
        함)의 이용과 관련하여, 팀과 회원 간 또는 회원 간의 권리 및 의무 및
        책임사항 및 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로
        합니다.
      </p>
      <Subscription>제2조(용어의 정의)</Subscription>
      <List>
        <li>
          본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
          <SubList>
            <li>
              "회원"이란 본 약관에 따라 가입신청에 대한 팀의 승낙을 받아 팀이
              제공하는 서비스를 이용하는 자를 말합니다.
            </li>
            <li>
              "모잉 서비스"란 컴퓨터 등의 정보통신설비 또는 스마트폰, 태블릿
              등의 모바일 정보통신설비를 이용하여 팀이 서비스를 제공할 수 있도록
              설정한 가상의 영업장 또는 서비스 공간을 말하며, 애플리케이션,
              웹페이지 등을 포함합니다.
            </li>
            <li>
              "오류"란 이용자의 고의 또는 과실 없이 모잉 서비스가 본 약관 또는
              회원의 지시에 따라 이행되지 아니한 경우를 말합니다.
            </li>
          </SubList>
        </li>
        <li>
          본 조 및 본 약관의 다른 조항에서 정의한 것을 제외하고는 정보통신망법
          등 관련 법령에 정한 바에 따릅니다.
        </li>
      </List>
      <Subscription>제3조(이용약관의 효력 및 약관변경 승인)</Subscription>
      <List>
        <li>
          팀은 회원이 본 서비스를 이용하기 전에 본 약관을 게시하고, 회원이 본
          약관의 중요한 내용을 확인할 수 있도록 합니다.
        </li>
        <li>
          팀은 회원의 요청이 있는 경우 전자문서 전송(전자우편을 이용한 전송을
          포함합니다), 모사전송, 우편 또는 직접교부의 방식으로 본 약관의 사본을
          회원에게 교부합니다.
        </li>
        <li>
          팀은 회원이 약관의 내용에 대한 설명을 요청하는 경우 다음 각 호의 어느
          하나의 방법으로 회원에게 약관의 중요내용을 설명합니다.
          <SubList>
            <li>약관의 중요내용을 회원에게 직접 설명</li>
            <li>
              약관의 중요내용에 대한 설명을 전자적 장치를 통하여 회원이 알기
              쉽게 표시하고 회원으로부터 해당 내용을 충분히 인지하였다는
              의사표시를 전자적 장치를 통하여 수령
            </li>
          </SubList>
        </li>
        <li>
          팀은 약관을 변경하는 때에는 그 시행일 1개월 전에 변경되는 약관을 해당
          본 서비스를 이용하는 전자적 장치 또는 웹페이지 등에 게시하고 회원에게
          통지합니다. 다만, 회원이 이의를 제기할 경우 팀은 회원에게 적절한
          방법으로 약관 변경내용을 통지하였음을 확인해 주어야 합니다.
        </li>
        <li>
          제4항에도 불구하고, 팀이 관련 법령의 개정으로 인하여 긴급하게 약관을
          변경한 때에는 변경된 약관을 전자적 장치 또는 웹페이지 등에 최소 1개월
          이상 게시하고 회원에게 통지합니다.
        </li>
        <li>
          팀은 제4항, 제5항에 따라 변경된 약관을 게시하거나 통지하는 경우에는
          "회원이 변경에 동의하지 아니한 경우 게시 또는 통지를 받은 날로부터
          변경되는 약관의 시행일 전의 영업일까지 계약을 해지할 수 있으며,
          계약해지의 의사표시를 하지 아니한 경우에는 변경에 동의한 것으로
          본다."라는 취지의 내용을 고지하거나 통지합니다.
        </li>
        <li>
          회원은 약관의 변경내용이 게시되거나 통지된 후부터 변경되는 약관의
          시행일 전의 영업일까지 팀과 서비스 이용계약을 해지할 수 있습니다. 이
          기간 안에 회원이 약관의 변경내용에 대하여 이의를 제기하지 아니하는
          경우에는 약관의 변경을 승인한 것으로 봅니다.
        </li>
      </List>
      <Subscription>제4조 (이용계약의 체결)</Subscription>
      <List>
        <li>
          서비스 이용계약은, 회원이 되고자 하는 자(이하 "가입신청자"라 함)가
          팀이 요구하는 정보를 제공하고, 팀이 지정하는 방법에 따라 본 약관에
          대한 동의 의사를 전자적 방식으로 제출한 후, 팀이 다음 각호의 요건을
          확인하여 해당 가입신청자에게 이용을 승낙함으로써 체결됩니다.
          <SubList>
            <li>
              가입신청자는 컴퓨터, 휴대전화 또는 태블릿 등 모잉 서비스를 구동할
              수 있는 전자적 장치를 보유하여야 합니다.
            </li>
            <li>
              가입신청자는 반드시 신청자 본인의 정보로 가입을 신청하여야 합니다.
            </li>
          </SubList>
        </li>
      </List>
      <Subscription>제5조 (이용계약의 거절 등)</Subscription>
      <List>
        <li>
          팀은 다음 각 호에 해당하는 가입신청에 대하여는 승낙을 하지 않거나,
          승낙 이후라도 이용의 제한 또는 이용계약의 해지 등의 조치를 취할 수
          있습니다.
          <SubList>
            <li>
              팀이 정한 서비스 제공환경이 아니거나 기술상 서비스 제공이 불가능한
              경우
            </li>
            <li>
              가입신청자가 신청시 제공한 정보에 허위, 누락이나 오류가 있거나,
              팀이 요구하는 기준을 충족하지 못하는 경우
            </li>
            <li>신청 명의가 가입신청자 본인의 명의가 아닌 경우</li>
            <li>이미 가입된 회원이 중복하여 가입신청을 하는 경우</li>
            <li>만 14세 미만의 자가 이용신청 하는 경우</li>
            <li>법인 명의로 가입하는 경우</li>
            <li>
              팀으로부터 서비스 이용 제한 등의 조치를 당한 회원이 재가입신청을
              하는 경우
            </li>
            <li>
              본 약관을 위반한 가입신청에 해당하거나, 위법 또는 부당한 방식으로
              가입신청을 한 경우
            </li>
            <li>
              기타 가입신청자의 귀책사유로 인하여 승낙이 불가능하거나 해당
              가입신청이 법령, 본 약관 및 기타 팀이 정한 제반 사항에 배치되는
              경우
            </li>
          </SubList>
        </li>
        <li>
          팀의 해제, 해지 및 이용제한에 대하여 회원은 팀이 정한 절차에 따라
          이의신청을 할 수 있습니다. 이때 이의가 정당하다고 팀이 인정하는 경우,
          팀은 즉시 서비스의 이용을 재개합니다.
        </li>
      </List>
      <Subscription>제6조 (서비스의 이용개시, 이용시간 및 수수료)</Subscription>
      <List>
        <li>
          제4조에 따라 팀이 신청인의 이용신청을 승낙함과 동시에 신청인은 팀이
          제공하는 서비스의 회원이 되며, 이때부터 팀은 당해 회원에게 본 약관이
          정하는 서비스를 제공합니다.
        </li>
        <li>
          팀은 본 약관이 정한 서비스 외에 추가적인 서비스를 제공하기 위해
          회원에게 별도의 추가적인 약관 동의, 정보 수집 및 이용 동의 등 절차의
          이행을 요청할 수 있으며, 이러한 절차가 완료되지 않는 경우 해당 회원이
          추가적인 서비스의 전부 또는 일부를 이용하지 못할 수 있습니다. 회원이
          추가 서비스를 이용할 경우, 각 서비스 별로 추가되는 이용약관 또는
          안내내용과 본 약관의 내용이 상이한 경우 본 약관보다 추가적으로
          적용되는 개별 약관 또는 안내내용이 우선 적용됩니다.
        </li>
        <li>
          서비스의 이용은 팀의 업무상 또는 기술상의 특별한 지장이 없는 한
          연중무휴, 1일 24시간을 원칙으로 합니다. 다만, 서비스 운영상의
          필요성으로 팀이 정한 기간 동안 본 서비스가 일시 중지될 수 있습니다.
          한편 서비스 중지가 발생하는 경우 그 내용을 모잉 홈페이지 등을 통하여
          공지합니다.
        </li>
        <li>
          팀은 회원의 서비스 이용에 따른 수수료를 부과할 수 있으며, 수수료는
          모잉 홈페이지 등을 통하여 고지합니다.
        </li>
      </List>
      <Subscription>제7조 (서비스의 구성 및 중단)</Subscription>
      <List>
        <li>
          팀이 제공하는 서비스는 다음 각 호로 구성됨:
          <SubList>
            <li>여행 콘텐츠 게시 및 신청</li>
            <li>여행 관련 커뮤니티 서비스</li>
            <li>기타 팀이 제공하는 서비스</li>
          </SubList>
          회원의 요건에 따라 서비스 범위 및 이용 한도가 달라질 수 있음.
        </li>
        <li>
          팀은 다음의 경우 서비스의 전부 또는 일부를 제한하거나 중지할 수 있음:
          <SubList>
            <li>제휴사의 설비 보수, 교체, 고장, 통신 두절 등의 사유</li>
            <li>서비스 업그레이드 및 시스템 유지보수 필요</li>
            <li>
              정전, 설비 장애, 이용량 폭주 등으로 정상적인 서비스 이용에 지장 시
            </li>
            <li>제휴사와의 계약 종료 등으로 서비스 제공 불가능 시</li>
            <li>팀의 파산신청 등으로 서비스 제공 불가능 시</li>
            <li>천재지변, 국가 비상사태 등 불가항력적 사유</li>
            <li>사전에 명시한 서비스 제공 기한이 도과한 경우</li>
            <li>법령 개정 또는 규제당국의 행정지도에 따른 경우</li>
          </SubList>
        </li>
        <li>
          2항에 따라 서비스 중단 시, 원칙적으로 제15조 제1항의 방법으로 사전
          공지하며, 중대한 영향이 있는 경우 제15조 제2항의 방법으로 개별 통지함.
          통제 불가능한 사유로 서비스가 중단되는 경우 사후 공지 가능.
        </li>
        <li>
          팀은 서비스 운영 및 개선 필요 시, 제15조 제1항의 방법으로 사전
          공지하고 서비스 변경 또는 중단 가능.
        </li>
        <li>
          무상 서비스 변경 또는 종료 시, 관련 법령에 특별한 규정이 없는 한
          별도의 보상하지 않음.
        </li>
      </List>
      <Subscription>제8조 (회원의 의무)</Subscription>
      <List>
        <li>
          회원은 서비스를 이용함에 있어 다음 각 호의 행위를 하여서는 안됩니다.
        </li>
        <SubList>
          <li>
            본 약관 및 정보통신망법 등 서비스 이용에 관련된 관련 법령을 위반한
            행위
          </li>
          <li>
            서비스를 제공받기 위해 이용 신청 또는 변경 신청 시 허위 사실을
            기재하거나 타인의 정보를 도용하는 등 정상적인 서비스 운영을 고의로
            방해하는 일체의 행위
          </li>
          <li>
            팀이 정상적으로 제공하는 방법이 아닌 다른 방법으로 팀이 보유하고
            있는 정보를 탈취, 저장, 공개 또는 부정한 목적으로 사용하는 행위
          </li>
          <li>
            팀의 지식재산권, 제3자의 지식재산권 등 기타 권리를 침해하거나, 팀의
            동의 없이 회원 또는 제3자의 상업적인 목적을 위하여 본 서비스
            구성요소의 전부 또는 일부의 내용에 관하여 이를 복사, 복제, 판매,
            재판매 또는 양수도하는 행위
          </li>
          <li>
            기타 범죄 또는 법령이 금지하는 행위와 관련되었다고 의심받을 수 있는
            일체의 행위
          </li>
          <li>
            서비스와 관련된 설비의 오동작이나 정보 등의 파괴 및 혼란을
            유발시키는 컴퓨터 바이러스 감염 자료를 등록 또는 유포하는 행위
          </li>
          <li>팀의 서비스를 해킹하거나 해킹에 이용하는 일체의 행위</li>
          <li>기타 불법적이거나 부당한 행위</li>
        </SubList>
        <li>
          회원은 관련 법령, 본 약관의 규정, 이용안내 및 서비스상에 공지한
          주의사항, 팀이 통지하는 사항 등을 준수하여야 하며, 기타 팀의 업무에
          방해되는 행위를 하여서는 아니 됩니다.
        </li>
        <li>
          회원은 반드시 본인이 직접 서비스를 이용해야 하며 계정을 타인에게 양도
          또는 대여하는 등의 방법으로 타인으로 하여금 서비스를 이용할 수 있도록
          하여서는 안됩니다. 이의 위반으로 인한 책임은 회원에게 있습니다.
        </li>
      </List>
      <Subscription>제9조 (서비스 부정사용에 대한 책임)</Subscription>
      <List>
        <li>
          팀은 다음 각 호의 어느 하나에 해당하는 사고로 인하여 이용자에게 손해가
          발생한 경우에는 그 손해를 배상할 책임을 부담합니다.
        </li>
        <SubList>
          <li>계정의 위조나 변조로 발생한 사고</li>
          <li>
            계약체결 또는 거래지시의 전자적 전송이나 처리 과정에서 발생한 사고
          </li>
          <li>
            「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제2조제1항제1호에
            따른 정보통신망에 침입하여 거짓이나 그 밖의 부정한 방법으로 획득한
            접근매체의 이용으로 발생한 사고
          </li>
        </SubList>
        <li>
          전항에도 불구하고, 사고 발생에 있어서 회원의 고의나 중대한 과실이 있는
          경우로서 다음 각 호에 해당하는 경우에는 그 손해의 전부 또는 일부를
          회원이 부담할 수 있습니다.
        </li>
        <SubList>
          <li>
            회원이 계정을 제3자에게 대여하거나 그 사용을 위임한 경우 또는 양도나
            담보의 목적으로 제공한 경우
          </li>
          <li>
            제3자가 권한 없이 회원의 계정을 이용하여 서비스 이용을 할 수 있음을
            알았거나 쉽게 알 수 있었음에도 불구하고 계정 정보를 누설하거나 노출
            또는 방치한 경우
          </li>
        </SubList>
        <li>
          서비스 부정사용이 발생한 경우, 회원은 부정사용의 경위 및 피해 조사에
          관하여 팀에 적극 협조하여야 합니다.
        </li>
      </List>
      <Subscription>제10조 (서비스 이용제한)</Subscription>
      <List>
        <li>
          회원의 서비스 이용 중 다음 각 호의 사유가 발생하는 경우, 팀은 해당
          회원의 서비스 이용을 제한 또는 정지하거나 이용계약 해지 등의 조치를
          취할 수 있습니다.
        </li>
        <SubList>
          <li>
            비밀번호 등 본인 인증수단을 팀이 정한 횟수 이상 연속하여 오류
            입력하는 경우
          </li>
          <li>계정의 위조, 도난, 분실 등 사고 신고가 된 경우</li>
          <li>
            팀이 제공하는 서비스 이용방법에 의하지 아니하고 비정상적인 방법으로
            서비스를 이용하거나 팀의 시스템에 접근하는 행위
          </li>
          <li>
            타인의 명의, 카드정보, 계좌정보 등을 도용하여 팀이 제공하는 서비스를
            이용하는 행위
          </li>
          <li>회원이 팀의 서비스 운영을 고의로 방해하는 경우</li>
          <li>
            다른 회원의 정당한 이익을 침해하거나 법령에 위배되는 행위를 한 경우
          </li>
          <li>본 약관에 위배되는 행위를 한 경우</li>
          <li>
            상품 거래를 가장하여 자금을 융통하는 등 비정상적인 거래를 시도하는
            경우
          </li>
          <li>본 약관에서 규정한 해지사유가 발생한 경우</li>
        </SubList>
        <li>
          회원이 본 조의 금지행위를 하는 경우 서비스 이용을 제한함과 별도로
          손해배상의 청구, 사법당국에 대한 고발 등 법적 조치를 취할 수 있으며,
          필요한 경우 회원의 임의 해지를 일정 기간 제한할 수 있습니다.
        </li>
        <li>
          팀은 제1항 또는 관련 법령에 의하여 서비스 이용의 제한 또는 정지 조치를
          취하는 경우, 제15조 제2항에서 정한 방법으로 회원에게 사전 통지합니다.
          다만, 다음 각 호의 사유가 있는 경우 팀은 예외적으로 해당 회원의 서비스
          이용을 제한 또는 정지하고 지체없이 사후 통지할 수 있습니다.
        </li>
        <SubList>
          <li>
            팀 또는 다른 회원의 정당한 이익을 긴급히 보호해야 할 필요성이 있는
            경우
          </li>
          <li>천재지변 등 불가항력적 사유가 존재하는 경우</li>
        </SubList>
        <li>
          팀은 제1항 또는 관련 법령에 의하여 이용계약 해지 조치를 취하는 경우,
          회원에 대하여 이용계약 해지 사유가 발생하였음을 알리고 회원이 해당
          통지를 받은 날로부터 10일 이내(이하 “치유기간”이라 함)에 이러한 사유를
          치유하지 않는 경우 치유기간 종료일의 익일에 이용계약이 해지된다는 점을
          제15조 제2항에서 정한 방법으로 회원에게 사전 통지합니다.
        </li>
        <li>
          팀은 본 조에 따른 서비스 이용 제한 또는 정지, 이용계약 해지 등의
          조치를 해소할 경우 제15조 제2항에서 정한 방법으로 회원에게 지체없이
          사후 통지합니다.
        </li>
      </List>
      <Subscription>제11조 (서비스 이용내역의 보존 및 확인)</Subscription>
      <List>
        <li>
          {' '}
          팀은 회원이 이용한 서비스의 내용을 추적, 검색하거나 그 내용에 오류가
          발생한 경우에 이를 확인하거나 정정할 수 있는 기록을 생성하여
          보존합니다.
        </li>
        <li>서비스 이용내역의 확인 대상 및 보존기간은 아래와 같습니다.</li>
        <SubList>
          <li>아래의 정보는 5년간 보관합니다.</li>
          <SubSubList>
            <li>서비스 이용과 관련한 계정의 접속기록</li>
            <li>서비스의 신청 및 조건의 변경에 관한 사항</li>
          </SubSubList>
          <li>아래의 정보는 1년간 보관합니다.</li>
          <SubSubList>
            <li>회원의 오류정정 요구사실 및 처리결과에 관한 사항</li>
          </SubSubList>
        </SubList>
        <li>
          팀은 회원에게 서비스를 제공하면서 취득한 회원의 인적 사항 및 서비스
          이용 내역에 관한 정보를 법령에 의하거나 회원의 동의를 얻지 아니하고
          제3자에게 제공하거나 서비스 제공 목적 외에 사용하지 아니합니다.
        </li>
        <li>
          팀은 서비스의 조회 화면을 통하여 회원의 서비스 이용 내역을 확인하는
          서비스를 제공합니다. 회원이 요청하는 경우, 팀은 전자우편으로 이용
          내역을 송부할 수 있습니다. 단, 회원이 서비스 이용내역에 대해
          전자문서가 아닌 서면 교부 요청을 하는 경우, 요청을 받은 날로부터 2주
          이내에 모사전송, 우편의 방법 등으로 서비스 이용 내역에 관한 서면을
          교부합니다.
        </li>
        <li>
          서비스 이용내역의 서면제공 요청은 아래의 이메일 주소로 신청하거나,
          아래 담당자에게 전화로 직접 신청할 수 있습니다. 회원은 동 신청을 함에
          있어서 서면을 수령하는데 필요한 정보를 명확히 제공하여야 합니다. 팀은
          우편 제공 시 일반우편의 방법으로 송부합니다.
        </li>
        <SubList>
          <li>이메일: mojuns@gmail.com</li>
          <li>전화: 010-4606-4251</li>
        </SubList>
        <li>
          전자적 장치의 운영장애, 그 밖의 사유로 서비스 이용내역을 제공할 수
          없는 때에는 즉시 회원에게 전자문서 전송(전자우편을 이용한 전송을
          포함합니다)의 방법으로 그러한 사유를 알려야 하며, 전자적 장치의
          운영장애 등의 사유로 서비스 이용내역을 제공할 수 없는 기간은 서면교부
          기간에 산입하지 아니합니다.
        </li>
      </List>
      <Subscription>제12조 (개인정보의 보호 및 이용)</Subscription>
      <List>
        <li>
          {' '}
          팀은 개인정보의 보호 및 처리와 관련하여 개인정보보호법,
          신용정보의이용및보호에관한법률, 정보통신망이용촉진및정보보호에관한법률
          및 각 그 하위 법령에 정하는 사항을 준수하며, 개인정보의 보호를 위하여
          노력합니다.
        </li>
        <li>
          팀은 개인정보의 수집, 이용, 제공, 보호, 위탁 등에 관한 제반 사항의
          구체적인 내용을 개인정보처리방침을 통하여 규정하며, 개인정보처리방침은
          팀의 웹페이지, 모잉 서비스 서비스 화면 등을 통하여 게시합니다.
        </li>
      </List>

      <Subscription>제13조 (계약의 해지 등)</Subscription>
      <List>
        <li>
          회원은 언제든지 팀에 이용계약 해지의 의사를 통지함으로써 이용계약을
          해지할 수 있습니다. 단, 회원은 해지의사를 통지하기 전에 팀이 제공하는
          서비스를 이용하여 진행중인 여행 관련 행위를 완결하여 더 이상 서비스를
          통하여 처리되어야 할 작업 항목이 남지 않도록 하여야 하며, 이러한
          조치를 취하지 아니하고 서비스의 이용 해지 의사표시를 함으로써 발생하는
          불이익에 대하여는 회원이 그 책임을 부담하여야 합니다. 팀이 필요하다고
          판단하는 경우, 이와 같은 작업 항목이 모두 해소될 때까지 해지의 효력
          발생시기를 연기할 수 있습니다.
        </li>
        <li>
          회원이 임의 해지, 재가입 등을 반복적으로 행함으로써 팀이 제공하는
          혜택이나 경제적 이익을 비통상적인 방법으로 악용할 우려가 있다고 팀이
          판단하는 경우, 팀은 재가입 또는 해지를 제한할 수 있습니다.{' '}
        </li>
        <li>
          전 항의 심사 목적 등을 위하여 팀은 회원 탈퇴 시 관련 법령이 정한
          기간동안 동안 해당 회원의 성명, 탈퇴일자, 탈퇴사유 등 필요한 정보를
          보관할 수 있으며, 회원이 재가입을 한 경우 팀이 제공하는 혜택이나
          경제적 이익 제한 등 해지 전과 동일한 상태에서 서비스 제공을 개시할 수
          있습니다.
        </li>
        <li>
          본 약관에 따라 이용계약이 해지된 경우 팀은 회원에게 부가적으로 제공한
          각종 혜택을 무효화하거나 회수할 수 있습니다.
        </li>
      </List>

      <Subscription>제14조 (손해배상)</Subscription>
      <List>
        <li>
          팀이나 회원이 본 약관의 규정을 위반하거나 기타 불법행위를 하여
          상대방에게 손해를 발생시킨 경우, 그 손해 발생에 귀책사유가 있는
          당사자는 그 상대방의 피해를 배상하여야 합니다.
        </li>
        <li>
          회원이 서비스를 이용함에 있어 행한 불법행위나 본 약관 위반행위로
          인하여 팀이 당해 회원 이외의 제3자로부터 손해배상 청구 소송을 비롯한
          각종 이의제기를 받는 경우 당해 회원은 그로 인하여 팀이 입은 손해를
          배상하여야 합니다.
        </li>
        <li>
          팀은 회원 상호간, 회원과 가맹점 상호간 또는 회원과 제3자 상호간에
          발생한 분쟁에 대해서는 개입할 의무가 없으며, 팀에 귀책사유가 없는 한
          이로 인한 손해를 배상할 책임이 없습니다.
        </li>
      </List>

      <Subscription>제15조 (회원에 대한 공고 및 통지)</Subscription>
      <List>
        <li>
          {' '}
          팀은 본 약관에 따라 제공되는 서비스의 운영과 관련한 안내사항을 팀의
          홈페이지(http://….작성 필요) 또는 모잉 서비스 화면 또는 공지사항에의
          게시 중 하나 이상의 방법을 이용하여 공지할 수 있습니다.
        </li>
        <li>
          팀이 회원에게 개별 통지하는 경우, 본 약관에서 달리 정하지 않는 한
          토스앱 푸시 발송, 회원이 제공한 전자우편주소로의 메일 전송, 회원이
          제공한 휴대전화번호로의 문자 메시지 또는 SNS(카카오톡 등)를 보내는
          방법 중 하나 이상의 방법을 이용하여 통지할 수 있습니다.
        </li>
        <li>
          본 조에 따른 공지 및 통지는, 관련 법령 또는 본 약관에서 특별히
          전자문서가 아닌 서면 형태를 요구하는 경우가 아닌 한, 서면 통지로서의
          효력을 갖습니다.
        </li>
      </List>

      <Subscription>제16조 (지식재산권)</Subscription>
      <List>
        <li>팀의 서비스와 관련된 일체의 지식재산권은 팀에 속합니다.</li>
        <li>
          회원은 본 서비스 이용 과정에서 얻은 정보를 가공, 제공, 판매하는 등
          영리 목적으로 이용하거나 제3자에게 이용하게 할 수 없습니다.
        </li>
      </List>
      <Subscription>제17조 (약관의 해석)</Subscription>
      <List>
        <li>
          팀과 회원 사이에 개별적으로 합의한 사항이 본 약관에 정한 사항과 다를
          때에는, 그 합의사항을 본 약관에 우선하여 적용합니다.
        </li>
        <li>
          팀이 제공하는 서비스에 따라 별도로 부가되는 약관(안내내용을 포함하며,
          이하 동일함)은 본 약관과 통일적으로 해석되어야 하며, 서로 다른 내용이
          있는 경우 원칙적으로 개별 서비스 약관의 내용이 우선합니다.{' '}
        </li>
        <li>
          본 약관의 내용 중 관련 법령의 강행규정과 배치되는 부분이 있는 경우, 그
          부분에 한하여 본 약관의 해당 규정은 무효로 합니다.
        </li>
        <li>
          본 약관에 명시적으로 규정되지 않고, 당사자간에 미리 합의되지 않은
          사항의 처리에 관하여는 관련 법령 및 상관습에 따릅니다.
        </li>
      </List>

      <Subscription>제18조 (분쟁처리담당자 및 이의신청)</Subscription>
      <List>
        <li>
          회원은 서비스 이용과 관련하여 팀에 이의가 있는 경우 팀에 이의를 제기할
          수 있습니다. 분쟁처리책임자의 연락처는 아래와 같습니다.
        </li>
        <SubList>
          <li>분쟁처리책임자의 연락처</li>
          <SubSubList>
            <li>전화 010-4606-4251</li>
            <li>이메일 mojuns@gmail.com</li>
          </SubSubList>
        </SubList>
        <li>
          회원은 제1항에 따라 서면(전자문서를 포함합니다) 또는 기타 수단을
          이용하여 팀에 분쟁처리를 신청할 수 있으며, 팀은 15일 이내에 이에 대한
          조사 또는 처리 결과를 회원에게 안내합니다.
        </li>
        <li>
          회원은 팀의 분쟁처리결과에 대하여 이의가 있을 경우 소비자기본법에 따른
          한국소비자원의 소비자분쟁조정위원회에 팀이 제공하는 서비스 이용과
          관련한 분쟁조정을 신청할 수 있습니다.
        </li>
        <li>
          소비자분쟁조정위원회의 분쟁조정결과 이용과정에서 팀에 책임이 있는
          사실이 밝혀질 경우 팀은 서비스를 이용하면서 발생한 이용대금의 전액을
          부담합니다. 다만 회원 또는 팀이 한국소비자원의 분쟁조정결과에 불복하여
          관할법원에 민사소송을 제기하는 경우에는 그러하지 아니합니다.
        </li>
      </List>

      <Subscription>제19조 (분쟁의 해결)</Subscription>
      <List>
        <li>
          서비스 이용과 관련하여 팀과 회원 사이에 분쟁이 있는 경우 팀과 회원은
          이를 해소하기 위하여 성실히 협의합니다.
        </li>
        <li>
          전항에도 불구하고 팀과 회원의 분쟁이 해결되지 않는 경우, 해당 분쟁의
          해결은 민사소송법에 따라 관할을 가지는 법원의 판결에 따르기로 합니다.
        </li>
      </List>

      <SubTitle>부칙</SubTitle>
      <h3>제1조(시행일)</h3>
      <p>본 약관은 2024년 10월 6일부터 시행됩니다.</p>
    </div>
  )
}

const containerStyle = css`
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-size: 14px;
`

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  font-size: 22px;
  padding: 24px 0;
  font-weight: 600;
`

const SubTitle = styled.h2`
  color: #2c3e50;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  padding-top: 10px;
  font-size: 18px;
`

const List = styled.ol`
  padding-left: 30px;
  list-style: decimal-leading-zero;
`

const SubList = styled.ul`
  padding-left: 30px;
  list-style: decimal;
`

const Subscription = styled.h3`
  font-size: 16px;
  padding: 10px 0;
`

const SubSubList = styled.div`
  padding-left: 30px;
  list-style: upper-alpha;
`

export default ServiceTerms