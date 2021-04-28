import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';
//Graficas
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";

declare var require: any;

//Declarations de graficas
declare var require: any;
const data: any = require('../../shared/data/chartist.json');

//Interface de Graficas
export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

export interface Programas {
  id: number;
  nombre: string;
  porcentaje: number;
}
@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']

})


export class Dashboard1Component {

  programas: Programas[];

  //Variables
  MostrarMapa: boolean;
  MainEvaluador: boolean;
  MostrandoAreas: boolean;
  MostrandoMonitoreoInstitucional: boolean;
  MostrandoMonitoreoIntegral: boolean;
  MostrandoMonitoreoInstitucionalEspecifico: boolean;
  MostrandoMonitoreoIntegralEspecifico: boolean;
  MostrandoCreacionDeInformeInstitucional: boolean;
  MostrandoCreacionDeInformeIntegral: boolean;
  MostrandoBotonesAreaInstitucional: boolean;
  MostrandoBotonesAreaIntegral: boolean;
  MostrandoDetalleGrupo: boolean;
  MostrandoObservaciones: boolean;
  Nacional: boolean;
  MostrandoDescargas: boolean;
  estados = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Coahuila', 'Colima', 'Chiapas', 'Chihuahua', 'Durango', 'Distrito Federal', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];
  usuarioLogeado: string;

  ngOnInit() {
    //Variable de Usuario para mostrar si o no los elementos
    this.usuarioLogeado = localStorage.getItem('currentUser');
    //Mapeo de las cosas que debería ver cada usuario
    switch(this.usuarioLogeado){
      case 'funcionarioFederal': {

          break;
      }
      case 'evaluadorExterno': {
          //Puede ver mapa de la republica
          this.MostrarMapa = true;
          //Se muestran descargas
          this.MostrandoDescargas = true;
          break;
      }
      case 'enlaceEstatal': {
          //Puede ver mapa de la republica
          this.MostrarMapa = true;
            break;
      }
      default: {

          break;
      }
    }


    //Se inicializan variables de Cards en General
    this.MostrandoAreas = false;
    this.MostrandoMonitoreoInstitucional = false;
    this.MostrandoMonitoreoIntegral = false;
    this.MostrandoCreacionDeInformeInstitucional = false;
    this.MostrandoCreacionDeInformeIntegral = false;
    this.MostrandoMonitoreoInstitucionalEspecifico = false;
    this.MostrandoMonitoreoIntegralEspecifico = false;
    //Se inicializan variables de card de Areas
    this.MostrandoBotonesAreaInstitucional = false;
    this.MostrandoBotonesAreaIntegral = false;
    //Variables para Detalle de Grupo
    this.MostrandoDetalleGrupo = false;
    this.MostrandoObservaciones = false;
    //Nacional
    this.Nacional = false;
    //Se inicializan programas
    this.programas = this.getProducts();
  }
  /*
  *
  *
  * Funciones para Nacional
  *
  */
  //1.- Para mostrar
  VerNacional(){
    //Se esconde todo lo demas
    this.cerrarTodo();
    //Se muestra solo Nacional
    this.Nacional = true;
  }

  CerrarNacional(){
    //Se cierra todo
    this.cerrarTodo();
  }




  /*
  *
  *
  * Funciones para la card de Areas
  *
  */
  //1.- Para mostrar u ocultar la card de Areas
  ToggleAreas(){
    if(this.MostrandoAreas){
      this.MostrandoAreas = false;
    } else {
      this.MostrandoAreas = true;
    }
  }
  //2.- Para mostrar los botones 'Monitoreo' y 'Evaluacion Institucional'
  MostrarBotonesInstitucional(){
    this.MostrandoBotonesAreaInstitucional = true;
    this.MostrandoBotonesAreaIntegral = false;
    //Se cierran Monitoreos
    this.MostrandoMonitoreoInstitucional = false;
    this.MostrandoMonitoreoIntegral = false;
    //Se cierran Monitoreos Especificos
    this.MostrandoMonitoreoInstitucionalEspecifico = false;
    this.MostrandoMonitoreoIntegralEspecifico = false;
    //Se cierran Informes
    this.MostrandoCreacionDeInformeInstitucional = false;
    this.MostrandoCreacionDeInformeIntegral = false;
    this.MostrandoObservaciones = false;
  }
  MostrarBotonesIntegral(){
    this.MostrandoBotonesAreaInstitucional = false;
    this.MostrandoBotonesAreaIntegral = true;
    //Se cierran Monitoreos
    this.MostrandoMonitoreoInstitucional = false;
    this.MostrandoMonitoreoIntegral = false;
    //Se cierran Monitoreos Especificos
    this.MostrandoMonitoreoInstitucionalEspecifico = false;
    this.MostrandoMonitoreoIntegralEspecifico = false;
    //Se cierran Informes
    this.MostrandoCreacionDeInformeInstitucional = false;
    this.MostrandoCreacionDeInformeIntegral = false;
    this.MostrandoObservaciones = false;
  }


  /*
  *
  *
  * Funciones para la card de Monitoreos
  *
  */
  //1.- Mostrar la tabla de Monitoreo Institucional
  MostrarMonitoreoInstitucional(){
    this.MostrandoMonitoreoInstitucional = true;
    this.MostrandoMonitoreoIntegral = false;
    //Se muestran especificos
    this.MostrandoMonitoreoInstitucionalEspecifico = true;
    this.MostrandoMonitoreoIntegralEspecifico = false;
    //Se esconden Informes
    this.MostrandoCreacionDeInformeInstitucional = false;
    this.MostrandoCreacionDeInformeIntegral = false;
    //Esconder Detalle de Grupo
    this.MostrandoDetalleGrupo = false;
  }
  //2.- Mostrar la tabla de Monitoreo Integral
  MostrarMonitoreoIntegral(){
    this.MostrandoMonitoreoIntegral = true;
    this.MostrandoMonitoreoInstitucional = false;
    //Se muestran especificos
    this.MostrandoMonitoreoInstitucionalEspecifico = false;
    this.MostrandoMonitoreoIntegralEspecifico = true;
    //Se esconden Informes
    this.MostrandoCreacionDeInformeInstitucional = false;
    this.MostrandoCreacionDeInformeIntegral = false;
    //Esconder Detalle de Grupo
    this.MostrandoDetalleGrupo = false;
  }
  //3.- Botones para Cerrar Monitoreos
  OcultarMonitoreoInstitucional(){
    this.MostrandoMonitoreoInstitucional = false;
  }
  OcultarMonitoreoDetalladoInstitucional(){
    this.MostrandoMonitoreoInstitucionalEspecifico = false;
  }
  OcultarMonitoreoIntegral(){
    this.MostrandoMonitoreoIntegral = false;
  }
  //4.- Graficas generales
  // Bi-polar Line Chart Starts
  biPolarLineChart: Chart = {
    type: 'Line',
    data: data['Bi-PolarLine'],
    options: {
        high: 3,
        low: -3,
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
        axisX: {
            showGrid: false,
            offset: 100,
            labelInterpolationFnc: function (value: number, index: number): number {
                return index % 2 === 0 ? value : null;
            }
            },
            axisY: {
                scaleMinSpace: 30,
            }
        }
    };
    // Bi-polar Line Chart Ends
    //5.- Detalles de Grupo
    MostrarDetalleGrupo(){
      this.MostrandoDetalleGrupo = true;
    }
    CerrarDetalleGrupo(){
      this.MostrandoDetalleGrupo = false;
    }
    VerObservaciones(){
      this.MostrandoObservaciones = true;
    }
    CerrarObservaciones(){
      this.MostrandoObservaciones = false;
    }

  /*
  *
  *
  * Funciones para la card de Informes
  *
  */
  MostrarCreacionDeInformeInstitucional(){
    this.MostrandoCreacionDeInformeInstitucional = true;
    this.MostrandoCreacionDeInformeIntegral = false;
    //Se esconden monitoreos
    this.MostrandoMonitoreoIntegral = false;
    this.MostrandoMonitoreoInstitucional = false;
  }

  MostrarCreacionDeInformeIntegral(){
    this.MostrandoCreacionDeInformeIntegral = true;
    this.MostrandoCreacionDeInformeInstitucional = false;
    //Se esconden monitoreos
    this.MostrandoMonitoreoIntegral = false;
    this.MostrandoMonitoreoInstitucional = false;
  }


  /*
  *
  *
  * Card de Descargas
  *
  *
  * */
  cerrarDescargas(){
    this.MostrandoDescargas = false;
  }


  /*
  *
  *
  * Objeto a iterar: Programas
  *
  * */
  getProducts(): Programas[] {
    var result: Programas[] = [
      {
        'id': 1,
        'nombre': 'Programa 1',
        'porcentaje': 80
      },
      {
        'id': 2,
        'nombre': 'Programa 2',
        'porcentaje': 58
      },
    ];

    return result;
  }

  /*
  *
  *
  * Función que cierra todo
  *
  *
  * */
  cerrarTodo(){
    //Se inicializan variables de Cards en General
    this.MostrandoAreas = false;
    this.MostrandoMonitoreoInstitucional = false;
    this.MostrandoMonitoreoIntegral = false;
    this.MostrandoCreacionDeInformeInstitucional = false;
    this.MostrandoCreacionDeInformeIntegral = false;
    this.MostrandoMonitoreoInstitucionalEspecifico = false;
    this.MostrandoMonitoreoIntegralEspecifico = false;
    //Se inicializan variables de card de Areas
    this.MostrandoBotonesAreaInstitucional = false;
    this.MostrandoBotonesAreaIntegral = false;
    //Variables para Detalle de Grupo
    this.MostrandoDetalleGrupo = false;
    this.MostrandoObservaciones = false;
    //Nacional
    this.Nacional = false;
    //Descargas
    this.MostrandoDescargas = true;
  }
}
