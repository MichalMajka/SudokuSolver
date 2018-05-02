using System;

namespace SudokuSolver.Services
{
  public class FieldSolution
    {
        public Tuple<int, int> Field { get; set; }
        public char Value { get; set; }
    }
}
