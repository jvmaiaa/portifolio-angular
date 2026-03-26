export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  imageUrl: string;
  verifyUrl?: string;
}
