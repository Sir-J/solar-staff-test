import { JsonProperty, SerializeOnlyDecorated } from 'js-ts-mapper';

@SerializeOnlyDecorated()
export class RateDto {
    @JsonProperty()
    name: string;

    @JsonProperty()
    value: number;

    constructor(_name?: string, _value?: number) {
        this.name = _name;
        this.value = _value;
    }
}
