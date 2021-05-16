import { Request, Response } from 'express';
import { logger } from '../loggers';

export function TryCatch(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value;
  descriptor.value = async function (req: Request, res: Response) {
    try {
      logger.info({ methodName: req.method, arguments: req.body });
      return await oldValue.call(this, req, res);
    } catch (e) {
      process.on('unhandledRejection', function (err) {
        logger.error(`Unhandled rejection ${err}`);
        res.status(500).json({ error: err });
      });
      await Promise.reject(e.message);
    }
  };
}
