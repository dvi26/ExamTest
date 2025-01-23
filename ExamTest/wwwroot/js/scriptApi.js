class clsPersona {
    constructor(idPersona, nombre, foto, fechaNac) {
        this.idPersona = idPersona;
        this.nombre = nombre;
        this.foto = foto;
        this.fechaNac = fechaNac;
    }
}
window.onload = function () {
    let id;

    // Función para obtener las personas
    // Función para obtener las personas y mejorar el estilo de la tabla
    function obtenerPersonas() {
        var miLlamada = new XMLHttpRequest();
        miLlamada.open("GET", "http://localhost:5282/Api/Personapi");

        miLlamada.onreadystatechange = function () {
            if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                var arrayPersonas = JSON.parse(miLlamada.responseText);
                let contenido = document.getElementById("contenido");
                contenido.innerHTML = "";

                let table = document.createElement("table");
                table.style.width = "100%";
                table.style.borderCollapse = "collapse"; // Para eliminar los espacios entre las celdas

                let trEncabezado = document.createElement("tr");
                trEncabezado.style.backgroundColor = "#f4f4f4";

                let thId = document.createElement("th");
                let thNombre = document.createElement("th");
                let thFoto = document.createElement("th");
                let thFechaNac = document.createElement("th");
                let thAcciones = document.createElement("th");

                thId.innerHTML = "ID";
                thNombre.innerHTML = "Nombre";
                thFoto.innerHTML = "Foto";
                thFechaNac.innerHTML = "Fecha Nacimiento";
                thAcciones.innerHTML = "Acciones";

                trEncabezado.appendChild(thId);
                trEncabezado.appendChild(thNombre);
                trEncabezado.appendChild(thFoto);
                trEncabezado.appendChild(thFechaNac);
                trEncabezado.appendChild(thAcciones);
                table.appendChild(trEncabezado);

                arrayPersonas.forEach(p => {
                    let persona = new clsPersona(p.idPersona, p.nombre, p.foto, p.fechaNac);
                    let tr = document.createElement("tr");
                    tr.style.borderBottom = "1px solid #ddd";

                    let tdId = document.createElement("td");
                    let tdNombre = document.createElement("td");
                    let tdFoto = document.createElement("td");
                    let tdFechaNac = document.createElement("td");
                    let tdAcciones = document.createElement("td");

                    tdId.innerHTML = persona.idPersona;
                    tdNombre.innerHTML = persona.nombre;
                    tdFoto.innerHTML = `<img src="${persona.foto}" alt="Foto" width="50px" style="border-radius: 5px;">`;
                    tdFechaNac.innerHTML = persona.fechaNac;

                    // Crear los botones de editar y eliminar con estilos
                    let btnEditar = document.createElement("button");
                    btnEditar.textContent = "Editar";
                    btnEditar.style.backgroundColor = "#4CAF50";
                    btnEditar.style.color = "white";
                    btnEditar.style.border = "none";
                    btnEditar.style.padding = "5px 10px";
                    btnEditar.style.marginRight = "10px";
                    btnEditar.style.cursor = "pointer";
                    btnEditar.style.borderRadius = "5px";
                    btnEditar.addEventListener("click", function () {
                        editarPersona(persona.idPersona);
                    });

                    let btnEliminar = document.createElement("button");
                    btnEliminar.textContent = "Eliminar";
                    btnEliminar.style.backgroundColor = "#f44336";
                    btnEliminar.style.color = "white";
                    btnEliminar.style.border = "none";
                    btnEliminar.style.padding = "5px 10px";
                    btnEliminar.style.cursor = "pointer";
                    btnEliminar.style.borderRadius = "5px";
                    btnEliminar.addEventListener("click", function () {
                        eliminarPersona(persona.idPersona);
                    });

                    tdAcciones.appendChild(btnEditar);
                    tdAcciones.appendChild(btnEliminar);

                    tr.appendChild(tdId);
                    tr.appendChild(tdNombre);
                    tr.appendChild(tdFoto);
                    tr.appendChild(tdFechaNac);
                    tr.appendChild(tdAcciones);
                    table.appendChild(tr);
                });

                contenido.appendChild(table);
            }
        };

        miLlamada.send();
    }


    // Eliminar persona
    function eliminarPersona(idPersona) {
        let done = confirm("¿Estás seguro de que deseas eliminar a esta persona?");
        if (done) {
            var miLlamada = new XMLHttpRequest();
            miLlamada.open("DELETE", "http://localhost:5282/Api/Personapi/" + idPersona);
            miLlamada.onreadystatechange = function () {
                if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                    alert("Persona eliminada correctamente");
                    obtenerPersonas(); // Recargar listado
                }
            };
            miLlamada.send();
        }
    }

    // Función para editar persona
    function editarPersona(idPersona) {
        var miLlamada = new XMLHttpRequest();
        miLlamada.open("GET", "http://localhost:5282/Api/Personapi/" + idPersona);
        miLlamada.onreadystatechange = function () {
            if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                let persona = JSON.parse(miLlamada.responseText);
                // Prellenar los campos con los datos actuales de la persona
                document.getElementById("inputNombre").value = persona.nombre;
                document.getElementById("inputFechaNac").value = persona.fechaNac;
                document.getElementById("inputFoto").value = persona.foto;
                // Actualizar el id para guardar los cambios
                document.getElementById("btnAdd").setAttribute("data-id", idPersona);
            }
        };
        miLlamada.send();
    }
   

    // Función para añadir una persona
    function addPersona(persona) {
        var miLlamada = new XMLHttpRequest();
        miLlamada.open("POST", "http://localhost:5282/Api/Personapi/");
        miLlamada.setRequestHeader('Content-type', 'application/json charset=utf-8');

        var json = JSON.stringify(persona);

        miLlamada.onreadystatechange = function () {
            if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                alert("Persona insertada con éxito");
                obtenerPersonas();
            }
        };

        miLlamada.send(json);
    }

    document.getElementById("btnListar").addEventListener("click", function () {
        obtenerPersonas();
    });
  

    document.getElementById("btnAdd").addEventListener("click", function () {
        let nombre = document.getElementById("inputNombre").value;
        let foto = document.getElementById("inputFoto").value;
        let fechaNac = document.getElementById("inputFechaNac").value;

        let idPersona = document.getElementById("btnAdd").getAttribute("data-id");

        if (idPersona) {
            // Actualizar persona
            let persona = new clsPersona(idPersona, nombre, foto, fechaNac);
            actualizarPersona(persona);
        } else {
            // Añadir nueva persona
            let persona = new clsPersona(0, nombre, foto, fechaNac);
            addPersona(persona);
        }
    });
    let btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.addEventListener("click", function () {
        editarPersona(p.idPersona);
    });

    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", function () {
        eliminarPersona(p.idPersona);
    });

    // Actualizar persona
    function actualizarPersona(persona) {
        var miLlamada = new XMLHttpRequest();
        miLlamada.open("PUT", "http://localhost:5282/Api/Personapi/" + persona.idPersona);
        miLlamada.setRequestHeader('Content-type', 'application/json charset=utf-8');

        var json = JSON.stringify(persona);

        miLlamada.onreadystatechange = function () {
            if (miLlamada.readyState == 4 && miLlamada.status == 200) {
                alert("Persona actualizada con éxito");
                obtenerPersonas();
            }
        };

        miLlamada.send(json);
    }
};
