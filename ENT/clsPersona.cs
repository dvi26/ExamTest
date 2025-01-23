using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ENT
{
    public class clsPersona
    {
        public int IdPersona { get; set; }
        public string Nombre { get; set; }
        public string Foto { get; set; }
        public DateOnly FechaNac { get; set; }

        public clsPersona(int idPersona,string nombre,string foto,DateOnly fechaNac)
        {
            IdPersona = idPersona;
            Nombre = nombre;
            Foto = foto;
            FechaNac = fechaNac;
        }
        public clsPersona()
        {
        }
    }
}
