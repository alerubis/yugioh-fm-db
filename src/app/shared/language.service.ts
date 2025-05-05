import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LanguageService {

    private currentLang: string = 'eu';
    private possibleLangs: string[] = ['eu', 'na', 'fr', 'de', 'it', 'es'];

    constructor() {
        this.loadCurrentLangFromLocalStorage();
    }

    private loadCurrentLangFromLocalStorage(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            const lang = localStorage.getItem('currentLang');
            if (lang && this.possibleLangs.includes(lang)) {
                this.currentLang = lang;
            } else {
                this.currentLang = 'eu';
            }
        }
    }

    setCurrentLang(lang: string): void {
        this.currentLang = lang;
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('currentLang', lang);
        }
    }

    getCurrentLang(): string {
        return this.currentLang;
    }

}
