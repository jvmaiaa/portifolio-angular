export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  projectUrl: string;
  githubUrl?: string;
  featured: boolean;
}
