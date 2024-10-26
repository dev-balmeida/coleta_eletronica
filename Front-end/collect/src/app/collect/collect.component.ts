import { Component, OnInit } from '@angular/core';
import { Collect } from '../collect';
import { CollectService } from '../collect.service';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {

  collects: Collect[] = [];
  newCollect: Collect = {};
  selectedCollect: Collect | null = null;
  showAddForm: boolean = false;
  searchParams: any = {};

  constructor(private collectService: CollectService) { }

  ngOnInit(): void {
    this.loadCollects();
  }

  startAddCollect(): void {
    this.showAddForm = true;
  }

  cancelAddCollect(): void {
    this.showAddForm = false;
  }

  loadCollects(): void {
    this.collectService.pointRead().subscribe((data: Collect[]) => {
      this.collects = data;
    });
  }

  pointCreate(): void {
    this.collectService.pointCreate(this.newCollect).subscribe((collect: Collect) => {
      this.collects.push(collect);
      this.newCollect = {};
      this.showAddForm = false;
    });
  }

  pointUpdate(): void {
    if (this.selectedCollect) {
      this.collectService.pointUpdate(this.selectedCollect.id!, this.selectedCollect).subscribe((collect: Collect) => {
        const index = this.collects.findIndex(b => b.id === collect.id);
        if (index !== -1) {
          this.collects[index] = collect;
        }
        this.selectedCollect = null;
      });
    }
  }

  pointDelete(id: number): void {
    this.collectService.pointDelete(id).subscribe(() => {
      this.collects = this.collects.filter(b => b.id !== id);
    });
  }

  pointSearch(): void {
    const formattedSearchParams = {
      nome: this.searchParams.nome || null,
      endereco: this.searchParams.endereco || null,
      zona: this.searchParams.zona || null,
      contatos: this.searchParams.contatos || null,
      horarioExpediente: this.searchParams.horarioExpediente || null,

    };

    this.collectService.pointSearch(formattedSearchParams).subscribe((data: Collect[]) => {
      this.collects = data;
    });
  }
  
  clearSelection(): void {
    this.selectedCollect = null;
  }

  clearFilters(): void {
    this.searchParams = {};
    this.loadCollects();
  }
}