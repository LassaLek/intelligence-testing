import { AssignmentModel } from './assignment.model';
import { ResultModel } from './result.model';

export interface TestModel {
  test_id: number;
  assignments: AssignmentModel[];
  results: AssignmentModel[];// TODO ?ResultModel[];
}
