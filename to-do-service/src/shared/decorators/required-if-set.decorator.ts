import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * If key is set, value should not be empty
 */
export function _RequiredIfSet(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: '_requiredIfSet',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'undefined') {
            if (value) {
              return true;
            }
            return false;
          }
          return true;
        },

        defaultMessage() {
          return propertyName + ' should not be empty';
        }
      }
    });
  };
}
