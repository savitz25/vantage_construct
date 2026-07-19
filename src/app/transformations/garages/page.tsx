import { TransformLifestylePage } from "@/components/transformations/TransformLifestylePage";
import { garagesPage } from "@/lib/transformations/service-pages";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: garagesPage.seoTitle,
  description: garagesPage.seoDescription,
  path: garagesPage.path,
});

export default function Page() {
  return <TransformLifestylePage content={garagesPage} />;
}
