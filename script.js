/* script.js
   Manejo del formulario, armado del mensaje de WhatsApp y comportamiento UI
*/

document.addEventListener('DOMContentLoaded', function(){
  populateYears();
  const sendBtn = document.getElementById('sendWhatsApp');
  sendBtn.addEventListener('click', sendWhatsApp);

  // Back to top
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 300) backBtn.style.display = 'flex'; else backBtn.style.display = 'none';
  });
  backBtn.addEventListener('click', ()=>{window.scrollTo({top:0,behavior:'smooth'})});
});

// Rellena el select de años desde el año actual hacia atrás
function populateYears(){
  const select = document.getElementById('anio');
  const currentYear = new Date().getFullYear();
  for(let y = currentYear; y >= 1980; y--){
    const opt = document.createElement('option');
    opt.value = y; opt.textContent = y; select.appendChild(opt);
  }
}

// Valida y arma el mensaje con todos los campos del formulario y abre WhatsApp Web/APP
function sendWhatsApp(){
  const name = document.getElementById('clienteNombre').value.trim();
  const phone = document.getElementById('clienteTelefono').value.trim();
  if(!name || !phone){
    alert('Por favor complete al menos Nombre y Teléfono.');
    return;
  }

  const marca = document.getElementById('marca').value;
  const anio = document.getElementById('anio').value;
  const modelo = document.getElementById('modelo').value.trim();
  const tipoConsulta = document.getElementById('tipoConsulta').value;
  const filtros = document.getElementById('filtros').value.trim();
  const kilometraje = document.getElementById('kilometraje').value;
  const cambioTipo = document.getElementById('cambioTipo').value;
  const viscosidad = document.getElementById('viscosidad').value;
  const baseAceite = document.getElementById('baseAceite').value;
  const detalle = document.getElementById('detalle').value.trim();

  // Construcción del mensaje multi-línea
  let mensaje = `*Consulta desde Lubricentro de la Kombi*%0A%0A`;
  mensaje += `*Cliente:* ${encodeURIComponent(name)}%0A`;
  mensaje += `*Teléfono:* ${encodeURIComponent(phone)}%0A%0A`;

  mensaje += `*Vehículo*%0A`;
  mensaje += `Marca: ${encodeURIComponent(marca)}%0A`;
  mensaje += `Año: ${encodeURIComponent(anio)}%0A`;
  mensaje += `Modelo: ${encodeURIComponent(modelo || 'N/D')}%0A`;
  mensaje += `Tipo de consulta: ${encodeURIComponent(tipoConsulta)}%0A%0A`;

  mensaje += `*Información técnica*%0A`;
  mensaje += `Filtros: ${encodeURIComponent(filtros || 'N/D')}%0A`;
  mensaje += `Kilometraje: ${encodeURIComponent(kilometraje || 'N/D')}%0A`;
  mensaje += `Cambio: ${encodeURIComponent(cambioTipo)}%0A`;
  mensaje += `Viscosidad: ${encodeURIComponent(viscosidad)}%0A`;
  mensaje += `Tipo de aceite: ${encodeURIComponent(baseAceite)}%0A%0A`;

  mensaje += `*Detalle adicional*%0A${encodeURIComponent(detalle || 'Sin detalles adicionales')}`;

  // Enviar a número específico (formato internacional sin +). Número provisto: 11 3612 9008 -> Argentina: 5491136129008
  const waUrl = `https://wa.me/5491136129008?text=${mensaje}`;

  // Abrir en nueva pestaña
  window.open(waUrl, '_blank');
}
