export interface IExperience {
  _id: string;
  userId: string;
  position: string;
  federationTeam: string;
  nowIn: boolean;
  place: string;
  initDate: Date;
  finishDate: Date;
  title: string;
  description: string;
  multimediaContent: string[];
  date: Date;
  deleted: boolean;
}