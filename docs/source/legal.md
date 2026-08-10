# Imprint · Privacy — 원장

수집일 **2026-08-10**. 출처: [frankonia-solutions.com/imprint](https://frankonia-solutions.com/imprint/),
[frankonia-solutions.com/company/dataprivacy](https://frankonia-solutions.com/company/dataprivacy/).

대상 페이지: `/imprint` · `/privacy` (그리고 `/ko/imprint` · `/ko/privacy`).

## 1. Imprint — 그대로 옮긴 것

본사 임프린트의 사업자 정보는 **웹사이트가 아니라 회사를 식별하는 값**이므로 한 글자도 바꾸지
않고 옮겼다. 두 법인 모두 본사가 나란히 게시하고 있어 그대로 둘 다 싣는다.

| 항목 | Frankonia Germany EMC Solutions GmbH | Frankonia EMC Test-Systems GmbH |
|---|---|---|
| 주소 | Industriestraße 16, 91180 Heideck | Daimlerstr. 17, 91301 Forchheim |
| 전화 / 팩스 | +49 9177 98-500 / -520 | +49 9191 73666-0 / -20 |
| 이메일 | info@frankoniagroup.com | sales@frankonia-emv.com |
| 대표이사 | Wolfgang Opitz, Dr. Daniel Feyerlein | Peter Weidner, Thomas Weidner |
| 부가세 | DE 133565240 | DE 151302710 |
| 등기 | Nuremberg HRB 8052 | Bamberg HRB 2301 |
| WEEE | — | DE 63547070 |

값은 `app/legal-sections.ts`의 `entities`에 있고, 로케일 표 **바깥**이다. 등기 상호·등기번호·
부가세번호는 번역 대상이 아니다.

빌드된 페이지와 본사 원문을 19개 항목 기계 대조 — **불일치 0**.

**한 가지 바꾼 것:** 본사는 이메일을 `info[at]frankoniagroup.com`으로 난독화해 두었으나, 이
사이트는 클릭 가능한 `mailto:`로 렌더한다. TMG §5는 "즉각적인 전자적 연락을 가능하게 하는"
주소를 요구하고, 링크가 그 요건에 더 가깝다.

**이용약관(14개 절)은 옮기지 않았다.** 본사가 관리하는 문서이고, 사본을 두면 갱신이 멈추는
쪽이 이쪽이 된다. 페이지에서 본사 원문으로 링크한다.

## 2. Privacy — 그대로 옮기지 **않은** 것과 그 이유

본사 개인정보 선언문(47,000자)은 다음을 전제로 쓰여 있다:

- 서버 로그 + **쿠키 및 분석 서비스**(§4, §5)
- **뉴스레터** 구독
- **서버로 전송되는 문의 폼** ("요청 완료 후 자동 삭제")

**이 사이트에는 넷 중 어느 것도 없다.** 그대로 옮겼다면 하지 않는 처리를 한다고 선언하는
것이 되고, 이는 낡은 문장이 아니라 **개인정보 처리에 관한 허위 기재**다.

그래서 회사에 속한 부분(처리 책임자, 개인정보보호 책임자, 정보주체의 권리)은 본사를 따르고,
사이트에 속한 부분은 **측정해서** 썼다.

### 측정 결과 (2026-08-10, 스테이징 빌드)

| 항목 | 결과 |
|---|---|
| 쿠키 | 없음 (`document.cookie` 빈 문자열) |
| localStorage / sessionStorage / IndexedDB | 전부 비어 있음 |
| 서비스 워커 | 등록 0 |
| **오리진 밖 요청** | **0건** — 랜딩·CyberShield 두 페이지 모두 |
| 분석·태그·광고 | 없음 |
| 폼 | 랜딩 0개. MyChamber 1개 — `preventDefault()` 후 `mailto:` 링크로 **방문자의 메일 클라이언트를 열 뿐, 전송하지 않는다** (`app/mychamber-wizard.tsx:518`). CyberShield 페이지가 갖고 있던 문의 양식은 2026-08-11 요약본 전환으로 사라졌다 — 그 양식은 이제 제품 사이트에만 있다 |
| 외부 링크 | frankonia-solutions.com, frankonia-cybershield.com |

개인정보보호 책임자는 본사가 명시한 **Melanie Kolb (kolb@grothprojekt.de)**.

## 3. 오픈 전에 확인이 필요한 것

- **법률 검토.** 이 두 페이지는 본사 원문과 측정된 사실에 근거해 작성했지만 법률 자문을 받은
  문서가 아니다. 정식 도메인 이전 전에 본사 법무 또는 개인정보보호 책임자의 확인이 필요하다.
- **서버 로그 보존 기간.** 방침은 "필요한 기간"이라고만 적었다. 실제 기간은 호스팅 사업자
  설정에 달려 있고 확인되지 않았다 — 지어내지 않았다. Hetzner 설정을 확인해 구체적인 기간을
  채워야 한다.
- **호스팅 사업자 표기.** 현재 스테이징은 GitHub Pages, 프로덕션은 Hetzner다. 방침은 "호스팅
  사업자"로만 적었다. 정식 도메인에서는 수탁자(Auftragsverarbeiter)로서 사업자명을 밝히고
  DPA 체결 여부를 적는 것이 일반적이다.
- **본사와 동일 문안 여부.** 본사가 자사 사이트와 같은 문안을 쓰기를 원할 수도 있다. 그 경우
  위 §2의 사유(허위 기재 위험)를 함께 전달해야 한다.

## 4. 함께 고친 것

푸터의 "개인정보처리방침" 링크는 `href="#"`이었다 — 84페이지 전부에서 아무 데도 가지 않는
링크였다. 이제 두 페이지로 연결되고, 임프린트 링크가 새로 추가되었다.
