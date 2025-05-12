/* eslint-disable react-refresh/only-export-components */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { App } from 'antd';
import type { Unit } from '@internal-types/Unit.type';
import { listUnits } from '@services/Unit.service';
import { handleServiceError, hasServiceError } from '@helpers/Service.helper';
import { UnknownContextError } from '@errors/UnkownContextError';

type Value = {
  units: Unit.Model[];
  unit: Unit.Model | null;
  unitId: number | null;
  setUnitId: React.Dispatch<React.SetStateAction<number | null>>;
  isLoading: boolean;
  isCreateModalVisible: boolean;
  setIsCreateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isEditModalVisible: boolean;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUnits: () => Promise<void>;
};

export const UnitsContext = createContext<Value | null>(null);

export function UnitsContextProvider({ children }: { children: (value: Value) => React.ReactNode }) {
  const [units, setUnits] = useState<Unit.Model[]>([]);
  const [unitId, setUnitId] = useState<number | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const app = App.useApp();

  const fetchUnits = useCallback(async () => {
    setIsLoading(true);
    const response = await listUnits();
    setIsLoading(false);
    if (hasServiceError(response)) return handleServiceError(app, response);
    setUnits(response.data.units);
  }, [app]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  const unit = useMemo(() => {
    if (!unitId) return null;
    return units.find(u => u.id === unitId) || null;
  }, [unitId, units]);

  const value: Value = {
    units,
    unit,
    unitId,
    setUnitId,
    isLoading,
    isCreateModalVisible,
    setIsCreateModalVisible,
    isEditModalVisible,
    setIsEditModalVisible,
    fetchUnits,
  };

  return <UnitsContext.Provider value={value}>{children(value)}</UnitsContext.Provider>;
}

export function useUnitsContext() {
  const context = useContext(UnitsContext);
  if (!context) throw new UnknownContextError();
  return context;
}
