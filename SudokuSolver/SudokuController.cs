using Microsoft.AspNetCore.Mvc;
using SudokuSolver.Exceptions;
using SudokuSolver.Services;
using System.Collections.Generic;
using System.Linq;

namespace SudokuSolver
{
  public class SudokuController : Controller
    {
        [HttpPost]
        public List<FieldSolution> Solve([FromBody] string[,] input)
        {
            var solver = new Services.SudokuSolver();

            var sudoku = new char[9, 9];

            for (var i = 0; i < 9; i++)
            {
                for (var j = 0; j < 9; j++)
                {
                    if (input[i, j] == null || input[i, j].Length == 0 || input[i, j][0] == ' ')
                        sudoku[i, j] = char.MinValue;
                    else
                        sudoku[i, j] = input[i, j][0];
                }
            }

            solver.Load(sudoku);
            try
            {
                solver.Solve();
                return solver.GetSolution().ToList();
            }
            catch (UnsolvalbeException)
            {
                return solver.GetSolution().ToList();
            }
        }
    }
}
