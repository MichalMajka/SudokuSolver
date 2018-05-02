using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace SudokuSolver
{
  [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] { "Hello", "World" };
        }
    }
}
