import type { Metadata } from "next";
import CyberShieldPage from "../../cybershield-content";

export const metadata: Metadata = {
  title: "CyberShield — Frankonia Korea",
  description: "Eine messbare elektromagnetische Sicherheitsgrenze für missionskritische Dateninfrastruktur — CyberShield Schirmungslösungen.",
};

export default function Page() {
  return <CyberShieldPage lang="de" />;
}
