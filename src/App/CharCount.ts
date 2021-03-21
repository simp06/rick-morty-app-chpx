var paginas = require("../services/paginas");

var metodos = require("../utils/CharCount/metodos");
var metodosEp = require("../utils/EpisodeLo/metodos");
const Init =()=>{
   const CharCount =()=>{
     let init = async()=>{
      console.time('Tiempo ejecucion');     
       const _locations ={
         cantidadPaginas : 0,
         entidad : "locations",
         filter : '{ name: "l" }',
         letra : 'l',
         results : "name"      
       
       }
       const _characters ={
        cantidadPaginas : 0,
        entidad : "characters",
        filter : '{ name: "c" }',
        results : "name",
        letra : 'c'

      }
      const _episodes ={
        cantidadPaginas : 0,
        entidad : "episodes",
        filter :  '{ name: "e" }',
        results : "name",
        letra:"e"
      }
       await paginas.obtenerCantidadPaginas(`{
        _locations:locations(filter: { name: "l" }) {
          info {
            pages
          }
        },
        _episodes:episodes(filter: { name: "e" }) {
          info {
            pages
          }
        },
        _characters:characters(filter: { name: "c" }) {
          info {
            pages
          }
        }
      }`).then((data)=>{
        metodos.obtenerOcurrencia(data,_locations);
         metodos.obtenerOcurrencia(data,_episodes);
        metodos.obtenerOcurrencia(data,_characters);
        console.timeEnd('Tiempo ejecucion');
        })
     };
     
     init();
    }
    const _CharCount =()=>{
      let init = async()=>{
       console.time('Tiempo ejecucion');     
       const _episodes ={
         cantidadPaginas : 0,
         entidad : "episodes",
         filter :  '',
         results : "name characters{origin{name}}",
         letra:"e"
       }
        await paginas.obtenerCantidadPaginas(`{_episodes:episodes(page:1) {
          info{
            count
            pages
          }
        }
         
       }`).then((data)=>{
        console.time('Tiempo ejecucion EpLocation');
        metodosEp.obtenerListado(data,_episodes)
         console.timeEnd('Tiempo ejecucion EpLocation');
         })
      };
      
      init();
     }
     _CharCount();
    CharCount();
  
  }
  module.exports.init=Init;
  