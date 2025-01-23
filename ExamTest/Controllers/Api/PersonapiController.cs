using BL;
using ENT;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ExamTest.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonapiController : ControllerBase
    {
        // GET: api/<PersonapiController>
        [HttpGet]
        public IActionResult Get()
        {
            IActionResult salida;
            List<clsPersona> listadoCompleto = new List<clsPersona>();
            try
            {
                listadoCompleto = clsListadoPersonasBL.listadoPersonasBL();
                if (listadoCompleto.Count() == 0)
                {
                    salida = NoContent();
                }
                else
                {
                    salida = Ok(listadoCompleto);
                }
            }
            catch
            {
                salida = BadRequest();
            }
            return salida;

        }

        // GET api/<PersonapiController>/5
        [HttpGet("{id}")]
        public clsPersona Get(int id)
        {
            return clsListadoPersonasBL.buscarPersonaPorIdBL(id);
        }

        // POST api/<PersonapiController>
        [HttpPost]
        public IActionResult Post([FromBody] clsPersona persona)
        {
            IActionResult salida;
            if (persona != null)
            {
                try
                {
                    bool estado = clsListadoPersonasBL.insertarPersonaBL(persona);
                    if (estado)
                    {
                        // Después de insertar, asignamos el ID correcto a la persona
                        salida = CreatedAtAction(nameof(Get), new { id = persona.IdPersona }, persona);
                    }
                    else
                    {
                        salida = BadRequest("Error creating persona.");
                    }
                }
                catch (Exception e)
                {
                    salida = BadRequest("Error: " + e.Message);
                }
            }
            else
            {
                salida = BadRequest("Invalid persona object.");
            }

            return salida;
        }


        // PUT api/<PersonapiController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromBody] clsPersona persona)
        {
            IActionResult salida;
            if (persona != null)
            {

                try
                {
                    clsListadoPersonasBL.editarPersonaBL(persona);
                    salida = Ok(persona);
                }
                catch
                {
                    salida = BadRequest();
                }
            }
            else
            {
                salida = NoContent();
            }

            return salida;
        }

        // DELETE api/<PersonapiController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            IActionResult salida;
            bool numFilasAfectadas;

            try
            {
                numFilasAfectadas = clsListadoPersonasBL.eliminarPersonaBL(id);
                if (!numFilasAfectadas)
                {
                    salida = NotFound();
                }
                else
                {
                    salida = Ok();
                }
            }
            catch (Exception e)
            {
                salida = BadRequest();
            }

            return salida;
        }

    }
}
