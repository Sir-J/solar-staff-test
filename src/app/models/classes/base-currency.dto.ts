import { RateConverter } from 'app/converters/rate.converter';
import { JsonProperty, SerializeOnlyDecorated } from 'js-ts-mapper';
@SerializeOnlyDecorated()
export class BaseCurrencyDto {
    @JsonProperty()
    base: string = undefined;

    @JsonProperty()
    date: string = undefined;

    @JsonProperty('rates', RateConverter)
    rates: any = undefined;
}
