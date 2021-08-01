import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator
} from 'class-validator';
import { getManager } from 'typeorm';

/**
 * Validate unique field in given table in the Database.
 * {table: "tableName"} need to be set.
 */
export function _IsUnique(
  params: { table: string },
  validationOptions?: ValidationOptions
) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: '_isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [params],
      validator: {
        async validate(columnNameValue: any, args: ValidationArguments) {
          try {
            const params = args.constraints[0];
            const record = await getManager().query(
              `SELECT * FROM ${params.table} WHERE ${propertyName} = '${columnNameValue}'`
            );
            if (record[0]) return false;
            return true;
          } catch (error) {
            return false;
          }
        },
        defaultMessage() {
          return propertyName + ' already exists';
        }
      }
    });
  };
}
