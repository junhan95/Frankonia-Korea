import type { Metadata } from "next";
import CyberShieldPage from "../../cybershield-content";

export const metadata: Metadata = {
  title: "CyberShield — Frankonia Korea",
  description: "A measurable electromagnetic security boundary for mission-critical data infrastructure — CyberShield shielding solutions.",
};

export default function Page() {
  return <CyberShieldPage lang="en" />;
}
