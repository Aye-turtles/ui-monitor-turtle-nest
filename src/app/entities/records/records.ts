import {NestsReq, NestsRes} from "../nests/nests";

export class RecordsReq {
  id: number | null;
  nest: NestsReq | null;
  samplingDateTime: Date | null;
  temperature: number | null;  // En TypeScript se usa `number` en lugar de `Float`
  humidityPercentage: number | null;
  energy: number | null;
  x: number | null;
  y: number | null;
  z: number | null;
  isTesting: boolean | null;
  recordNumber: number | null;
  day: number | null;

  constructor(data?: Partial<RecordsReq>) {
    this.id = data?.id ?? null;
    this.nest = data?.nest ?? null;
    this.samplingDateTime = data?.samplingDateTime ? new Date(data.samplingDateTime) : null;
    this.temperature = data?.temperature ?? null;
    this.humidityPercentage = data?.humidityPercentage ?? null;
    this.energy = data?.energy ?? null;
    this.x = data?.x ?? null;
    this.y = data?.y ?? null;
    this.z = data?.z ?? null;
    this.isTesting = data?.isTesting ?? null;
    this.recordNumber = data?.recordNumber ?? null;
    this.day = data?.day ?? null;
  }
}
export class RecordsRes {
  id: number | null;
  nest: NestsRes | null;
  samplingDateTime: Date | null;
  temperature: number | null;
  humidityPercentage: number | null;
  energy: number | null;
  x: number | null;
  y: number | null;
  z: number | null;
  isTesting: boolean | null;
  recordNumber: number | null;
  day: number | null;

  constructor(data?: Partial<RecordsRes>) {
    this.id = data?.id ?? null;
    this.nest = data?.nest ?? null;
    this.samplingDateTime = data?.samplingDateTime ? new Date(data.samplingDateTime) : null;
    this.temperature = data?.temperature ?? null;
    this.humidityPercentage = data?.humidityPercentage ?? null;
    this.energy = data?.energy ?? null;
    this.x = data?.x ?? null;
    this.y = data?.y ?? null;
    this.z = data?.z ?? null;
    this.isTesting = data?.isTesting ?? null;
    this.recordNumber = data?.recordNumber ?? null;
    this.day = data?.day ?? null;
  }
}
