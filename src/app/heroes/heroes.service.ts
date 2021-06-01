import {Injectable} from "@angular/core";
import {Hero} from "./heroes.component";
import {FormGroup} from "@angular/forms";


@Injectable()
export class HeroesService {
    private heroes: Hero[];

    constructor() {
        this.heroes = [] as Array<Hero>;
        this.heroes.push({id:0, name:'Batman', age: 23});
        this.heroes.push({id:1, name:'Superman', age: 33});
        this.heroes.push({id:2, name:'Antman', age: 43});
        this.heroes.push({id:3, name:'Catwoman', age: 23});
    }

    public getAll(): Hero[] { return this.heroes; }

    public getById(id: number): Hero { return this.heroes.find(heroe => heroe.id == id); }

    public addHero(heroes: Hero[], heroForm: FormGroup): Hero[] {
        let hero: Hero = heroForm.value;
        hero.id = heroes.reduce((max, hero) => (hero.id > max ? hero.id : max), heroes[0].id)+1;
        this.heroes.push(hero);
        return this.heroes;
    }

    public editHero(heroes: Hero[], heroForm: FormGroup): Hero[] {
        let index = this.heroes.findIndex((hero) => hero.id == heroForm.get('id').value);
        this.heroes[index] = heroForm.value;
        return this.heroes;
    }

    public deleteHero(heroes: Hero[], heroe: Hero): Hero[] { return heroes.filter(hero => hero != heroe); };

    public getByValue(value: string): Hero[] { return this.heroes.filter(heroe => heroe.name.includes(value)); }
}
