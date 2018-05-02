using SudokuSolver.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SudokuSolver.Services
{
  public class SudokuSolver
    {
        private Sudoku _sudoku;
	    private readonly List<FieldSolution> _solution;

        public SudokuSolver()
        {
            _solution = new List<FieldSolution>();
        }

        public void Load(char[,] sudoku) {
            _sudoku = new Sudoku(sudoku);
        }

        public void Solve()
        {
          var iterations = 0;
            while(!_sudoku.IsSolved()) {
                ExclusionFit();
                RowComplement();
                ColumnComplement();
                SectionComplement();
                SingleFill();
              iterations++;

              if(iterations > 15)
                throw new UnsolvalbeException();
            }
        }

        public IEnumerable<FieldSolution> GetSolution()
        {
            return _solution.AsEnumerable();
        }

        private void ExclusionFit() {
            foreach(var character in _sudoku.AllowedCharacters) {
                ExclusionFill(character);
            }
        }

      private void SingleFill()
      {
        var emptyFields = _sudoku.GetAllFields().Where(_sudoku.IsEmpty);
        foreach (var field in emptyFields)
        {
          var possibleHits = _sudoku.AllowedCharacters.Except(_sudoku.GetForbiddenCharacters(field));
          if(possibleHits.Count() != 1)
            continue;
          var hit = possibleHits.First();
          _sudoku.SetValue(field, hit);
          AddSolution(hit, field);
      }
      }

        private void ExclusionFill(char character) {
            var fieldsWithCharacter = _sudoku.GetFields(character)
                .ToList();

            var rows = fieldsWithCharacter.SelectMany(_sudoku.GetRow)
                                          .Distinct();
            var columns = fieldsWithCharacter.SelectMany(_sudoku.GetColumn)
                                             .Distinct();
            var sections = fieldsWithCharacter.SelectMany(_sudoku.GetSection)
                                              .Distinct();

            var forbiddenFields = rows.Union(columns)
                                      .Union(sections);

            var emptyFields = _sudoku.GetAllFields()
                .Where(_sudoku.IsEmpty);

            var possibleHits = emptyFields.Where(x => !forbiddenFields.Contains(x));

            var hitSections = possibleHits.GroupBy(_sudoku.SectionHash);
            var hit = hitSections.FirstOrDefault(x => x.Count() == 1)
                                 ?.FirstOrDefault();

            if (hit == null)
                return;

            _sudoku.SetValue(hit, character);
            AddSolution(character, hit);
        }

        private void RowComplement() {
            ComplementCollection(_sudoku.GetRows);
        }

        private void ColumnComplement() {
            ComplementCollection(_sudoku.GetColumns);
        }

        private void SectionComplement()
        {
          ComplementCollection(_sudoku.GetSections);
        }

        private void ComplementCollection(Func<IEnumerable<IEnumerable<Tuple<int, int>>>> collectionGenerator) {
            var collections = collectionGenerator();

            foreach(var collection in collections) {
                var lineAsArray = collection as Tuple<int, int>[] ?? collection.ToArray();
                var missingMembers = _sudoku.MissingMembers(lineAsArray);
                var emptyFields = lineAsArray.Where(_sudoku.IsEmpty);

                var fieldsWithForbiddenCharacters =
                    emptyFields.Select(x => new {
                        Field = x,
                        ForbiddenFields = _sudoku.GetForbiddenCharacters(x)
                    })
                               .ToList();

                foreach(var missingMember in missingMembers) {
                    var possibleHits =
                        fieldsWithForbiddenCharacters.Where(x => !x.ForbiddenFields.Contains(missingMember))
                                                     .Select(x => x.Field)
                                                     .ToList();

                    if (possibleHits.Count != 1)
                        continue;

                    var hit = possibleHits.First();
                    _sudoku.SetValue(hit, missingMember);
                    AddSolution(missingMember, hit);
                }
            }
        }

        private void AddSolution(char character, Tuple<int, int> hit)
        {
            _solution.Add(new FieldSolution
            {
                Field = hit,
                Value = character
            });
        }
    }
}
