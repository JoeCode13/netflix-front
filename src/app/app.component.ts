import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from 'src/models/movies';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  sticky = false;

  subs : Subscription[] = [];

  trending?: Movies;
  popular?: Movies;
  topRated?: Movies;
  originals?: Movies;
  nowPlaying?: Movies;

  sliderConfig = {

    slidesToShow: 9,
    slidesToScroll: 2,
    arrows:  true,
    autoplay: false
  };

  @ViewChild('stickHeader') header : ElementRef | undefined;

  constructor(private movie: MovieService){}

  ngOnInit(): void {

    this.subs.push(this.movie.getTrending().subscribe(data => this.trending = data));
    this.subs.push(this.movie.getPopularMovies().subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTopRated().subscribe(data => this.topRated = data));
    this.subs.push(this.movie.getOriginals().subscribe(data => this.originals = data));
    this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));
      
  }
  ngOnDestroy(): void {

    this.subs.map(s => s.unsubscribe());
      
  }

}
