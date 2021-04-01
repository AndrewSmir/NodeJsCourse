import { Request, Response } from 'express';

export function TryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value;
  descriptor.value = async function (req: Request, res: Response) {
    try {
      return await oldValue.call(this, req, res);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  };
}
