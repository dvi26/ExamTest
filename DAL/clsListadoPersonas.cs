using ENT;

namespace DAL
{
    public class clsListadoPersonas
    {
        private static List<clsPersona> listadoInicial = new List<clsPersona>
        {
            new clsPersona(1, "Juan", "https://example.com/juan.jpg", new DateOnly(1990, 5, 12)),
            new clsPersona(2, "María", "https://example.com/maria.jpg", new DateOnly(1985, 7, 8)),
            new clsPersona(3, "Luis", "https://example.com/luis.jpg", new DateOnly(1992, 11, 22)),
            new clsPersona(4, "Ana", "https://example.com/ana.jpg", new DateOnly(1987, 1, 30))
        };

        private static List<clsPersona> getListado()
        {
            return listadoInicial;
        }

        public static List<clsPersona> obtenerPersonas()
        {
            return getListado();
        }

        public static clsPersona? buscarPersonaPorId(int id)
        {
            return getListado().FirstOrDefault(persona => persona.IdPersona == id);
        }

        public static bool insertarPersona(clsPersona persona)
        {
            var listado = getListado();
            persona.IdPersona = listado.Max(p => p.IdPersona) + 1;
            listado.Add(persona);  // Se agrega la persona a la lista estática
            return listado.Contains(persona);
        }

        public static bool editarPersona(clsPersona persona)
        {
            var listado = getListado();
            var personaExistente = listado.FirstOrDefault(p => p.IdPersona == persona.IdPersona);

            if (personaExistente != null)
            {
                personaExistente.Nombre = persona.Nombre;
                personaExistente.Foto = persona.Foto; // Si se permite editar la foto también
                personaExistente.FechaNac = persona.FechaNac; // Se edita la fecha de nacimiento si es necesario
                return true;
            }
            return false;
        }

        public static bool eliminarPersona(int id)
        {
            var listado = getListado();
            var persona = listado.FirstOrDefault(p => p.IdPersona == id);

            if (persona != null)
            {
                listado.Remove(persona);  // Se elimina la persona de la lista estática
                return true;
            }
            return false;
        }
    }
}
