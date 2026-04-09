import { InnerPageLayout } from "@/components/layout/InnerPageLayout";
import { WorkPage } from "@/components/pages/WorkPage";

export const metadata = {
  title: "Work — Arota Digital Agency",
  description: "Our portfolio: web apps, brand identities, and visual production that move needles.",
};

export default function Work() {
  return (
    <InnerPageLayout>
      <WorkPage />
    </InnerPageLayout>
  );
}
