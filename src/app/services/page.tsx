import { InnerPageLayout } from "@/components/layout/InnerPageLayout";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata = {
  title: "Services — Arota Digital Agency",
  description: "UI/UX & Web Development, Graphic Design & Branding, and Video/VFX/3D — three disciplines under one creative roof.",
};

export default function Services() {
  return (
    <InnerPageLayout>
      <ServicesPage />
    </InnerPageLayout>
  );
}
