import { Router } from 'express';

export function Put(path: string, router: Router) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    router.put(path, descriptor.value);
  };
}
