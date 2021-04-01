import { ObjectSchema } from 'joi';

export function Validate<T>(schema: ObjectSchema<T>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function (arg: T) {
      const { error } = schema.validate(arg);
      if (error) return Promise.reject(error);
      return oldValue.call(this, arg);
    };
  };
}
