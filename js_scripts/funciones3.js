//Validacion de registro
const venc= new Date("2023-07-01");
let f= new Date();
if (f >= venc) {
  console.info("Alerta comentada");
  //alert("Fecha de pago vencido");
}

//Funciones de comprobacion de roles
async function validarRol(rolValidar) {
  try {
    //Extraemos el user del localStorage
    const userName= localStorage.getItem("alias");
    //Obtenemos el rol
    obtencion= new Promise((resolve, reject) => {
      $.ajaxSetup({async: false});
      $.ajax({
          url: "../php/obtenerRol.php",
          type: "post",
          data: {
              'usuario': userName
          },
          error: function (jqXHR, textstatus, errorThrowm) {
              //parametros que reciben los erroes si hubiera alguno
              console.log(jqXHR);
              console.warn(textstatus);
              console.log(errorThrowm);
              alert("Error al obtener los datos de la base de datos");
              return
          },
          success: function (datos) {
              alias= JSON.parse(datos)[0].alias.toString();
          }
      });
      $.ajaxSetup({async: true});
    }).then(valor => alias= valor);

    if (alias == rolValidar) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    localStorage.removeItem("alias");
    window.location.replace("../index.html");
  }
}

// Funcion para dividir los numeros con miles
function divisorMiles(texto) {
    texto= texto.toString();
    decimal= texto.split('.')[1];
    texto= texto.split('.')[0];
    resultado= "";
    for (var i, f= texto.length; f >= 0; f= f - 3) {
        i= f - 3;
        if (i < 0) {
            i= 0;
        }
        if (resultado != "" && f != 0) {
            resultado= "." + resultado;
        }
        resultado= texto.substring(i, f) + resultado;
    }
    //Comprobamos si el numero tiene punto decimal
    if (decimal != undefined) {
        console.log(texto)
        resultado= resultado + "," + decimal;
    }
    return resultado
}

//Funcion para obtener datos de una tabla
async function obtenerBdd(tabla, filtro= "") {
    var datos;
    sql= "SELECT * FROM " + tabla;
    if (filtro != "") {
        sql= sql + " WHERE (" + filtro + ")";
    }
    sql= sql + ";";
    promesa= await ajax(sql).then((valor) => datos= valor);
    return datos;
}

function ajax(sql) {
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

// Funcion que retransforma las fechas
function conversorFecha(fecha) {
    return fecha.substr(8) + "/" + fecha.substr(5, 2) + "/" + fecha.substr(0, 4);
}