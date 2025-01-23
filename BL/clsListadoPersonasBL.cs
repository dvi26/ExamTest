using DAL;
using ENT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class clsListadoPersonasBL
    {
        public static List<clsPersona> listadoPersonasBL()
        {  
            return clsListadoPersonas.obtenerPersonas();
        }
        public static clsPersona buscarPersonaPorIdBL(int id)
        {
            return clsListadoPersonas.buscarPersonaPorId(id);
        }
        public static bool insertarPersonaBL(clsPersona persona)
        {
            return clsListadoPersonas.insertarPersona(persona);
        }

        public static bool editarPersonaBL(clsPersona persona)
        {
            return clsListadoPersonas.editarPersona(persona);
        }

        public static bool eliminarPersonaBL(int id)
        {
            return clsListadoPersonas.eliminarPersona(id);
        }
}
}
