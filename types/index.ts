export interface Movie {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl: string;
  videoUrl?: string | null;
  duration: string;
  year: number;
  rating: string;
  categories: string[];
  match: number;
}
