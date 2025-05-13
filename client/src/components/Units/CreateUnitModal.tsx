/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import { useState } from 'react';
import { App, Button, Form, Modal } from 'antd';

import { useUnitsContext } from '@contexts/Units.context';
import { createUnit } from '@services/Unit.service';
import { handleServiceError, hasServiceError } from '@helpers/Service.helper';

import { UnitFields, type Values } from './UnitFields';

export default function CreateUnitModal() {
  const [form] = Form.useForm<Values>();
  const [isSending, setIsSending] = useState(false);

  const {
    isCreateModalVisible,
    setIsCreateModalVisible,
    fetchUnits,
  } = useUnitsContext();

  const app = App.useApp();

  const handleCancel = () => {
    form.resetFields();
    setIsCreateModalVisible(false);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    setIsSending(true);
    const response = await createUnit(values);
    setIsSending(false);

    if (hasServiceError(response)) {
      return handleServiceError(app, response);
    }

    app.message.success('Unidade criada com sucesso!');
    fetchUnits();
    handleCancel();
  };

  return (
    <Modal
      title="Cadastrar Unidade"
      open={isCreateModalVisible}
      confirmLoading={isSending}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isSending}
        >
          Confirmar
        </Button>,
      ]}
    >
      <Form<Values> form={form} layout="vertical">
        <UnitFields />
      </Form>
    </Modal>
  );
}
