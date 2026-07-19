import { TransformLifestylePage } from "@/components/transformations/TransformLifestylePage";
import { primarySuitePage } from "@/lib/transformations/service-pages";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: primarySuitePage.seoTitle,
  description: primarySuitePage.seoDescription,
  path: primarySuitePage.path,
});

export default function Page() {
  return <TransformLifestylePage content={primarySuitePage} />;
}
