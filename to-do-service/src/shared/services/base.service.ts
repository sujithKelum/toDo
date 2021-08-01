import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetDto } from '../dtos/get.dto';
import { _isEmpty, _toBoolean } from '../helpers/core/core-functions';

export class BaseService<T> {
  constructor(protected masterRepository: Repository<T>) {}

  async get(getDto: GetDto, sortObject: object): Promise<object> {
    const query = this.masterRepository.createQueryBuilder('modal');
    query.andWhere('modal.deleted_at IS NULL AND modal.deleted_by IS NULL');
    if (!_isEmpty(getDto.status)) {
      query.andWhere('modal.status = :status', {
        status: _toBoolean(getDto.status)
      });
    }
    if (Object.keys(sortObject).length !== 0) {
      const sortingKeys = Object.keys(sortObject);
      sortingKeys.forEach((value, index) => {
        query.addOrderBy(`modal.${sortingKeys[index]}`, sortObject[value]);
      });
    }

    return {
      data: [...(await query.getMany())]
    };
  }

  async getById(id: string): Promise<object> {
    const query = this.masterRepository.createQueryBuilder('modal');

    query.where('modal.id = :id', {
      id: id
    });
    query.andWhere('modal.deleted_at IS NULL AND modal.deleted_by IS NULL');

    const item = await query.getOne();

    if (item !== undefined) {
      return {
        data: { ...item }
      };
    } else {
      throw new NotFoundException();
    }
  }
}
