import { Router } from 'express';

export function Delete(path: string, router: Router) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    router.delete(path, descriptor.value);
  };
}
