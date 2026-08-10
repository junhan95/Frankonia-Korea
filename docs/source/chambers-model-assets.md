# Chambers 모델 — 에셋 원장

수집일 **2026-08-11**. 출처는 본사 모델 페이지 26개
(`frankonia-solutions.com/portfolio/<슬러그>/`). 경로는 모두 `public/chambers/models/`.

## 1. 수집 방법과 결과

이미지 URL은 페이지 HTML에서 직접 뽑았다. 지연 로딩이라 `<img src>`만 보면 절반을
놓친다 — `srcset`·`href`(라이트박스)·`content`(og:image)까지 훑어야 전부 나온다.
WordPress `-1800x1024` 류 접미사는 축소본이므로 **접미사를 떼어 원본**을 받았다.

| | |
|---|---|
| 원본 수집 | **100건** (모델 26개, 페이지 등장 순서 유지) |
| md5 고유 | 98건 |
| 원본 총량 | 211 MB (최대 3680×2456 · 6.6 MB) |
| 변환 후 | **98개 파일 · 14 MB** |

변환 — `sharp`, webp, **업스케일 없음**(`withoutEnlargement`).

- 정사각 원본(1400×1400 · 2500×2500)은 본사의 **흰 배경 절개 렌더**다. 도판이 아니라
  카드에 들어가므로 900px 상자.
- 그 외는 1600px 상자, quality 82.
- 압축이 듣지 않는 네 장은 상자와 quality를 낮춰 다시 인코딩했다
  (`shielded-room-6` 760px/q68 · `mil-std-chamber-advanced-4` 1200px/q72 ·
  `sac-3-square-2` 1100px/q76 · 그 외 세로 사진 q74~76).
  `shielded-room-6`은 오래된 아카이브 사진이라 화면 노이즈가 많다 — 223 KB가 한계다.

이름은 `<모델 슬러그>-<n>.webp`. **`-0`은 본사 포트폴리오 카드 이미지**(대개 절개 렌더),
`-1` 이후가 실제 촬영 사진이다. 페이지 등장 순서를 그대로 쓴 것이라, 나중에 원본과
대조할 때 순서만으로 찾을 수 있다.

## 2. 모델별

| 모델 슬러그 | 장수 | 파일 | 원본 폴더 |
|---|--:|---|---|
| `actc` | 3 | actc-0(렌더 900²) · actc-1 · actc-2 | 2017/07/ACTC-{3,1,2} |
| `ucc` | 3 | ucc-0(렌더) · ucc-1 · ucc-2 | 2017/07/UCC-{3,1-1,2} |
| `sac-10-v` | 10 | sac-10-v-0 … -9 | 2017/07/SAC-10V-*, RN_0709_*, 2024/12/RN_0709_026-1 |
| `avtc` | 6 | avtc-0(렌더) · avtc-1 … -5 | 2017/07/AVTC-{6,1-1,2,3,4,5} |
| `mil-chc` | 2 | mil-chc-0(렌더) · mil-chc-2 | 2017/06/MIL-CHC-{3,1} |
| `mil-std-chamber` | 2 | mil-std-chamber-0 · -1 | 2017/07/MIL-STD-Chamber{-1,} |
| `mil-std-chamber-advanced` | 5 | -0 … -4 | 2017/07/MIL-STD-{Chamber-Advanced,Adv-1..4} |
| `sac-3-plus` | 3 | sac-3-plus-0 · -1 · -2 | 2017/07/SAC-3-Plus-{L,1,2} |
| `sac-3-square` | 3 | sac-3-square-0 · -1 · -2 | 2017/07/SAC-3-{Square-2,Sq-1,Sq-2} |
| `sac-5-plus` | 3 | sac-5-plus-0 · -1 · -2 | 2017/07/SAC-5-Plus-{3,1-1,2-1} |
| `sac-5-square` | 3 | sac-5-square-0 · -1 · -2 | 2019/05/SAC-5-{Square-2,Sq-1,Sq-2} |
| `sac-10-plus` | 3 | sac-10-plus-0(렌더) · -1 · -2 | 2017/07/SAC-10-Plus{,-1,-2} |
| `triton` | 5 | triton-0(렌더) · -1 … -4 | 2017/07/SAC-10-Plus-Triton-{5,1,2,3,4} |
| `sac-10-h-hybrid` | 4 | -0(렌더) · -1 · -2 · -3 | 2017/07/SAC-10{_H,-Hybrid-1,-2,-3} |
| `sac-10-p-pyramid` | 3 | -0(렌더) · -1 · -2 | 2017/07/SAC-10{_P,-P_01,-P_02} |
| `fac-3` | 3 | fac-3-0 · -1 · -2 | 2017/07/FAC-3-{4,1-2,2-1} |
| `fac-3-l` | 3 | fac-3-l-0 · -1 · -2 | 2017/07/FAC-3-L-{3,1-1,2-1} |
| `sac-3-fac-3-transformer` | 3 | -0 · -1 · -2 | 2017/07/SAC-{3-FAC-3-Transformers-1,FAC-Trans-1-scaled,-2-scaled} |
| `chc` | 3 | chc-0(렌더) · chc-1 · chc-2 | 2017/07/{CHC-1,Picture-CHC-1-2,Picture-CHC-2-1} |
| `chc-plus` | 3 | chc-plus-0 · -1 · -2 | 2017/07/CHC-Plus-{3,2,1} |
| `ctc` | 3 | ctc-1 · ctc-2 · ctc-3 | 2023/02/CTC-{2,1,3} |
| `edtc` (EDTC-SA) | 5 | edtc-0 … -4 | 2017/07/Picture-EDTC · 2016/12/EDTC · 2023/02/EDTC-{1,2,3} |
| `edtc-ax` | 2 | edtc-ax-0 · edtc-ax-1 | 2019/05/RN_0572_024 · EDTC-AX-Copper-_transp_back.png |
| `edtc-bb` | 2 | edtc-bb-0 · -1 | 2017/07/EDTC-BB-{1,2} |
| `reverberation-solutions` | 3 | -0 · -1 · -2 | 2023/02/RVC-Chamber · 2024/07/RVC-{2,1} |
| `shielded-room` | 10 | -0 … -9 | 2017/07/{SRoom-1,SRoom-2,F199010_Raum3-20} · 2023/02/{CR-1,AR-1,SR-1,SR-2,SR-3} · 2024/12/RN_0708_{010,015-2} |

원본 폴더는 `https://frankonia-solutions.com/wp-content/uploads/` 아래다.

## 3. 버린 것

| 파일 | 이유 |
|---|---|
| `ctc-0` (2023/02/CTC.jpg) | **md5가 `2017/07/ACTC-3.jpg`와 같다.** 본사가 CTC 페이지에 ACTC 렌더를 재사용하고 있다. 같은 그림을 두 모델의 대표 이미지로 쓸 수 없다. CTC에는 실제 사진 3장이 따로 있다 (`chambers-assets.md` §2가 2026-08-10에 이미 기록한 사안) |
| `mil-chc-1` (2017/06/MIL-CHC-2.jpg) | `MIL-CHC-3.jpg`와 md5 동일. 본사가 같은 파일을 두 이름으로 올려 두었다 |

## 4. 카탈로그·포토북에서는 추출하지 않았다

사용자가 추출을 승인했으나(2026-08-11), **실제로는 필요가 없었다.**

본사 웹의 모델 페이지 사진은 원본이 2880×1920(대부분)에서 3680×2456(최대)이고,
모델당 2~10장이 있다. 카탈로그 스프레드에 실린 사진과 **같은 촬영본**으로 보이며,
웹 쪽이 이미 인쇄 해상도에 준한다. 사진이 가장 적은 모델(EDTC-AX·EDTC-BB·MIL-STD
Chamber 각 2장)도 페이지 하나를 채우는 데 부족하지 않다.

그래서 카탈로그·포토북 PDF는 **텍스트 원본으로만 쓰고 이미지는 뽑지 않았다.**
본사가 공개 호스팅하지 않는 자료를 우리가 공개하는 일도 피할 수 있게 됐다
(`catalogue-2026.md` §4의 판단과 같은 결론).

**남는 용도** — 포토북은 여전히 랜딩·기술 토픽용 대형 사진의 공급원이다.
`chambers-assets.md` §3의 "채우지 못한 자리"는 이 수집으로 해결되지 않았다.

## 5. 선별 (Phase B, 2026-08-11)

**98장 가운데 26장만 남기고 지웠다.** 모델 페이지 하나가 도판 하나를 쓰고, 26개 페이지가
있으므로 26장이다. 4.0 MB.

선별 방법은 모델별 컨택트시트를 만들어 **실제로 보고** 고른 것이다. 고른 기준은 그
모델이 다른 모델과 갈라지는 지점을 보여 주는가였다:

| 모델 | 고른 사진 | 왜 |
|---|---|---|
| `sac-3-plus` | `sac-3-plus-1` | 돔 천장의 아치가 보인다 |
| `sac-10-h-hybrid` | `sac-10-h-hybrid-1` | 하단 페라이트 · 상단 흡수체의 두 층 |
| `sac-10-p-pyramid` | `sac-10-p-pyramid-2` | 페라이트 없이 롱피라미드만 |
| `sac-10-plus-triton` | `triton-2` | 다각형 셸과 바닥 흡수체 대기 위치 |
| `fac-3` · `fac-3-l` | `fac-3-2` · `fac-3-l-2` | 바닥에도 흡수체가 깔린다 |
| `sac-3-fac-3-transformer` | `…-1` | 접지면이 드러난 SAC 구성 |
| `ucc` | `ucc-2` | 구리 접지판 |
| `sac-10-v` | `sac-10-v-5` | 턴테이블 위의 차량과 배기 덕트 |
| `mil-std-chamber-advanced` | `…-3` | 군용 챔버 안의 2층 버스 |
| `rvc` | `reverberation-solutions-0` | 흡수체가 없고 스터러가 돌아간다 |
| `shielded-room` | `shielded-room-7` | 차폐문 — 벽만이 차폐가 아니다 |

alt와 caption은 `modelBody`에 들어 있다. **alt는 사진에 실제로 보이는 것만** 적었고,
caption은 그 사진이 왜 이 모델의 사진인지를 말한다 — 둘을 같은 문장으로 쓰지 않았다.

지운 72장은 이 원장 §2의 원본 경로로 언제든 다시 받을 수 있다. 다시 쓸 만한 것:

- `sac-10-v`의 나머지 8장과 `shielded-room`의 나머지 9장 — 차량 챔버와 차폐룸 갤러리
- 절개 렌더 6장(`-0`, 900×900) — **흰 배경**이라 `.figure` 위에서 흰 상자로 보인다.
  카드 그리드에 쓰려면 `chambers-assets.md` §4가 열어 둔 배경 결정이 먼저다
- `mil-std-chamber-advanced-2`(열린 차폐문 너머의 차량)와 `triton-4`(사람이 들어간 규모감)
