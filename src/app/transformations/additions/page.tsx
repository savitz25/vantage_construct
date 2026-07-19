import { TransformLifestylePage } from "@/components/transformations/TransformLifestylePage";
import { additionsPage } from "@/lib/transformations/service-pages";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: additionsPage.seoTitle,
  description: additionsPage.seoDescription,
  path: additionsPage.path,
});

export default function Page() {
  return <TransformLifestylePage content={additionsPage} />;
}
