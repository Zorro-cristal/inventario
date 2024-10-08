// Funcion para dividir los numeros con miles
function divisorMiles(texto) {
  texto= texto.toString();
  decimal= texto.split(',')[1];
  texto= texto.split(',')[0];
  resultado= "";
  for (var i, f= texto.length; f >= 0; f= f - 3) {
      i= (i < 0) ? i= 0 : f - 3;
      if (resultado != "" && f != 0) {
          resultado= "." + resultado;
      }
      resultado= texto.substring(i, f) + resultado;
  }
  //Comprobamos si el numero tiene punto decimal
  if (decimal != undefined) {
      resultado= resultado + "," + decimal;
  }
  return resultado
}

// Actualizar hora
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" +seconds;
}

// Asignar tema
function cambiarTema(opc= undefined, inicio= false) {
    const tema_actual = localStorage.getItem("tema") || "light";
    console.log("Tema Almacenado: ", tema_actual, inicio);
    let body= document.getElementsByTagName("body")[0];
    
    // Si es la primera vez, no cambia el tema
    let nuevo_tema= tema_actual;
    if (!inicio) {
      nuevo_tema = tema_actual === 'light' ? 'dark' : 'light';
    
      if (opc !== undefined) {
          nuevo_tema = opc;
      }
    }

    // Ocultamos los botones correspondiente al tema actual
    let botones_dark= document.getElementsByClassName("dark-btn");
    let botones_light= document.getElementsByClassName("light-btn");
    Array.from(botones_dark).forEach(btn => {
        btn.style.display= "none";
    });
    Array.from(botones_light).forEach(btn => {
        btn.style.display= "none";
    });
    if (nuevo_tema === 'dark') {
        Array.from(botones_light).forEach(btn => {
            btn.style.display= "";
        }); 
    } else {
        Array.from(botones_dark).forEach(btn => {
            btn.style.display= "";
        });
    }
    

    body.classList.remove(`${tema_actual}-mode`);
    body.classList.add(`${nuevo_tema}-mode`);
    localStorage.setItem("tema", nuevo_tema);
    body.offsetHeight;
    console.log("Cambiado  de " + tema_actual + " a " + nuevo_tema);
}

//Funcion para obtener datos de una tabla
async function obtenerBdd(tabla, filtro= "") {
    var datos;
    sql= "SELECT * FROM " + tabla;
    if (filtro != "") {
        sql= sql + " WHERE (" + filtro + ")";
    }
    sql= sql + ";";
    await obtencionBdd(sql).then((result) => datos= result);
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