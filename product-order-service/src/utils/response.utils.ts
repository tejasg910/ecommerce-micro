import { Response } from 'express';

export const sendSuccessResponse = (res: Response, data: any, message: string = 'Success') => {
  res.status(200).json({ success: true, message, data });
};

export const sendErrorResponse = (res: Response, message: string, status: number = 400) => {
  res.status(status).json({ success: false, message });
};
