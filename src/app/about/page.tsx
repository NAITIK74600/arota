import { InnerPageLayout } from "@/components/layout/InnerPageLayout";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata = {
  title: "About — Arota Digital Agency",
  description: "We're a distributed creative studio of designers, engineers, and visual storytellers. Learn about our story, values, and team.",
};

export default function About() {
  return (
    <InnerPageLayout>
      <AboutPage />
    </InnerPageLayout>
  );
}
