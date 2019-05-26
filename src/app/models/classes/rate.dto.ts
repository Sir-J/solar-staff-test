import { JsonProperty, SerializeOnlyDecorated } from 'js-ts-mapper';

export class RateDto {
    name: string;

    rate: number;

    constructor(_name?: string, _rate?: number) {
        this.name = _name;
        this.rate = _rate;
    }
}
