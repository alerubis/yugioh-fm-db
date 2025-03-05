import _ from 'lodash';
import cardsData from '../../assets/data/cards.json';
import dropsData from '../../assets/data/drops.json';
import duelistsData from '../../assets/data/duelists.json';
import equipinfoData from '../../assets/data/equipinfo.json';
import fusionsData from '../../assets/data/fusions.json';
import { Card, Drop, Duelist, EquipInfo, Fusion } from './types';

export class DataUtils {

    static cardsCache: Card[] | undefined;
    static duelistsCache: Duelist[] | undefined;
    static dropsCache: Drop[] | undefined;
    static equipInfoCache: EquipInfo[] | undefined;
    static fusionsCache: Fusion[] | undefined;

    static getCards(): Card[] {
        if (this.cardsCache) {
            return this.cardsCache;
        }
        const cards: Card[] = cardsData.map(x => new Card(x));
        const drops: Drop[] = dropsData.map(x => new Drop(x));
        for (const card of cards) {
            card.hasDrops = drops.some(x => x.CardId == card.CardId && x.PoolType !== 'Deck');
        }
        this.cardsCache = cards;
        return cards;
    }

    static getCardFromId(id: number | string | null): Card | undefined {
        const cards = this.getCards();
        const card = cards.find(x => x.CardId == id);
        return card;
    }

    static getDuelists(): Duelist[] {
        if (this.duelistsCache) {
            return this.duelistsCache;
        }
        let duelists: Duelist[] = duelistsData.map(x => new Duelist(x));
        duelists = _.orderBy(duelists, x => x.DuelistId);
        this.duelistsCache = duelists;
        return duelists;
    }

    static getDuelistFromId(id: number | string | null): Duelist | undefined {
        const duelists = this.getDuelists();
        const duelist = duelists.find(x => x.DuelistId == id);
        return duelist;
    }

    static getDrops(): Drop[] {
        if (this.dropsCache) {
            return this.dropsCache;
        }
        const drops: Drop[] = dropsData.map(x => new Drop(x));
        for (const drop of drops) {
            drop.duelist = this.getDuelistFromId(drop.DuelistId);
            drop.card = this.getCardFromId(drop.CardId);
        }
        this.dropsCache = drops;
        return drops;
    }

    static getDropsForCard(CardId: number | string | null): Drop[] {
        let drops = this.getDrops().filter(x => x.CardId == CardId).filter(x => x.PoolType !== 'Deck');
        drops = _.orderBy(drops, x => x.CardProbability, 'desc');
        return drops;
    }

    static getOpponentsDecksForCard(CardId: number | string | null): Drop[] {
        let drops = this.getDrops().filter(x => x.CardId == CardId).filter(x => x.PoolType === 'Deck');
        drops = _.orderBy(drops, x => x.CardProbability, 'desc');
        return drops;
    }

    static getDropsForDuelist(DuelistId: number | string | null): Drop[] {
        let drops = this.getDrops().filter(x => x.DuelistId == DuelistId).filter(x => x.PoolType !== 'Deck');
        drops = _.orderBy(drops, x => x.card?.Attack, 'desc');
        return drops;
    }

    static getDecksForDuelist(DuelistId: number | string | null): Drop[] {
        let drops = this.getDrops().filter(x => x.DuelistId == DuelistId).filter(x => x.PoolType === 'Deck');
        drops = _.orderBy(drops, x => x.card?.Attack, 'desc');
        return drops;
    }

    static getEquipInfos(): EquipInfo[] {
        if (this.equipInfoCache) {
            return this.equipInfoCache;
        }
        const equipinfos: EquipInfo[] = equipinfoData.map(x => new EquipInfo(x));
        for (const equipinfo of equipinfos) {
            equipinfo.equip = this.getCardFromId(equipinfo.EquipId);
            equipinfo.card = this.getCardFromId(equipinfo.CardId);
        }
        this.equipInfoCache = equipinfos;
        return equipinfos;
    }

    static getEquipInfosForCard(CardId: number | string | null): EquipInfo[] {
        let equipinfos = this.getEquipInfos().filter(x => x.CardId == CardId);
        equipinfos = _.orderBy(equipinfos, x => x.card?.CardName, 'asc');
        return equipinfos;
    }

    static getEquipInfosForCardInverse(EquipId: number | string | null): EquipInfo[] {
        let equipinfos = this.getEquipInfos().filter(x => x.EquipId == EquipId);
        equipinfos = _.orderBy(equipinfos, x => x.card?.Attack, 'desc');
        return equipinfos;
    }

    static getFusions(): Fusion[] {
        if (this.fusionsCache) {
            return this.fusionsCache;
        }
        const fusions: Fusion[] = fusionsData.map(x => new Fusion(x));
        for (const fusion of fusions) {
            fusion.cardMaterial1 = this.getCardFromId(fusion.Material1);
            fusion.cardMaterial2 = this.getCardFromId(fusion.Material2);
            fusion.cardResult = this.getCardFromId(fusion.Result);
        }
        this.fusionsCache = fusions;
        return fusions;
    }

    static getFusionsAsMaterial(CardId: number | string | null): Fusion[] {
        let fusions = this.getFusions().filter(x => x.Material1 == CardId || x.Material2 == CardId);
        fusions = _.orderBy(fusions,
            [
                x => x.cardResult?.Attack,
                x => ((x.cardMaterial1?.Attack || 0) + (x.cardMaterial2?.Attack || 0)),
            ],
            [
                'desc',
                'asc',
            ]
        );
        return fusions;
    }

    static getFusionsAsResult(CardId: number | string | null): Fusion[] {
        let fusions = this.getFusions().filter(x => x.Result == CardId);
        fusions = _.orderBy(fusions,
            [
                x => ((x.cardMaterial1?.Attack || 0) + (x.cardMaterial2?.Attack || 0)),
                x => x.cardMaterial1?.Attack,
                x => x.cardMaterial2?.Attack,
            ],
            [
                'asc',
                'asc',
                'asc',
            ]
        );
        return fusions;
    }

}
