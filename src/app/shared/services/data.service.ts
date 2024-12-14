import { Injectable } from '@angular/core';
import _ from 'lodash';
import cardsData from '../../../assets/data/cards.json';
import dropsData from '../../../assets/data/drops.json';
import duelistsData from '../../../assets/data/duelists.json';
import equipinfoData from '../../../assets/data/equipinfo.json';
import { Card, Drop, Duelist, EquipInfo } from '../types';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    constructor() {
    }

    getCards(): Promise<Card[]> {
        return new Promise((resolve,reject) => {
            const cards: Card[] = cardsData.map(x => new Card(x));
            resolve(cards);
        });
    }

}
