export const formatearFechaHora = (fechaHora) => {
    const fecha = new Date(fechaHora);
    
    // año, mes y día
    const año = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const dia = ('0' + fecha.getDate()).slice(-2);
  
    // hora y minutos
    const hora = ('0' + fecha.getHours()).slice(-2);
    const minutos = ('0' + fecha.getMinutes()).slice(-2);
  
    return `${dia}/${mes}/${año} ${hora}:${minutos}`;
  };

 