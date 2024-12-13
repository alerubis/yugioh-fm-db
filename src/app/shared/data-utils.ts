import _ from 'lodash';
import cardsData from '../../assets/data/cards.json';
import dropsData from '../../assets/data/drops.json';
import duelistsData from '../../assets/data/duelists.json';
import equipinfoData from '../../assets/data/equipinfo.json';
import { Card, Drop, Duelist, EquipInfo } from './types';

export class DataUtils {

    static getCards(): Card[] {
        const cards: Card[] = cardsData.map(x => new Card(x));
        return cards;
    }

    static getCardFromId(id: number | string | null): Card | undefined {
        const cards = this.getCards();
        const card = cards.find(x => x.CardId == id);
        return card;
    }

    static getDuelists(): Duelist[] {
        let duelists: Duelist[] = duelistsData.map(x => new Duelist(x));
        duelists = _.orderBy(duelists, x => x.DuelistId);
        return duelists;
    }

    static getDuelistFromId(id: number | string | null): Duelist | undefined {
        const duelists = this.getDuelists();
        const duelist = duelists.find(x => x.DuelistId == id);
        return duelist;
    }

    static getDrops(): Drop[] {
        const drops: Drop[] = dropsData.map(x => new Drop(x));
        for (const drop of drops) {
            drop.duelist = this.getDuelistFromId(drop.DuelistId);
            drop.card = this.getCardFromId(drop.CardId);
        }
        return drops;
    }

    static getDropsForCard(CardId: number | string | null): Drop[] {
        const drops = this.getDrops().filter(x => x.CardId == CardId).filter(x => x.PoolType !== 'Deck');
        return drops;
    }

    static getOpponentsDecksForCard(CardId: number | string | null): Drop[] {
        const drops = this.getDrops().filter(x => x.CardId == CardId).filter(x => x.PoolType === 'Deck');
        return drops;
    }

    static getDropsForDuelist(DuelistId: number | string | null): Drop[] {
        const drops = this.getDrops().filter(x => x.DuelistId == DuelistId).filter(x => x.PoolType !== 'Deck');
        return drops;
    }

    static getDecksForDuelist(DuelistId: number | string | null): Drop[] {
        const drops = this.getDrops().filter(x => x.DuelistId == DuelistId).filter(x => x.PoolType === 'Deck');
        return drops;
    }

    static getEquipInfos(): EquipInfo[] {
        const equipinfos: EquipInfo[] = equipinfoData.map(x => new EquipInfo(x));
        for (const equipinfo of equipinfos) {
            equipinfo.equip = this.getCardFromId(equipinfo.EquipId);
            equipinfo.card = this.getCardFromId(equipinfo.CardId);
        }
        return equipinfos;
    }

    static getEquipInfosForCard(CardId: number | string | null): EquipInfo[] {
        const equipinfos = this.getEquipInfos().filter(x => x.CardId == CardId);
        return equipinfos;
    }

    static getEquipInfosForCardInverse(EquipId: number | string | null): EquipInfo[] {
        const equipinfos = this.getEquipInfos().filter(x => x.EquipId == EquipId);
        return equipinfos;
    }

}
