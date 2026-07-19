import { TransformLifestylePage } from "@/components/transformations/TransformLifestylePage";
import { atticsPage } from "@/lib/transformations/service-pages";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: atticsPage.seoTitle,
  description: atticsPage.seoDescription,
  path: atticsPage.path,
});

export default function Page() {
  return <TransformLifestylePage content={atticsPage} />;
}
