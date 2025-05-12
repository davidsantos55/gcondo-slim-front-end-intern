/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import { Fragment, useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber } from 'antd';

import type { Condominium } from '@internal-types/Condominium.type';
import { listCondominiums } from '@services/Condominium.service';
import type { ListCondominiums } from '@services/contracts/Condominium.contract';
import { hasServiceError } from '@helpers/Service.helper';

export type Values = {
  condominium_id: number;
  name: string;
  square_meters: number;
  bedroom_count: number;
};

export function UnitFields() {
  const [condominiums, setCondominiums] = useState<Condominium.Model[]>([]);

  useEffect(() => {
    (async () => {
      // ⬇️ Aqui o `as` recai sobre o resultado da promise
      const response = (await listCondominiums()) as ListCondominiums.Response;

      // ⬇️ Se não for um erro, podemos usar `response.data.condominiums`
      if (!hasServiceError(response)) {
        setCondominiums(response.data.condominiums);
      }
    })();
  }, []);

  return (
    <Fragment>
      <Form.Item<Values>
        name="condominium_id"
        label="Condomínio"
        rules={[{ required: true, message: 'Por favor, selecione um condomínio.' }]}
      >
        <Select
          placeholder="Selecione o condomínio"
          options={condominiums.map(c => ({
            label: c.name,
            value: c.id
          }))}
        />
      </Form.Item>

      <Form.Item<Values>
        name="name"
        label="Nome da unidade"
        rules={[{ required: true, message: 'Por favor, digite um nome.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Values>
        name="square_meters"
        label="Metros quadrados"
        rules={[{ required: true, message: 'Por favor, digite a metragem.' }]}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>

      <Form.Item<Values>
        name="bedroom_count"
        label="Quantidade de quartos"
        rules={[{ required: true, message: 'Por favor, digite a quantidade de quartos.' }]}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>
    </Fragment>
  );
}
