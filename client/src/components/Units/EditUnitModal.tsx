/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import { useState } from 'react';
import { App, Divider, Form, Modal } from 'antd';

import { useUnitsContext } from '@contexts/Units.context';
import { handleServiceError, hasServiceError } from '@helpers/Service.helper';
import { sleep } from '@lib/Sleep';
import { updateUnit } from '@services/Unit.service';

import { UnitFields, type Values as UnitValues } from './UnitFields';

export function EditUnitModal() {
  const [isSending, setIsSending] = useState(false);
  const { unit, setUnitId, setIsEditModalVisible, fetchUnits } = useUnitsContext();

  if (!unit) {
    throw new Error('Unidade indefinida para edição');
  }

  const app = App.useApp();
  const [form] = Form.useForm<UnitValues>();

  const close = () => {
    setIsEditModalVisible(false);
    setUnitId(null);
  };

  const onFinish = async (values: UnitValues) => {
    setIsSending(true);
    const response = await updateUnit(unit.id, values);
    await sleep(1000);
    setIsSending(false);

    if (hasServiceError(response)) {
      return handleServiceError(app, response);
    }

    close();
    fetchUnits();
  };

  return (
    <Modal
      open
      title="Editar unidade"
      confirmLoading={isSending}
      onOk={form.submit}
      okText="Confirmar"
      onCancel={close}
      cancelText="Cancelar"
    >
      <Divider />
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
        initialValues={unit}
      >
        <UnitFields />
      </Form>
    </Modal>
  );
}
