import type { CardOptions } from './CardOptions';
export default interface Card {
    rowProps: Record<string, unknown>;
    colProps: Record<string, unknown>;
    cardOptions: CardOptions;
}
