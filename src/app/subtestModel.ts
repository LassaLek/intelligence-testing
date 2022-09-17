import { SubtestTypeEnum } from './subtest.type.enum';

export interface SubtestModel {
  id: number;
  boxes: string[];
  result: string[];
  score: number;
  type: string; //SubtestTypeEnum;

  opened?: boolean;
}
