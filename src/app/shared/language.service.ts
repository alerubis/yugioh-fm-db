import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LanguageService {

    private currentLang: string = 'eu';
    private possibleLangs: string[] = ['eu', 'na', 'fr', 'de', 'it', 'es'];

    constructor() {
        this.getCurrentLangFromLocalStorage();
    }

    private getCurrentLangFromLocalStorage(): string {
        const lang = localStorage.getItem('currentLang');
        if (lang && this.possibleLangs.includes(lang)) {
            this.currentLang = lang;
        } else {
            this.currentLang = 'eu';
        }
        return this.currentLang;
    }

    setCurrentLang(lang: string): void {
        this.currentLang = lang;
        localStorage.setItem('currentLang', lang);
    }

    getCurrentLang(): string {
        return this.currentLang;
    }

}
