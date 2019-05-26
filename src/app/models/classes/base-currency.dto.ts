import { RateConverter } from 'app/converters/rate.converter';
import { JsonProperty, SerializeOnlyDecorated } from 'js-ts-mapper';

export class BaseCurrencyDto {
    base: string = undefined;

    date: string = undefined;

    rates: any = undefined;
}
