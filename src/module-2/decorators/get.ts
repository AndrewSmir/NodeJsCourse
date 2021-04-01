import { Router } from 'express';

export function Get(path: string, router: Router) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    router.get(path, descriptor.value);
  };
}
