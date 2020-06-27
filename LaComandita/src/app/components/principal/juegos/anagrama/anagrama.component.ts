import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.scss'],
})
export class AnagramaComponent implements OnInit {
  @Input() usuarioActual;
  puntaje: number = 0;
  @Input() palabra: string;
  @Input() vidas: number = 5;
  arrayPalabra: string[];
  mostrarPalabraSecreta: boolean = false;
  mostrar: boolean = false;
  empesarPartida: boolean = false;
  palabraIngresada: string;
  //---puntaje
  esTop1: boolean = false;
  emailUsuarioActual: string;
  //fin puntaje

  constructor(
    private localStorageService: LocalStorageService
    ) {

  }
  ngOnInit() {
  }

  abecedario: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  palabras: string[] = ["abrelatas", "disposicion", "parlante", "aire", "mesa", "PC", "libros", "escuela", "pelusa",
    "Andres", "esfera", "periferico", "animal", "esquina", "perro", "casco", "Eugenia", "piscinas", "pasto", "cuaderno", "planta",
    "Argentina", "Fernanda", "Polonia", "atomo", "Francia", "posavasos", "Belen", "galleta", "programa", "Beto", "Guadalupe", "puerta",
    "boton", "guitarra", "quimica", "Brasil", "hoja", "rectangulo", "Bruselas", "idea", "ropa", "cable", "Juanita", "silla", "calculadora", "juguete", "sonido", "carpeta", "Julio", "Spotify",
    "cartera", "La", "lampara", "suciedad", "celular", "loros", "sustancia", "cerradura", "Louisiana", "televidente", "cesped", "manantial", "televisor", "Chile", "Mariano", "tierra",
    "notebook", "mausoleo", "tigre", "circulo", "mesa", "Tomas", "ciudad", "Mexico", "trabajador", "ciruela", "molecula", "trabajo",
    "claridad", "mouse", "triangulo", "clavel", "mueble", "tulipan", "competencia", "Nicolas", "utensilio", "computadora", "notas", "vaso", "cuerda", "Nueva York", "ventana", "Dinamarca", "telefono", "vidrio", "asiento", "pantalla", "violin", "bateria", "Paris", "visita"];

  comenzar() {
    this.empesarPartida = !this.empesarPartida;
    this.cambiarPalabra();
  }
  mostrarPalabra() {
    this.mostrarPalabraSecreta = !this.mostrarPalabraSecreta;
    this.vidas--;
    setTimeout(() => {
      this.cambiarPalabra();
    }, 4000);
  }
  cambiarEstado() {
    this.mostrar = !this.mostrar;
  }


  compararPalabra() {
    console.log(this.palabra);
    if (this.palabraIngresada.toLocaleLowerCase() == this.palabra.toLocaleLowerCase()) {
      let audio = new Audio('../../../../../assets/audios/success.wav');
      audio.play();
      this.cambiarPalabra();
      this.vidas++;
      this.puntaje++;
    }
    else {
      this.vidas--;
      let audio = new Audio('../../../../../assets/audios/fail.wav');
      audio.play();
    }
    if (this.vidas == 0) {
      this.terminarPartida();
    }

  }
  terminarPartida() {
    this.localStorageService.guardarPuntuacionEnLocalStorage(this.emailUsuarioActual, 'anagrama', this.puntaje);
    this.esTop1 = this.localStorageService.verificarSiSuperoAlTop();
    this.empesarPartida = false;
    this.vidas = 5;
    this.puntaje = 0;
  }
  // Retorna un número aleatorio entre min (incluido) y max (excluido)
  numeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  //con esta funcion ordeno la palabra de 'A' a la 'Z'
  desordenarPalabra(arrayLetras) {
    let i = 0;
    let palabraDesordenada = new Array;
    this.abecedario.forEach(letraDelAbecedario => {
      arrayLetras.forEach(letraDeLaPalbra => {
        if (letraDeLaPalbra == letraDelAbecedario) {
          palabraDesordenada.push(letraDeLaPalbra);
        }
      });
    });
    return palabraDesordenada;
  }
  mostrarImagenesDePalabra() {
    this.arrayPalabra.forEach(letra => {

    });
  }
  cambiarPalabraYDescontar() {
    this.vidas--;
    this.cambiarPalabra();
  }
  cambiarPalabra() {
    if (this.vidas == 0) {
      this.terminarPartida();
    }
    this.mostrarPalabraSecreta = false;
    this.mostrar = false;
    let numeroRandom = this.numeroRandom(0, 101);
    this.palabra = this.palabras[numeroRandom].toLocaleLowerCase();
    let arrayLetras = this.separarPalabras(this.palabra);
    this.arrayPalabra = this.desordenarPalabra(arrayLetras);
    this.mostrarImagenesDePalabra();
    this.palabraIngresada = "";
  }

  separarPalabras(palabra) {
    let i;
    let arrayLetras = new Array;
    for (i = 0; i < palabra.length; i++) {
      arrayLetras.push(palabra[i]);
    }
    return arrayLetras;
  }


}
