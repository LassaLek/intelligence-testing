import { SubtestTypeEnum } from './subtest.type.enum';

export interface SubtestModel {
  id: number; // TODO test id
  boxes: string[]; // TODO color enum
  result: string[];
  score: number;
  type: string; //SubtestTypeEnum;
}
