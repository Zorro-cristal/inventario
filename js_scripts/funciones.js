// Actualizar hora
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" +seconds;
}

// Asignar tema
function cambiarTema(opc= undefined) {
    const temaActual = localStorage.getItem("tema");
    console.log("Tema Almacenado: ", temaActual);
    let body= document.getElementsByTagName("body")[0];
    let nuevoTema = temaActual === 'light' ? 'dark' : 'light';
    
    if (opc !== undefined) {
        nuevoTema = opc;
    }

    body.classList.remove(`${temaActual}-mode`);
    body.classList.add(`${nuevoTema}-mode`);
    localStorage.setItem("tema", nuevoTema);
    body.offsetHeight;
    console.log("Cambiado  de " + temaActual + " a " + nuevoTema);
}

//Funcion para obtener datos de una tabla
async function obtenerBdd(tabla, filtro= "") {
    var datos;
    sql= "SELECT * FROM " + tabla;
    if (filtro != "") {
        sql= sql + " WHERE (" + filtro + ")";
    }
    sql= sql + ";";
    promesa= await obtencionBdd(sql).then((valor) => datos= valor);
    return datos;
}

function obtencionBdd(sql) {
  return new Promise(function (resolve, rejected) {
    $.ajaxSetup({async: false});
    $.ajax({
      url: "../php/obtenerBdd.php",
      type: "post",
      data: {
        "comando": sql
      },
      error: function (jqXHR, textstatus, errorThrowm) {
        //parametros que reciben los erroes si hubiera alguno
        console.log(jqXHR);
        console.warn(textstatus);
        console.log(errorThrowm);
        alert("Error al obtener los datos de la base de datos");
        rejected(errorThrowm);
        return
      },
      success: function (datos) {
        datos= JSON.parse(datos);
        resolve(datos);
      }
    });
    $.ajaxSetup({async: true});
  })
}