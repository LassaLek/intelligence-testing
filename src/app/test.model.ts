import { SubtestModel } from './subtestModel';
import { ResultModel } from './result.model';

export interface TestModel {
  test_id: number; // test_id
  assignments: SubtestModel[];
}
