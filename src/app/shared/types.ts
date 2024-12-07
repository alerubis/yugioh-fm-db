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
    }

    getArtworkSrc(): string {
        let src = '';
        if (this.CardId) {
            src = 'assets/images/artwork/' + this.CardId.toString().padStart(3, '0') + '.png';
        }
        return src;
    }

    getImageSrc(): string {
        let src = '';
        if (this.CardId) {
            src = 'assets/images/card/it/' + this.CardId.toString().padStart(3, '0') + '.png';
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

    constructor(value: any) {
        this.PoolId = value.PoolId;
        this.DuelistId = value.Duelist;
        this.PoolType = value.PoolType;
        this.CardId = value.CardId;
        this.CardProbability = value.CardProbability;
    }

}

export class EquipInfo {

    EquipCardId: number;
    EquipId: number;
    CardId: number;

    private _equipCard: Card | undefined;
    public get equipCard(): Card | undefined {
        return this._equipCard;
    }
    public set equipCard(value: Card | undefined) {
        this._equipCard = value;
    }

    constructor(value: any) {
        this.EquipCardId = value.EquipCardId;
        this.EquipId = value.EquipId;
        this.CardId = value.CardId;
    }

}
