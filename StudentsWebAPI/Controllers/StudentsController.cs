using Microsoft.AspNetCore.Mvc;
using StudentsWebAPI.Data;
using StudentsWebAPI.Models;
using System.Threading.Tasks;

namespace StudentsWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetStudents")] 
        public ActionResult<IEnumerable<Student>> GetStudents()
        {
            return Ok(_context.Students.ToList());
        }

        [HttpPost("AddStudent")] 
        public async Task<IActionResult> AddStudent([FromBody] Student student)
        {
            if (student == null)
            {
                return BadRequest("Invalid student data.");
            }

            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Student added successfully!", student });
        }
    }
}
