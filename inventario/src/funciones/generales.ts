// Funcion para seleccionar un elemento de un select
export function selectElement(idElement: string, valorSeleccionar: string) {
    let select: HTMLSelectElement | null= null;
    select = document.getElementById(idElement) as HTMLSelectElement;
    if (select) {
      for (let i: number= 0; i < select.children.length; i++) {
        let opcion: HTMLOptionElement | null= null;
        opcion= select.children[i] as HTMLOptionElement;
        if (opcion && opcion.value == valorSeleccionar) {
          opcion.selected= true;
          select.selectedIndex = i;
          break;
        }
      }
      select.value= valorSeleccionar;
    }
}

// Funcion para dividir los numeros con miles
export function divisorMiles(texto: string, eliminarFormato: boolean= false) : string {
  if (eliminarFormato) {
    texto= texto.replace('/./g', '');
    texto= texto.replace('/,/g', '.');
    return texto;
  } else {
    texto= texto.toString();
    if (texto.split('.').length > 1) {
      // Se redondea el numero de ser necesario
      texto= parseFloat(texto).toFixed(2);
      texto= texto.toString();
    }
    const decimal: string= texto.split('.')[1];
    const entero: string= texto.split('.')[0];
    let resultado: string= "";

    for (let i=0, f= entero.length; f >= 0; f= f - 3) {
        i= (i < 0) ? i= 0 : f - 3;
        if (resultado != "" && f > 0) {
          console.log(i, f)
            resultado= "." + resultado;
        }
        resultado= entero.substring(i, f) + resultado;
    }
    
    //Comprobamos si el numero tiene punto decimal
    if (decimal != undefined) {
        resultado= resultado + "," + decimal;
    }
    return resultado;
  }
}

// Funcion para obtener datos de la base de datos
export async function obtenerDatosBdd(tabla: string, columnas: string= "*", filtro= "") : Promise<Record<string, unknown>>{
  const response = await fetch("", {
    method: "POST",
    body: JSON.stringify({
      tabla: tabla,
      columnas: columnas,
      filtro: filtro
    })
  });
  return await response.json();
}