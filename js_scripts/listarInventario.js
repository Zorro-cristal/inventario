var inventario;
var inventarioAux;
var tbody;

//Funcion que se ejecuta cuando la pagina a sido carada totalmente
function paginaCargada() {
    tbody= document.querySelector('tbody');

    //Obtenemos la lista de inventario
    obtenerPHP();
    console.log(inventarioAux);
    inventario= inventarioAux;    

    // dialogBoton.addEventListener('click', (e) => {
    //   dialog.showModal();
    //   e.preventDefault();
    // });
  
    // dialog.addEventListener("click", (e) => {
    //   if (e.target === dialog) {
    //     dialog.close();
    //   }
    // });

    cargarLista();
}

//Filtrar Inventario
function filtrar(valor) {
    var filtro = valor.toUpperCase();
    if (filtro != "") {
        inventario.filter(
            obj => obj['nombre'].includes(filtro)
        );
        cargarLista();
    } else {
        inventario= inventarioAux;
        cargarLista();
    }
}

//Carga lista de inventario
function cargarLista() {
    const tbody= document.querySelector('tbody');
    //Creamos un nuevo cuerpo de la tabla
    var new_tbody= document.createElement('tbody');
    //populate_with_new_rows(new_tbody);

    //Agregamos los productos a la tabla
    for (i= inventario.length - 1; i >= 0; i--) {
        var tr= document.createElement('tr');
        tr.id=inventario[i]['id'];
        //Creamos las columnas
        var nombre= document.createElement('td');
        var descripcion= document.createElement('td');
        var stock= document.createElement('td');
        var precio= document.createElement('td');
        //Les asignamos sus propiedades
        nombre.innerHTML= inventario[i]['nombre'];
        //nombre.textContent(inventario[i]['nombre']);
        nombre.style.width= "30%";
        //descripcion.textContent(inventario[i]['descripcion']);
        descripcion.innerHTML= inventario[i]['descripcion'];
        descripcion.style.width= "45%"
        //stock.textContent(inventario[i]['stock']);
        stock.innerHTML= inventario[i]['stock'];
        stock.style.width= "10%";
        precio.innerHTML= inventario[i]['precio_venta'];
        //precio.textContent(inventario[i]['precio']);
        precio.style.width= "15%";
        //Le agregamos los hijos al tr
        tr.appendChild(nombre);
        tr.appendChild(descripcion);
        tr.appendChild(stock);
        tr.appendChild(precio);
        //Agregamos el hijo al tbody
        new_tbody.appendChild(tr);
    }
    //Reemplazamos el cuerpo viejo con el nuevo
    tbody.parentNode.replaceChild(new_tbody, tbody);
}

//Funcion para obtener los datos del php
function obtenerPHP() {
    $.ajaxSetup({async: false});
    $.ajax({
      url: "../php/listarInventario.php",
      type: "post",
    //   crossDomain: true,
    //   dataType: 'jsonp',
      error: function (jqXHR, textstatus, errorThrowm) {
        //parametros que reciben los erroes si hubiera alguno
        console.log(jqXHR);
        console.warn(textstatus);
        console.log(errorThrowm);
        alert("Error al obtener los datos de la base de datos");
        return
      },
      success: function (datos) {
        console.log(datos)
        inventarioAux= JSON.parse(datos);
        inventario= inventarioAux;
      }
    });
    $.ajaxSetup({async: true});
}
