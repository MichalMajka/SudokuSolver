using System;
using System.Collections.Generic;
using System.Linq;

namespace SudokuSolver.Services
{
  public class Sudoku
    {
        public readonly char[] AllowedCharacters = { '1', '2', '3', '4', '5', '6', '7', '8', '9' };
        private readonly char[,] _sudoku;
        private readonly int _size;
        private readonly int _sectionSize;

      public Sudoku(char[,] sudoku)
        {
            _size = (int)Math.Sqrt(sudoku.Length);
            _sudoku = new char[_size,_size];
            _sectionSize = (int)Math.Sqrt(_size);
            for (var i = 0; i < _size; i++) {
                for (var j = 0; j < _size; j++)
                {
                    _sudoku[i,j] = sudoku[i,j];
                }
            }
        }

        public IEnumerable<char> GetForbiddenCharacters(Tuple<int, int> field) {
            var row = GetRow(field);
            var column = GetColumn(field);
            var section = GetSection(field);

            return column.Union(section)
                .Union(row)
                .Distinct()
                .Select(GetValue);
        }

        public IEnumerable<char> MissingMembers(IEnumerable<Tuple<int, int>> fieldCollection) {
            return AllowedCharacters.Where(x => !fieldCollection.Select(GetValue)
                .Contains(x));
        }

        public IEnumerable<IEnumerable<Tuple<int, int>>> GetRows() {
            var firstColumn = GetColumn(GetField(0, 0));

            foreach(var field in firstColumn)
                yield return GetRow(field);
        }

        public IEnumerable<IEnumerable<Tuple<int, int>>> GetColumns() {
            var firstRow = GetRow(GetField(0, 0));

            foreach(var field in firstRow)
                yield return GetColumn(field);
        }

        public IEnumerable<IEnumerable<Tuple<int, int>>> GetSections()
        {
          for (var i = 0; i < _size; i += _sectionSize)
          {
            for (var j = 0; j < _size; j += _sectionSize)
              yield return GetSection(GetField(i, j));
          }
        }

    public int SectionHash(Tuple<int, int> field) {
      return field.Item2 / _sectionSize + field.Item1 / _sectionSize * _sectionSize;
        }

        public bool IsSolved() {
            return GetAllFields().All(x => GetValue(x) != char.MinValue);
        }

        public bool IsEmpty(Tuple<int, int> field) {
            return GetValue(field) == char.MinValue;
        }

        private static Tuple<int, int> GetField(int row, int column) {
            return new Tuple<int, int>(row, column);
        }

        private char GetValue(Tuple<int, int> field) {
            return _sudoku[field.Item1, field.Item2];
        }

        public void SetValue(Tuple<int, int> field, char value) {
            _sudoku[field.Item1, field.Item2] = value;
        }

        public IEnumerable<Tuple<int, int>> GetRow(Tuple<int, int> field) {
            for(var column = 0; column < _size; column++)
                yield return GetField(field.Item1, column);
        }

        public IEnumerable<Tuple<int, int>> GetColumn(Tuple<int, int> field) {
            for(var row = 0; row < _size; row++)
                yield return GetField(row, field.Item2);
        }

        public  IEnumerable<Tuple<int, int>> GetSection(Tuple<int, int> field) {
            var sectionSize = (int)Math.Sqrt(_size);
            var sectionStart = new Tuple<int, int>(field.Item1 / sectionSize * sectionSize,
                field.Item2 / sectionSize * sectionSize);

            for(var row = sectionStart.Item1; row < sectionStart.Item1 + sectionSize; row++) {
                for(var column = sectionStart.Item2; column < sectionStart.Item2 + sectionSize; column++)
                    yield return GetField(row, column);
            }
        }

        public  IEnumerable<Tuple<int, int>> GetAllFields() {
            for(var row = 0; row < _size; row++) {
                for(var column = 0; column < _size; column++)
                    yield return GetField(row, column);
            }
        }

        public IEnumerable<Tuple<int, int>> GetFields(char value) {
            return GetAllFields()
                .Where(x => GetValue(x) == value);
        }
    }
}
