import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutocompleteService } from '../../../service/autocomplete.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {
  // Using reactive forms for the formcontrol
  searchInput = new FormControl();
  suggestions: any[] = [];

  constructor(private autocompleteService: AutocompleteService) {
    this.setupAutocomplete();
  }

  private setupAutocomplete(): void {
    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.autocompleteService.search(query))
    ).subscribe((response: any) => {
      if (Array.isArray(response)) {
        const dataFromSuggestions = response.map(item => item.data);
        this.suggestions = dataFromSuggestions;
      } else if (response && response.data) {
        const namesFromSuggestions = response.data.map((item: any) => item.title);
        console.log(namesFromSuggestions);
        this.suggestions = namesFromSuggestions;
      } else {
        console.error('Unexpected response structur3:', response);
      }
    });
  }
}
