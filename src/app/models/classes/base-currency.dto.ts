import { JsonProperty, SerializeOnlyDecorated } from 'js-ts-mapper';
import { RateConverter } from 'src/app/converters/rate.converter';

import { RateDto } from './rate.dto';

@SerializeOnlyDecorated()
export class BaseCurrencyDto {
    @JsonProperty()
    base: string = undefined;

    @JsonProperty()
    date: string = undefined;

    @JsonProperty('rates', RateConverter)
    rates: any = undefined;
}
