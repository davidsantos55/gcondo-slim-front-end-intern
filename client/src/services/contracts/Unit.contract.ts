import type { Unit } from '@internal-types/Unit.type';

export namespace ListUnits {
  export type Response = {
    statusCode: number;
    data: { units: Unit.Model[] };
  };
}

export namespace FindUnit {
  export type Response = {
    statusCode: number;
    data: { unit: Unit.Model };
  };
}

export namespace CreateUnit {
  export type Body = Pick<
    Unit.Model,
    'name' | 'square_meters' | 'bedroom_count' | 'condominium_id'
  >;
  export type Response = {
    statusCode: number;
    data: { unit: Unit.Model };
  };
}

export namespace UpdateUnit {
  export type Body = CreateUnit.Body;
  export type Response = CreateUnit.Response;
}

export namespace DeleteUnit {
  export type Response = {
    statusCode: number;
    message: string;
  };
}
