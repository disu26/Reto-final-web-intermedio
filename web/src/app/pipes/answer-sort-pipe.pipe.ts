import { Pipe, PipeTransform } from '@angular/core';
import { AnswerI } from '../models/answer-i';

@Pipe({
  name: 'answerSortPipe'
})
export class AnswerSortPipePipe implements PipeTransform {

  transform(array: Array<AnswerI>, args: string): Array<AnswerI> {
    return array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
          return 1;
      } else if (a[args] > b[args]) {
          return -1;
      } else {
          return 0;
      }
  });
  }

}
