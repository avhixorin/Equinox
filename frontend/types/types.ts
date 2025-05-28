

export type article = {
  id: string;
  category: string;
  time: string;
  title: string;
  views: string;
  shares: string;
  sources: Source[];
  image: string;
};

interface Source {
  name: string;
  icon: string;
  url: string;
  newsHeadline: string;
  shortDescription: string;
  content: string
}
