export class Card {

    CardId: number;
    CardName: string;
    Description: string;
    GuardianStar1: string;
    GuardianStar2: string;
    Level: number;
    Type: string;
    Attack: number;
    Defense: number;
    Attribute: string;
    Password: string;
    StarchipCost: number;

    hasDrops: boolean;

    constructor(value: any) {
        this.CardId = value.CardId;
        this.CardName = value.CardName;
        this.Description = value.Description;
        this.GuardianStar1 = value.GuardianStar1;
        this.GuardianStar2 = value.GuardianStar2;
        this.Level = value.Level;
        this.Type = value.Type;
        this.Attack = value.Attack;
        this.Defense = value.Defense;
        this.Attribute = value.Attribute;
        this.Password = value.Password;
        this.StarchipCost = value.StarchipCost;

        this.hasDrops = value.hasDrops;
    }

    getCardIdAsString(): string {
        const cardId = this.CardId.toString().padStart(3, '0');
        return cardId;
    }

    getFullName(): string {
        const cardId = this.getCardIdAsString();
        const fullName = cardId + ' - ' + this.CardName;
        return fullName;
    }

    getArtworkSrc(): string {
        let src = '';
        if (this.CardId) {
            src = 'assets/images/cards/artwork/' + this.CardId.toString().padStart(3, '0') + '.png';
        }
        return src;
    }

    getCardSrc(): string {
        let src = '';
        if (this.CardId) {
            src = 'assets/images/cards/card/eu/' + this.CardId.toString().padStart(3, '0') + '.png';
        }
        return src;
    }

    getDetailSrc(): string {
        let src = '';
        if (this.CardId) {
            src = 'assets/images/cards/detail/eu/' + this.CardId.toString().padStart(3, '0') + '.png';
        }
        return src;
    }


    getGuardianStar1Src(): string {
        let src = '';
        if (this.GuardianStar1) {
            src = 'assets/images/guardian-stars/' + this.GuardianStar1.toLowerCase() + '.png';
        }
        return src;
    }

}

export class Duelist {

    DuelistId: number;
    Duelist: string;
    HandSize: number;

    constructor(value: any) {
        this.DuelistId = value.DuelistId;
        this.Duelist = value.Duelist;
        this.HandSize = value.HandSize;
    }

    getDuelitsSrc(): string {
        let src = '';
        if (this.DuelistId) {
            src = 'assets/images/duelists/' + this.DuelistId.toString() + '.png';
        }
        return src;
    }

}

export class Drop {

    PoolId: number;
    DuelistId: number;
    PoolType: string;
    CardId: number;
    CardProbability: number;

    private _duelist: Duelist | undefined;
    public get duelist(): Duelist | undefined {
        return this._duelist;
    }
    public set duelist(value: Duelist | undefined) {
        this._duelist = value;
    }


    private _card: Card | undefined;
    public get card(): Card | undefined {
        return this._card;
    }
    public set card(value: Card | undefined) {
        this._card = value;
    }

    constructor(value: any) {
        this.PoolId = value.PoolId;
        this.DuelistId = value.Duelist;
        this.PoolType = value.PoolType;
        this.CardId = value.CardId;
        this.CardProbability = value.CardProbability;
    }

    getCardProbabilityPercentage(): number {
        const percentage = this.CardProbability / 2048 * 100;
        return percentage;
    }

}

export class EquipInfo {

    EquipCardId: number;
    EquipId: number;
    CardId: number;

    private _equip: Card | undefined;
    public get equip(): Card | undefined {
        return this._equip;
    }
    public set equip(value: Card | undefined) {
        this._equip = value;
    }

    private _card: Card | undefined;
    public get card(): Card | undefined {
        return this._card;
    }
    public set card(value: Card | undefined) {
        this._card = value;
    }

    constructor(value: any) {
        this.EquipCardId = value.EquipCardId;
        this.EquipId = value.EquipId;
        this.CardId = value.CardId;
    }

}

export class Fusion {

    FusionCardId: number;
    Material1: number;
    Material2: number;
    Result: number;

    private _cardMaterial1: Card | undefined;
    public get cardMaterial1(): Card | undefined {
        return this._cardMaterial1;
    }
    public set cardMaterial1(value: Card | undefined) {
        this._cardMaterial1 = value;
    }

    private _cardMaterial2: Card | undefined;
    public get cardMaterial2(): Card | undefined {
        return this._cardMaterial2;
    }
    public set cardMaterial2(value: Card | undefined) {
        this._cardMaterial2 = value;
    }

    private _cardResult: Card | undefined;
    public get cardResult(): Card | undefined {
        return this._cardResult;
    }
    public set cardResult(value: Card | undefined) {
        this._cardResult = value;
    }

    constructor(value: any) {
        this.FusionCardId = value.FusionCardId;
        this.Material1 = value.Material1;
        this.Material2 = value.Material2;
        this.Result = value.Result;
    }

}

export class Ritual {

    RitualCardId: number;
    Material1: number;
    Material2: number;
    Material3: number;
    Result: number;

    private _cardRitual: Card | undefined;
    public get cardRitual(): Card | undefined {
        return this._cardRitual;
    }
    public set cardRitual(value: Card | undefined) {
        this._cardRitual = value;
    }

    private _cardMaterial1: Card | undefined;
    public get cardMaterial1(): Card | undefined {
        return this._cardMaterial1;
    }
    public set cardMaterial1(value: Card | undefined) {
        this._cardMaterial1 = value;
    }

    private _cardMaterial2: Card | undefined;
    public get cardMaterial2(): Card | undefined {
        return this._cardMaterial2;
    }
    public set cardMaterial2(value: Card | undefined) {
        this._cardMaterial2 = value;
    }

    private _cardMaterial3: Card | undefined;
    public get cardMaterial3(): Card | undefined {
        return this._cardMaterial3;
    }
    public set cardMaterial3(value: Card | undefined) {
        this._cardMaterial3 = value;
    }

    private _cardResult: Card | undefined;
    public get cardResult(): Card | undefined {
        return this._cardResult;
    }
    public set cardResult(value: Card | undefined) {
        this._cardResult = value;
    }

    constructor(value: any) {
        this.RitualCardId = value.RitualCardId;
        this.Material1 = value.Material1;
        this.Material2 = value.Material2;
        this.Material3 = value.Material3;
        this.Result = value.Result;
    }

}
