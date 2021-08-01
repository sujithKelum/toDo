import { PipeTransform, Injectable } from '@nestjs/common';

/*
 * This method will not work for nested objects
 */
@Injectable()
export class InputTrimPipe implements PipeTransform {
  transform(values: object | string) {
    try {
      if (typeof values === 'object') {
        Object.keys(values).forEach((key) => {
          if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
          }
        });
      }
      if (typeof values === 'string') {
        values = values.trim();
      }

      return values;
    } catch (error) {
      console.log(error);
      return values;
    }
  }
}
