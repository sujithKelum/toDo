import { registerDecorator, ValidationOptions } from 'class-validator';

export function _IsBooleanCustom(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: '_isBoolean',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === 'true' || value === 'false') {
            return true;
          }
          return false;
        },

        defaultMessage() {
          return propertyName + ' must be a boolean';
        }
      }
    });
  };
}
