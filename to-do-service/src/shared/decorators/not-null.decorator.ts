import { registerDecorator, ValidationOptions } from 'class-validator';

export function _IsNotNull(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: '_isNotNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value == '' || value == null) {
            return false;
          }

          return true;
        },

        defaultMessage() {
          return propertyName + ' should not be null';
        }
      }
    });
  };
}
