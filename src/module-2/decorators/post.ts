import { Router } from 'express';

export function Post(path: string, router: Router) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    router.post(path, descriptor.value);
  };
}
