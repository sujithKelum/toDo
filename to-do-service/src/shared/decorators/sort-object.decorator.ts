import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const _SortObject = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const sort = {};
    const request = ctx.switchToHttp().getRequest();

    const sortString = request['query']['sort_by'];

    if (sortString) {
      const sortingParamsArray = sortString.trim().split(',');
      sortingParamsArray.forEach((value: string) => {
        if (value.trim()) {
          const tempArray = value.trim().split('|');
          sort[tempArray[0].trim()] =
            tempArray[1].trim().toLowerCase() == 'desc' ? 'DESC' : 'ASC';
        }
      });
    }
    return sort;
  }
);
