import { TransformLifestylePage } from "@/components/transformations/TransformLifestylePage";
import { kitchensPage } from "@/lib/transformations/service-pages";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: kitchensPage.seoTitle,
  description: kitchensPage.seoDescription,
  path: kitchensPage.path,
});

export default function Page() {
  return <TransformLifestylePage content={kitchensPage} />;
}
