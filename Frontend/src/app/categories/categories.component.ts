import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories = [
    { id: 1, type: 'Music' },
    { id: 2, type: 'Movies' },
    { id: 3, type: 'Sports' },
    { id: 4, type: 'Tech' },
    { id: 5, type: 'Fashion' }
  ];

  category: string | null = '';
  constructor(private router: Router, private route: ActivatedRoute) {
    this.category = this.route.snapshot.queryParamMap.get('category');
  }
  ngOnInit(): void {
  }

}
