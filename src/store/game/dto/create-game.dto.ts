export interface CreateGameDto {
  name: string;
  videoUrl: string;
  iconUrl: string;
  publisherUrl: string;
  releaseDate: Date;
  lastPatchDate?: Date;
  cpi: number;
  pt: number;
  retD1: number;
  retD7: number;
  targetCpi: number;
  targetPt: number;
  targetRetD1: number;
  targetRetD7: number;
  dau: number;
  installs: number;
  malesGenderPercentage: number;
  minAge: number;
  maxAge: number;
}
