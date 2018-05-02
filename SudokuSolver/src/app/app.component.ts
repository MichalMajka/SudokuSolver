import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _httpService: Http) { }

  sudoku  = [
    [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value : '' }], [{ value : '' }, { value : '' }, { value : '' }]], [[{ value : '' }, { value : '' }, { value : '' }], [{ value : '' }, { value : '' }, { value : '' }], [{ value : '' }, { value : '' }, { value : '' }]],
    [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]],
    [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value : '' }], [{ value : '' }, { value : '' }, { value : '' }]]
  ];

  solution : any[];

  public Solve() {
    let table = this.Translate(this.sudoku);
    let model = table;
  this._httpService.post('Sudoku/Solve', model).subscribe(values => {
    this.solution = values.json() as any[];
    debugger;
    for (let i=0; i<this.solution.length; i++) {
      let field = this.getFieldForViewModel(this.solution[i].field.item1, this.solution[i].field.item2);
      this.sudoku[field.section][field.row][field.column].value = this.solution[i].value;
    }
  });
  }

  Translate(viewModel: any[][][]): String[][] {
    let result = new Array<String[]>(viewModel.length);

    for (let i = 0; i < viewModel.length; i++)
      result[i] = new Array<String>(viewModel.length);

    for (let i = 0; i < viewModel.length; i++) {
      for (let j = 0; j < viewModel[i].length; j++) {
        for (let k = 0; k < viewModel[i][j].length; k++) {
          let field = this.getFieldForModel(i, j, k);
          result[field.row][field.column] = this.sudoku[i][j][k].value;
        }
      }
    }
    return result;
  }

  getFieldForModel(i, j, k): any {
    return {
    row : j + 3 * Math.floor(i / 3),
    column : k + 3 * (i % 3)
  };
  }

  getFieldForViewModel(row, column) {
    return {
      section: 3 * Math.floor(row / 3) + Math.floor(column / 3),
      row: row % 3,
      column: column % 3
    }
  }

  ngOnInit() {
  }
}
