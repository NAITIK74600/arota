import { InnerPageLayout } from "@/components/layout/InnerPageLayout";
import { BlogPage } from "@/components/pages/BlogPage";

export const metadata = {
  title: "Insights — Arota Digital Agency",
  description: "Design thinking, engineering deep-dives, and visual retrospectives from the Arota team.",
};

export default function Blog() {
  return (
    <InnerPageLayout>
      <BlogPage />
    </InnerPageLayout>
  );
}
