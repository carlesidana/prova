import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Hero} from "../heroes.component";

@Component({
    selector: 'heroe-form',
    templateUrl: './heroes-form.component.html'
})
export class HeroesFormComponent {
    @Input()
    public heroForm: FormGroup;

    @Output()
    public onSavedState: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    static initializeForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(null ,Validators.required),
            name: new FormControl('',Validators.required),
            age: new FormControl('',[Validators.required, Validators.max(150), Validators.min(1)])
            }
        )
    }

    static initializeFormWithHero(hero: Hero): FormGroup {
        return new FormGroup({
                id: new FormControl(hero.id ,Validators.required),
                name: new FormControl(hero.name ,Validators.required),
                age: new FormControl(hero.age ,[Validators.required, Validators.max(150), Validators.min(1)])
            }
        )
    }

    protected submit(): void {
        this.onSavedState.emit(this.heroForm);
    }
}
