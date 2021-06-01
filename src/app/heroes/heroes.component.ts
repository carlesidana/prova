import {Component, OnInit} from "@angular/core";
import {HeroesService} from "./heroes.service";
import {Form, FormGroup} from "@angular/forms";
import {HeroesFormComponent} from "./heroes-form/heroes-form.component";

export interface Hero {
    id: number,
    name: string,
    age: number
}

@Component({
    selector: 'heroes',
    styleUrls: ['./heroes.component.css'],
    templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
    private heroes: Hero[] = [] as Array<Hero>;
    private selectedHero: Hero;
    private heroForm: FormGroup;
    private heroFormToggle: boolean;


    constructor(private _heroesService: HeroesService){}

    ngOnInit(): void {
        this.heroes = this._heroesService.getAll();
    }

    selectHero(hero: Hero):void {
        this.heroFormToggle = false;
        this.selectedHero = hero;
    }

    add() {
        this.heroForm = HeroesFormComponent.initializeForm();
        this.toggleHeroForm();
    }

    edit() {
        this.heroForm = HeroesFormComponent.initializeFormWithHero(this.selectedHero);
        this.toggleHeroForm();
    }

    toggleHeroForm(): void {
        this.heroFormToggle = !this.heroFormToggle;
    }

    delete() {
        this.heroes = this._heroesService.deleteHero(this.heroes, this.selectedHero);
        this.heroFormToggle = false;
    }

    onSavedHeroForm(heroForm: FormGroup) {
        if(heroForm.get('id').value) {
            this.heroes = this._heroesService.editHero(this.heroes, this.heroForm)
        } else {
            this.heroes = this._heroesService.addHero(this.heroes, heroForm);
        }

        this.toggleHeroForm();
    }
}
