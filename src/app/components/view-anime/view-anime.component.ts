import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnimeServiceService } from '../../service/anime-service.service';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-view-anime',
  templateUrl: './view-anime.component.html',
  styleUrls: ['./view-anime.component.scss']
})
export class ViewAnimeComponent {

  constructor(private animeService: AnimeServiceService) { }


  public animeDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public genreDataSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public animeData$: Observable<any> = this.animeDataSubject.asObservable();
  public genreData$: Observable<any> = this.genreDataSub.asObservable();
  public searchTerm: string = '';
  public selectedOption: any;


  ngOnInit() {
    // ngOninit is used when the component is loaded 
    // forkJoin is similar to Promise.all it returnstwo observables based on the order it has been provided. 
    forkJoin([
      this.animeService.getAnime(),
      this.animeService.getAnimeGenre(),
    ]).subscribe(([animeData, genreData]) => {
      this.animeDataSubject.next(animeData);
      this.genreDataSub.next(genreData);
    }, (error) => {
      console.error(error);
    });

    console.log('yes');

  }
  


  searchAnimeByName(name: string) {
    this.animeData$ = this.animeService.getAnimeByGenreAndName(this.searchTerm, this.findById());

    this.animeData$.subscribe((data: any) => {
      console.log('Received anime data:', data);
    });
  }

  onGenreSelect() {
    this.animeData$ = this.animeService.getAnimeByGenreAndName(this.searchTerm, this.findById())
    this.animeData$.subscribe((data: any) => {
      console.log('Received anime data:', data);
    });
  }

  private findById() {
    const currentGenreData = this.genreDataSub?.value.data;
    const selectedGenre = currentGenreData?.find((genre:any) => genre.name === this.selectedOption);
    return selectedGenre?.mal_id;
  }
}
