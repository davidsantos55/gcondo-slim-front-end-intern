/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import type {
  ListUnits,
  FindUnit,
  CreateUnit,
  UpdateUnit,
  DeleteUnit,
} from './contracts/Unit.contract';
import { Request } from './Request';

export const listUnits = (): Promise<ListUnits.Response | Error> =>
  Request.get('/units');

export const findUnit = (id: number): Promise<FindUnit.Response | Error> =>
  Request.get(`/units/${id}`);

export const createUnit = (
  body: CreateUnit.Body
): Promise<CreateUnit.Response | Error> => Request.post('/units', body);

export const updateUnit = (
  id: number,
  body: UpdateUnit.Body
): Promise<UpdateUnit.Response | Error> => Request.put(`/units/${id}`, body);

export const deleteUnit = (id: number): Promise<DeleteUnit.Response | Error> =>
  Request.delete(`/units/${id}`);
