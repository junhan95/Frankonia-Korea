import type { Metadata } from "next";
import CyberShieldPage from "../cybershield-content";

export const metadata: Metadata = {
  title: "CyberShield — Frankonia Korea",
  description: "미션 크리티컬 데이터 인프라를 위한 전자기 보안 경계 — CyberShield 차폐 솔루션.",
};

export default function Page() {
  return <CyberShieldPage lang="ko" />;
}
