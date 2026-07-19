import { TransformLifestylePage } from "@/components/transformations/TransformLifestylePage";
import { outdoorPage } from "@/lib/transformations/service-pages";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: outdoorPage.seoTitle,
  description: outdoorPage.seoDescription,
  path: outdoorPage.path,
});

export default function Page() {
  return <TransformLifestylePage content={outdoorPage} />;
}
