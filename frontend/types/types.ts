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

export interface Source {
  id: string;
  name: string;
  icon: string;
  url: string;
  newsHeadline: string;
  shortDescription: string;
  content: string;
}
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}
export type User = {
  name: string;
  email: string;
  profilePicture: string;
  bookmarks: string[];
  settings: {
    theme: Theme;
  };
};

export type Category = {
  name: string;
  image: string;
  icon: React.ReactNode;
}
