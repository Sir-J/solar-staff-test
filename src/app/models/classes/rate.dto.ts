import { JsonProperty, SerializeOnlyDecorated } from 'js-ts-mapper';

export class RateDto {
    @JsonProperty()
    name: string;

    @JsonProperty()
    rate: number;

    constructor(_name?: string, _rate?: number) {
        this.name = _name;
        this.rate = _rate;
    }
}
