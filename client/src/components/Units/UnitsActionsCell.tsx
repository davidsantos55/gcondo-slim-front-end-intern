
/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import { useState } from 'react';
import { App, Button, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useUnitsContext } from '@contexts/Units.context';
import { deleteUnit } from '@services/Unit.service';
import { handleServiceError, hasServiceError } from '@helpers/Service.helper';
import { sleep } from '@lib/Sleep';

import type { Unit } from '@internal-types/Unit.type';

type Props = { unit: Unit.Model };

export function UnitsActionsCell({ unit }: Props) {
  const [isPopconfirmVisible, setIsPopconfirmVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { setUnitId, setIsEditModalVisible, fetchUnits } = useUnitsContext();
  const app = App.useApp();

  const handleEdit = () => {
    setUnitId(unit.id);
    setIsEditModalVisible(true);
  };

  const handleDelete = async () => {
    setIsSending(true);
    const response = await deleteUnit(unit.id);
    await sleep(1000);
    setIsSending(false);

    if (hasServiceError(response)) {
      return handleServiceError(app, response);
    }

    setIsPopconfirmVisible(false);
    fetchUnits();
  };

  return (
    <Space size="middle">
      <Button
        type="text"
        icon={<EditOutlined />}
        title="Editar"
        onClick={handleEdit}
      />
      <Popconfirm
        title="Excluir unidade"
        description="Deseja realmente excluir esta unidade?"
        open={isPopconfirmVisible}
        okText="Sim"
        cancelText="Não"
        okType="danger"
        okButtonProps={{ loading: isSending }}
        onConfirm={handleDelete}
        onCancel={() => setIsPopconfirmVisible(false)}
      >
        <Button
          type="text"
          icon={<DeleteOutlined />}
          title="Excluir"
          onClick={() => setIsPopconfirmVisible(true)}
        />
      </Popconfirm>
    </Space>
  );
}
