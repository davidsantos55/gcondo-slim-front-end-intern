import type { CreateUnit, DeleteUnit, FindUnit, ListUnits, UpdateUnit }  from './contracts/Unit.contract';
import { Request } from './Request';

export const listUnits = (): Promise<ListUnits.Response> => Request.get('/units');
export const findUnit = (id: number): Promise<FindUnit.Response> => Request.get(`/units/${id}`);
export const createUnit = (body: CreateUnit.Body): Promise<CreateUnit.Response> => Request.post('/units', body);
export const updateUnit = (id: number, body: UpdateUnit.Body): Promise<UpdateUnit.Response> => Request.put(`/units/${id}`, body);
export const deleteUnit = (id: number): Promise<DeleteUnit.Response> => Request.delete(`/units/${id}`);