import { appendFile, mkdirSync } from 'node:fs';
import path from 'node:path';
import { NextFunction, Request, Response } from 'express';

export type LogFormat = 'simple' | 'complete';

export const accessLogger = (format: LogFormat, logDirectory: string) => {
  const directory = path.resolve(logDirectory);
  const logFile = path.join(directory, 'access.log');

  mkdirSync(directory, { recursive: true });

  return (req: Request, res: Response, next: NextFunction) => {
    const fields = [new Date().toISOString(), req.url, req.method];

    if (format === 'complete') {
      fields.push(req.httpVersion, req.get('User-Agent') ?? '');
    }

    appendFile(logFile, `${fields.join(' | ')}\n`, (error) => {
      if (error) {
        console.error(`Não foi possível gravar o log: ${error.message}`);
      }
    });

    next();
  };
};
