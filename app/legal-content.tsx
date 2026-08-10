import PageShell from "./page-shell";
import StructuredData from "./structured-data";
import {
  dataProtectionOfficer as dpo,
  entities,
  headOfficeLegal,
  legalMeta,
  legalPath,
  type LegalSection,
} from "./legal-sections";
import type { Lang } from "./site-config";

/* The imprint and the privacy declaration.

   The imprint is the head office's own particulars, carried over unchanged —
   they identify companies, not this website, so they transfer verbatim.

   The privacy declaration does not. The head office's describes cookies, an
   analytics service, a newsletter and a server-side contact form; this site
   has none of those, and saying otherwise would be a false statement about
   data processing rather than a stale sentence. So this page states what this
   site actually does, measured rather than assumed: no cookies, no storage,
   no request to any other host, and a CyberShield enquiry form that composes
   mail in the reader's own client and posts nothing anywhere. The parts that
   belong to the companies rather than to the site — who the controller is,
   who the data protection officer is, what rights a data subject has — follow
   the head office, and the full declaration is linked rather than copied. */

const copy = {
  en: {
    imprint: {
      eyebrow: "IMPRINT",
      title: "Imprint",
      intro: "Information under §5 of the German Telemedia Act (TMG).",
      labels: {
        address: "Address",
        phone: "Phone",
        fax: "Fax",
        email: "Email",
        directors: "Managing Directors",
        vat: "VAT registration no.",
        register: "Registry court",
        weee: "WEEE reg. no.",
      },
      termsHead: "Terms of use",
      terms:
        "The terms governing use of Frankonia's websites — scope, rights of use, intellectual property, liability and export control — are maintained by the head office and apply to this site as published there.",
      termsLink: "Read the terms of use at the head office",
      privacyLink: "Privacy policy for this site",
    },
    privacy: {
      eyebrow: "PRIVACY",
      title: "Privacy Policy",
      intro:
        "What this website does with personal data, and what it does not do. Information under Art. 13 of the General Data Protection Regulation.",
      controllerHead: "1. Controller and data protection officer",
      controllerNote:
        "The data protection officer can be reached at the address above, or by email.",
      visitHead: "2. When you visit this site",
      visit: [
        "This site is a set of static files. No application code runs on the server for it and it keeps no database.",
        "Delivering a page still means your device makes a request, and the hosting provider records that request in a server log: the IP address it came from, the date and time, the file requested, the page you came from, and the browser and operating system your device reports.",
        "That data is processed to deliver the site, to keep it available and stable, and to investigate misuse. The legal basis is Art. 6(1)(f) GDPR — our legitimate interest in operating the site. It is not combined with any other source and is not used to work out who you are.",
      ],
      noneHead: "3. No cookies, no tracking, nothing loaded from elsewhere",
      none: [
        "This site sets no cookies. It writes nothing to local storage, session storage or a local database, and it registers no service worker.",
        "It uses no analytics, no tag manager and no advertising or tracking technology of any kind.",
        "It requests nothing from any other domain. The typefaces are built into the site rather than fetched from Google Fonts, and there are no embedded maps, video players or social widgets. Because no third party is contacted, no third party learns that you were here.",
      ],
      contactHead: "4. Getting in touch",
      contact: [
        "There is no form on this site that sends anything to a server. The email addresses are ordinary mail links, and the enquiry form on the CyberShield page fills in a message in your own mail program: nothing leaves your device through this website.",
        "Your details reach us only when you send that mail yourself. We then use them to answer you and, where your enquiry leads to one, to prepare and perform a contract — Art. 6(1)(b) and (f) GDPR. We keep the correspondence for as long as answering it and the applicable retention rules require.",
      ],
      linksHead: "5. Links to other sites",
      links:
        "This site links to frankonia-solutions.com and to frankonia-cybershield.com. Once you follow such a link the other site takes over, and its own declaration applies to what happens there.",
      rightsHead: "6. Your rights",
      rights: [
        "You have the right to obtain confirmation of whether we process your personal data and to access it, to have inaccurate data corrected, to have data erased or its processing restricted, to receive your data in a portable form, and to object to processing based on legitimate interests.",
        "You may also lodge a complaint with a data protection supervisory authority.",
        "To exercise any of these, write to the data protection officer named above. The complete declaration, covering the head office's own site, its newsletter and business relationships beyond this website, is published by the head office.",
      ],
      rightsLink: "Full data protection declaration at the head office",
      imprintLink: "Imprint",
    },
  },
  ko: {
    imprint: {
      eyebrow: "IMPRINT",
      title: "법적 고지",
      intro: "독일 원격매체법(TMG) 제5조에 따른 사업자 정보.",
      labels: {
        address: "주소",
        phone: "전화",
        fax: "팩스",
        email: "이메일",
        directors: "대표이사",
        vat: "부가가치세 등록번호",
        register: "등기 법원",
        weee: "WEEE 등록번호",
      },
      termsHead: "이용약관",
      terms:
        "Frankonia 웹사이트 이용에 관한 약관 — 적용 범위, 이용 권한, 지식재산권, 책임, 수출 통제 — 은 본사가 관리하며, 본사에 게시된 내용이 이 사이트에도 적용됩니다.",
      termsLink: "본사에서 이용약관 보기",
      privacyLink: "이 사이트의 개인정보처리방침",
    },
    privacy: {
      eyebrow: "PRIVACY",
      title: "개인정보처리방침",
      intro:
        "이 웹사이트가 개인정보로 무엇을 하고, 무엇을 하지 않는지. GDPR 제13조에 따른 안내입니다.",
      controllerHead: "1. 처리 책임자와 개인정보보호 책임자",
      controllerNote:
        "개인정보보호 책임자에게는 위 주소 또는 이메일로 연락하실 수 있습니다.",
      visitHead: "2. 이 사이트를 방문할 때",
      visit: [
        "이 사이트는 정적 파일의 모음입니다. 이를 위해 서버에서 실행되는 애플리케이션 코드가 없고, 데이터베이스도 두지 않습니다.",
        "그래도 페이지를 전달하려면 방문자의 기기가 요청을 보내야 하고, 호스팅 사업자는 그 요청을 서버 로그에 기록합니다 — 요청이 온 IP 주소, 날짜와 시각, 요청된 파일, 유입된 페이지, 그리고 기기가 알리는 브라우저와 운영체제입니다.",
        "이 데이터는 사이트를 전달하고, 가용성과 안정성을 유지하며, 오·남용을 조사하기 위해 처리됩니다. 법적 근거는 GDPR 제6조 제1항 (f)호 — 사이트 운영에 대한 정당한 이익입니다. 다른 어떤 출처와도 결합하지 않으며, 방문자가 누구인지 알아내는 데 쓰지 않습니다.",
      ],
      noneHead: "3. 쿠키 없음, 추적 없음, 외부에서 불러오는 것 없음",
      none: [
        "이 사이트는 쿠키를 설정하지 않습니다. 로컬 스토리지·세션 스토리지·로컬 데이터베이스에 아무것도 기록하지 않으며, 서비스 워커도 등록하지 않습니다.",
        "분석 도구, 태그 관리자, 그리고 어떤 종류의 광고·추적 기술도 사용하지 않습니다.",
        "다른 어떤 도메인에도 요청을 보내지 않습니다. 서체는 Google Fonts에서 가져오지 않고 사이트에 내장되어 있으며, 삽입된 지도·동영상 플레이어·소셜 위젯도 없습니다. 제3자에 접속하지 않으므로, 방문 사실을 알게 되는 제3자도 없습니다.",
      ],
      contactHead: "4. 문의",
      contact: [
        "이 사이트에는 서버로 무언가를 전송하는 폼이 없습니다. 이메일 주소는 일반적인 메일 링크이고, CyberShield 페이지의 문의 양식은 방문자의 메일 프로그램에 내용을 채워 넣습니다 — 이 웹사이트를 통해 기기 밖으로 나가는 것은 없습니다.",
        "보내주신 정보는 방문자가 그 메일을 직접 보냈을 때에만 저희에게 도달합니다. 저희는 이를 답변을 드리기 위해, 그리고 문의가 계약으로 이어지는 경우 계약의 준비와 이행을 위해 사용합니다 — GDPR 제6조 제1항 (b)호 및 (f)호. 왕래한 문서는 답변에 필요한 기간과 관련 보존 규정이 요구하는 기간 동안 보관합니다.",
      ],
      linksHead: "5. 외부 사이트 링크",
      links:
        "이 사이트는 frankonia-solutions.com과 frankonia-cybershield.com으로 연결됩니다. 링크를 따라가면 그 시점부터는 해당 사이트가 이어받으며, 거기에서 일어나는 일에는 그 사이트의 방침이 적용됩니다.",
      rightsHead: "6. 정보주체의 권리",
      rights: [
        "정보주체는 개인정보 처리 여부의 확인과 그 개인정보에 대한 열람, 부정확한 정보의 정정, 삭제 또는 처리 제한, 이동 가능한 형태로의 제공, 그리고 정당한 이익에 근거한 처리에 대한 반대를 요구할 권리가 있습니다.",
        "개인정보 감독기관에 민원을 제기할 권리도 있습니다.",
        "권리 행사는 위에 기재된 개인정보보호 책임자에게 서면으로 요청해 주십시오. 본사 사이트, 뉴스레터, 이 웹사이트를 넘어선 거래 관계까지 포함하는 전체 방침은 본사가 게시하고 있습니다.",
      ],
      rightsLink: "본사의 전체 개인정보보호 선언문",
      imprintLink: "법적 고지",
    },
  },
} as const;

function SectionHead({ title }: { title: string }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
    </div>
  );
}

function Prose({ paras }: { paras: readonly string[] }) {
  return (
    <div className="prose">
      {paras.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** Label and value on a hairline row — the imprint is a list of named fields
 *  and nothing more, so it is rendered as one rather than as prose. */
function Fields({ rows }: { rows: readonly (readonly [string, React.ReactNode])[] }) {
  return (
    <div className="hairline-list">
      {rows.map(([label, value], i) => (
        <div className="hl-row" key={`${label}-${i}`}>
          <b>{label}</b>
          <span className="hl-desc">{value}</span>
        </div>
      ))}
    </div>
  );
}

function ImprintBody({ lang }: { lang: Lang }) {
  const t = copy[lang].imprint;

  return (
    <>
      {entities.map((e) => (
        <section key={e.name}>
          <div className="wrap">
            <SectionHead title={e.name} />
            <Fields
              rows={[
                [t.labels.address, `${e.street}, ${e.city}, ${e.country}`],
                [t.labels.phone, <a key="p" href={`tel:${e.phone.replace(/[^+\d]/g, "")}`}>{e.phone}</a>],
                [t.labels.fax, e.fax],
                // A working address rather than the head office's `info[at]…`
                // spelling: §5 TMG asks for one that allows immediate contact,
                // and a reader should be able to click it.
                [t.labels.email, <a key="e" href={`mailto:${e.email}`}>{e.email}</a>],
                [t.labels.directors, e.directors],
                [t.labels.vat, e.vat],
                [t.labels.register, e.register],
                ...(e.weee ? [[t.labels.weee, e.weee] as const] : []),
              ]}
            />
          </div>
        </section>
      ))}

      <section className="alt">
        <div className="wrap">
          <SectionHead title={t.termsHead} />
          <Prose paras={[t.terms]} />
          <a className="go sec-go" href={headOfficeLegal.imprint} target="_blank" rel="noopener">
            {t.termsLink}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}

function PrivacyBody({ lang }: { lang: Lang }) {
  const t = copy[lang].privacy;

  return (
    <>
      <section>
        <div className="wrap">
          <SectionHead title={t.controllerHead} />
          <Fields
            rows={[
              ...entities.map((e) => [e.name, `${e.street}, ${e.city}, ${e.country}`] as const),
              [
                dpo.name,
                <a key="dpo" href={`mailto:${dpo.email}`}>{dpo.email}</a>,
              ],
            ]}
          />
          <Prose paras={[t.controllerNote]} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <SectionHead title={t.visitHead} />
          <Prose paras={t.visit} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead title={t.noneHead} />
          <Prose paras={t.none} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <SectionHead title={t.contactHead} />
          <Prose paras={t.contact} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead title={t.linksHead} />
          <Prose paras={[t.links]} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <SectionHead title={t.rightsHead} />
          <Prose paras={t.rights} />
          <a className="go sec-go" href={headOfficeLegal.privacy} target="_blank" rel="noopener">
            {t.rightsLink}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}

export default function LegalPage({ lang, section }: { lang: Lang; section: LegalSection }) {
  const { label, description } = legalMeta[lang][section];
  const t = copy[lang][section];

  return (
    <PageShell lang={lang} eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <StructuredData
        lang={lang}
        page="path"
        path={legalPath(section)}
        trail={[{ name: label, path: legalPath(section) }]}
        description={description}
      />
      {section === "imprint" ? <ImprintBody lang={lang} /> : <PrivacyBody lang={lang} />}
    </PageShell>
  );
}
