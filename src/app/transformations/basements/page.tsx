import { TransformLifestylePage } from "@/components/transformations/TransformLifestylePage";
import { basementsPage } from "@/lib/transformations/service-pages";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: basementsPage.seoTitle,
  description: basementsPage.seoDescription,
  path: basementsPage.path,
});

export default function Page() {
  return <TransformLifestylePage content={basementsPage} />;
}
