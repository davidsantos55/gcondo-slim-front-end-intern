/* eslint-disable simple-import-sort/imports */
/* eslint-disable indent */
import { Card, Col, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import * as UnitService from '@services/Unit.service';
import * as CondominiumService from '@services/Condominium.service';
import type { Unit } from '@internal-types/Unit.type';



export function Indicators() {
  const [condominiumCount, setCondominiumCount] = useState(0);
  const [unitCount, setUnitCount] = useState(0);
  const [topBySquareMeters, setTopBySquareMeters] = useState<Unit.Model[]>([]);
  const [topByBedrooms, setTopByBedrooms] = useState<Unit.Model[]>([]);

  useEffect(() => {
    CondominiumService.listCondominiums().then((response) => {
      if ('data' in response && 'condominiums' in response.data) {
        setCondominiumCount(response.data.condominiums.length);
      }
    });

  UnitService.listUnits().then((response) => {
      if ('data' in response && 'units' in response.data) {
        const data = response.data.units;

        setUnitCount(data.length);

        const sortedBySquare = [...data]
          .sort((a, b) => (b.square_meters ?? 0) - (a.square_meters ?? 0))
          .slice(0, 5);

        const sortedByBedrooms = [...data]
          .sort((a, b) => (b.bedroom_count ?? 0) - (a.bedroom_count ?? 0))
          .slice(0, 5);

        setTopBySquareMeters(sortedBySquare);
        setTopByBedrooms(sortedByBedrooms);
      }
    });
}, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Card title="Total de Condomínios">{condominiumCount}</Card>
      </Col>
      <Col span={12}>
        <Card title="Total de Unidades">{unitCount}</Card>
      </Col>

      <Col span={24}>
        <Card title="Top 5 Unidades por m²">
          <Table
            size="small"
            pagination={false}
            dataSource={topBySquareMeters}
            columns={[
              { title: 'Nome', dataIndex: 'name' },
              { title: 'm²', dataIndex: 'square_meters' },
            ]}
            rowKey="id"
          />
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Top 5 Unidades por Quartos">
          <Table
            size="small"
            pagination={false}
            dataSource={topByBedrooms}
            columns={[
              { title: 'Nome', dataIndex: 'name' },
              { title: 'Quartos', dataIndex: 'bedroom_count' },
            ]}
            rowKey="id"
          />
        </Card>
      </Col>
    </Row>
  );
}
