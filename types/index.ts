export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl: string;
  videoUrl?: string;
  duration: string;
  year: number;
  rating: string;
  categories: string[];
  match: number;
}
