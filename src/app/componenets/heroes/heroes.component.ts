import { Component, OnInit } from '@angular/core';
import { Hero } from '../../Hero';
import { HeroService } from '../../Services/hero.service';
import { MessageService } from '../../Services/message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})

//Always export the component class so you can import it elsewhere ... like in the AppModule.
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  // Angular calls ngOnInit() shortly after creating a component. It's a good place to put initialization logic.
  ngOnInit(): void {
    this.getHeroes();
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
