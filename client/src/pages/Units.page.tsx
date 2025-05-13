/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import { Fragment } from 'react';
import { Button,Row, Typography, Table } from 'antd';
import  CreateUnitModal  from '@components/Units/CreateUnitModal';
import { EditUnitModal } from '@components/Units/EditUnitModal';
import { UnitsActionsCell } from '@components/Units/UnitsActionsCell';
import { UnitsContextProvider } from '@contexts/Units.context';
import type { Unit } from '@internal-types/Unit.type';
import { Show } from '@lib/Show';

const COLUMNS = [
  { title: 'ID', dataIndex: 'id', render: (v: number) => `#${v}` },
  { title: 'Nome', dataIndex: 'name' },
  { title: 'm²', dataIndex: 'square_meters' },
  { title: 'Quartos', dataIndex: 'bedroom_count' },
  { title: 'Condomínio', dataIndex: ['condominium', 'name'] },
  { render: (_: unknown, record: Unit.Model) => <UnitsActionsCell unit={record} /> }
];

export function UnitsPage() {
  return (
    <UnitsContextProvider>
      {({
        units,
        isLoading,
        setIsCreateModalVisible,
        isCreateModalVisible,
        isEditModalVisible
      }) => (
        <Fragment>
          <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Typography.Title level={3}>Unidades</Typography.Title>
            <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
              Cadastrar unidade
            </Button>
          </Row>

          <Table
            dataSource={units}
            columns={COLUMNS}
            loading={isLoading}
            rowKey="id"
          />

          <Show when={isCreateModalVisible}>
            <CreateUnitModal />
          </Show>

          <Show when={isEditModalVisible}>
            <EditUnitModal />
          </Show>
        </Fragment>
      )}
    </UnitsContextProvider>
  );
}