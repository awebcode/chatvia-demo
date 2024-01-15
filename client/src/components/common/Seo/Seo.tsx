import { Helmet } from "react-helmet-async";
import { SeoData } from "../../../models";

export interface ISeoProps {
  data: SeoData;
}

export function Seo({ data }: ISeoProps) {
  const { title, description, url, thumbnailUrl } = data;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnailUrl} />
    </Helmet>
  );
}
