import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  exercises: Exercise[] = [
{
   "call":"arbol (centro, hijoizquierdo, hijoderecho)",
   "creator":"Diego Mora",
   "code":"00061",
   "examples":[
      {
         "call":"arbol(100,[],[])",
         "result":"100",
         "comment":"En este caso este árbol aún no tiene hijos"
      },
      {
         "call":"arbol(100,[90,80],[110,105])",
         "result":"[10, [5, 4, 6], [7, 8, 9]]",
         "comment":""
      },
      {
         "call":"arbol(10,[5,4,6],[7,8,9])",
         "result":"[10, [5, 4, 6], [7, 8, 9]]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def arbol (centro, hijoizquierdo, hijoderecho):\n    if hijoizquierdo == [] and hijoderecho == []:\n        return centro\n    else:\n        return [centro] + [hijoizquierdo] + [hijoderecho]\n\n",
      "inputs":[
         {
            "name":"centro",
            "type":"Un valor para la raiz"
         },
         {
            "name":"hijoizquierdo",
            "type":"Una lista de un subarbol izquierdo"
         },
         {
            "name":"hijoderecho",
            "type":"Una lista de un subarbol derecho"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Árbol",
   "section":"Árboles",
   "details":"Realice una función que retorne una lista que simboliza un árbol, por lo que se conforma por hijo derecha e izquierdo y el valor que simboliza la raíz."
},
{
   "call":"atomo(x)",
   "creator":"Diego Mora",
   "code":"00062",
   "examples":[
      {
         "call":"atomo([100, [80, 70, 85], [120, 110, 125]])",
         "result":"False",
         "comment":""
      },
      {
         "call":"atomo([100, 1]) ",
         "result":"False",
         "comment":""
      },
      {
         "call":"atomo(100)",
         "result":"True",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"True o False",
            "type":"Un booleano"
         }
      ],
      "code":"def atomo(x):\n    return not isinstance (x, list)\n",
      "inputs":[
         {
            "name":"x",
            "type":"Un valor o un subárbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Átomo",
   "section":"Árboles",
   "details":"Realice una función que retorne True si el parámetro dado no es lista, y False si es lista; ésta servirá para otras funciones del árbol para saber  si es un valor o un subarbol"
},
{
   "call":"raiz (arbol)",
   "creator":"Diego Mora",
   "code":"00063",
   "examples":[
      {
         "call":"raiz([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"100",
         "comment":""
      },
      {
         "call":"raiz([40, 30, 45])",
         "result":"40",
         "comment":""
      },
      {
         "call":"raiz([1, [3,5,2], [12,11,[14,13,15]]])",
         "result":"1",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"valor",
            "type":"Valor que representa la raíz"
         }
      ],
      "code":"def raiz (arbol):\n    if atomo(arbol):\n        return arbol\n    else:\n        return arbol[0]\n",
      "inputs":[
         {
            "name":"arbol",
            "type":"Árbol o valor"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Raiz de un árbol",
   "section":"Árboles",
   "details":"Realice una función que devuelva la raiz de un árbol."
},
{
   "call":"hijoizq(arbol)",
   "creator":"Diego Mora",
   "code":"00064",
   "examples":[
      {
         "call":"hijoizq([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"[80, [70, 65, []], 85] ",
         "comment":""
      },
      {
         "call":"hijoizq([40, 30, 45])",
         "result":"30",
         "comment":""
      },
      {
         "call":"hijoizq([1, [3,5,2], [12,11,[14,13,15]]])",
         "result":"[3, 5, 2]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"subarbol",
            "type":"Lista que representa hijo izquierdo"
         }
      ],
      "code":"def hijoizq(arbol):\n    if atomo(arbol):\n        return []\n    else:\n        return arbol[1]\n",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Hijo izquierdo",
   "section":"Árboles",
   "details":"Realice una función que retorne el hijo izquierdo de un árbol."
},
{
   "call":"hijoder(arbol)",
   "creator":"Diego Mora",
   "code":"00065",
   "examples":[
      {
         "call":"hijoder([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"[120, 110, 125]",
         "comment":""
      },
      {
         "call":"hijoder([40, 30, 45])",
         "result":"45",
         "comment":""
      },
      {
         "call":"hijoder([1, [3,5,2], [12,11,[14,13,15]]])",
         "result":"[12, 11, [14, 13, 15]]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"subarbol",
            "type":"Lista que representa hijo izquierdo"
         }
      ],
      "code":"def hijoder(arbol):\n    if atomo(arbol):\n        return []\n    else:\n        return arbol[2]\n",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Hijo derecho",
   "section":"Árboles",
   "details":"Realice una función que retorne el hijo derecho de un árbol."
},
{
   "call":"hoja(nodo)",
   "creator":"Diego Mora",
   "code":"00066",
   "examples":[
      {
         "call":"hoja([10,[],[]])",
         "result":"True",
         "comment":""
      },
      {
         "call":"hoja([40, 30, 45])",
         "result":"False",
         "comment":""
      },
      {
         "call":"hoja([10,[4],[]])",
         "result":"False",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def hoja(nodo):\n    if nodo == []:\n        return False\n    elif atomo(nodo):\n        return True\n    elif hijoizq(nodo) == [] and hijoder(nodo) == []:\n        return True\n    else:\n        return False",
      "inputs":[
         {
            "name":"nodo",
            "type":"árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Hoja",
   "section":"Árboles",
   "details":"Realice una función que indique si un árbol o nodo es hoja, es decir, no tiene ni hijo izquierdo ni hijo derecho."
},
{
   "call":"insertar (ele, arb)",
   "creator":"Diego Mora",
   "code":"00067",
   "examples":[
      {
         "call":"insertar (65, [100, [80, 70, 85], [120, 110, 125]])",
         "result":"[100, [80, [70, 65, []], 85], [120, 110, 125]]",
         "comment":""
      },
      {
         "call":"insertar (124, [100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"[100, [80, [70, 65, []], 85], [120, 110, [125, 124, []]]]",
         "comment":""
      },
      {
         "call":"insertar (126,[100, [80, [70, 65, []], 85], [120, 110, [125, 124, []]]])",
         "result":"[100, [80, [70, 65, []], 85], [120, 110, [125, 124, 126]]]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def insertar (ele, arb):\n    if arb == []:\n        return ele\n    elif ele <= raiz(arb):\n        return arbol (raiz(arb), insertar(ele, hijoizq(arb)),\n                      hijoder(arb))\n    else:\n        return arbol (raiz(arb), hijoizq(arb), insertar(ele,hijoder(arb)))\n",
      "inputs":[
         {
            "name":"ele",
            "type":"elemento identificador del nodo del árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Insertar en árbol binario",
   "section":"Árboles",
   "details":"Realice una función que inserte un elemento en un árbol, puede probar para el arbol  [100, [80, 70, 85], [120, 110, 125]]."
},
{
   "call":"enOrden(arbol)",
   "creator":"Diego Mora",
   "code":"00068",
   "examples":[
      {
         "call":"enOrden([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"65 - 70 - 80 - 85 - 100 - 110 - 120 - 125",
         "comment":""
      },
      {
         "call":"enOrden([40, 30, 45])",
         "result":"30 - 40 - 45",
         "comment":""
      },
      {
         "call":"enOrden([1, [3,5,2], [12,11,[14,13,15]]])",
         "result":"5 - 3 - 2 - 1 - 11 - 12 - 13 - 14 - 15",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def enOrden(arbol):\n    if arbol != []:\n        enOrden(hijoizq(arbol))\n        print(raiz(arbol),end=' - ')\n        enOrden(hijoder(arbol))\n",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Recorrido en orden",
   "section":"Árboles",
   "details":"Realice una función que haga un recorrido en orden de un árbol (hijoizq-raiz-hijoder) y lo imprima."
},
{
   "call":"inOrden(arbol)",
   "creator":"Diego Mora",
   "code":"00069",
   "examples":[
      {
         "call":"inOrden([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"[65, 70, 80, 85, 100, 110, 120, 125]",
         "comment":""
      },
      {
         "call":"inOrden([40, 30, 45]) ",
         "result":"[30, 40, 45]",
         "comment":""
      },
      {
         "call":"inOrden([1, [3,5,2], [12,11,[14,13,15]]])",
         "result":"[5, 3, 2, 1, 11, 12, 13, 14, 15]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def inOrden(arbol):\n    if arbol!=[]:\n        return inOrden(hijoizq(arbol)) + [raiz(arbol)] + inOrden(hijoder(arbol))\n    return []",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Recorrido en orden ",
   "section":"Árboles",
   "details":"Realice una función que haga un recorrido en orden de un árbol (hijoizq+raiz+hijoder) y lo devuelva en una lista."
},
{
   "call":"pre_orden(arbol)",
   "creator":"Diego Mora",
   "code":"00070",
   "examples":[
      {
         "call":"pre_orden([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"[100, 80, 70, 65, 85, 120, 110, 125]",
         "comment":""
      },
      {
         "call":"pre_orden([40, 30, 45])",
         "result":"[40, 30, 45]",
         "comment":""
      },
      {
         "call":"pre_orden([1, [3,5,2], [12,11,[14,13,15]]]) ",
         "result":"[1, 3, 5, 2, 12, 11, 14, 13, 15]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def pre_orden(arbol):\n    if arbol == []:\n        return []\n    elif atomo(arbol):\n        return [arbol]\n    else:\n        return [raiz(arbol)] + pre_orden(hijoizq(arbol)) + pre_orden(hijoder(arbol))\n\n",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Preorden",
   "section":"Árboles",
   "details":"Realice una función que haga un recorrido en preorden de un árbol (raiz+hijoizq+hijoder) y lo devuelva en una lista.\n"
},
{
   "call":"post_orden(arbol)",
   "creator":"Diego Mora",
   "code":"00071",
   "examples":[
      {
         "call":"post_orden([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"[65, 70, 85, 80, 110, 125, 120, 100]",
         "comment":""
      },
      {
         "call":"post_orden([40, 30, 45])",
         "result":"[30, 45, 40]",
         "comment":""
      },
      {
         "call":"post_orden([1, [3,5,2], [12,11,[14,13,15]]])",
         "result":"[5, 2, 3, 11, 13, 15, 14, 12, 1]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def post_orden(arbol):\n    if arbol == []:\n        return []\n    elif atomo(arbol):\n        return [arbol]\n    else:\n        return post_orden(hijoizq(arbol)) + post_orden(hijoder(arbol)) + [raiz(arbol)]\n\n",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Postorden",
   "section":"Árboles",
   "details":"Realice una función que haga un recorrido en post-orden de un árbol (hijoizq+hijoder+raiz) y lo devuelva en una lista."
},
{
   "call":"plastar (arbol)",
   "creator":"Diego Mora",
   "code":"00072",
   "examples":[
      {
         "call":"aplastar([100, [80, [70, 65, []], 85], [120, 110, 125]])",
         "result":"[100, 80, 70, 65, 85, 120, 110, 125]",
         "comment":""
      },
      {
         "call":"aplastar([52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"[52, 30, 15, 35, 38, 70, 60, 65, 80]",
         "comment":""
      },
      {
         "call":"aplastar([1, [3,5,2], [12,11,[14,13,15]]])",
         "result":"[1, 3, 5, 2, 12, 11, 14, 13, 15]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Un árbol representado como una lista."
         }
      ],
      "code":"def aplastar(arbol):\n    if arbol == []:\n        return []\n    else:\n        return [raiz(arbol)]+aplastar(hijoizq(arbol))+ aplastar(hijoder(arbol))\n\n",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol."
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Aplastar árbol",
   "section":"Árboles",
   "details":"Realice una función que convierta un árbol en una lista."
},
{
   "call":"cantidadHojas(arbol)",
   "creator":"Diego Mora",
   "code":"00073",
   "examples":[
      {
         "call":"cantidadHojas([52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"4",
         "comment":""
      },
      {
         "call":"cantidadHojas([100, [80, [70, 65, 74], 85], [120, 110, 125]])",
         "result":"5",
         "comment":""
      },
      {
         "call":"cantidadHojas([100, [80, [70, 65, 74], 85], [120, 110, [125, 124, 126]]])",
         "result":"4",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def cantidadHojas(arbol):\n        if arbol == []:\n                return 0\n        elif hoja(arbol):\n                return 1\n        else:\n                return cantidadHojas(hijoizq(arbol))+ cantidadHojas(hijoder(arbol))\n        ",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Cantidad de hojas",
   "section":"Árboles",
   "details":"Realice una función que cuántas hojas tiene un árbol."
},
{
   "call":"esta(valor, arbol)",
   "creator":"Diego Mora",
   "code":"00074",
   "examples":[
      {
         "call":"esta(60, [52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"True",
         "comment":""
      },
      {
         "call":"esta(126, [100, [80, [70, 65, 74], 85], [120, 110, 125]])",
         "result":"False",
         "comment":""
      },
      {
         "call":"esta(5, [20,[10, 5, 15],[30, 25, 35]])",
         "result":"True",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"True o False",
            "type":"Un booleano"
         }
      ],
      "code":"def esta(valor, arbol):\n        if arbol == []:\n                return False\n        elif raiz(arbol) == valor:\n                return True\n        elif raiz(arbol) < valor:\n                return esta(valor, hijoder(arbol))\n        else:\n                return esta(valor,hijoizq(arbol))\n  ",
      "inputs":[
         {
            "name":"valor",
            "type":"Un número entero que representa un nodo en el árbol"
         },
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Está en árbol",
   "section":"Árboles",
   "details":"Realice una función que verifique si un nodo se encuentra en un árbol."
},
{
   "call":"localizar(ele, arb)",
   "creator":"Diego Mora",
   "code":"00075",
   "examples":[
      {
         "call":"localizar(60, [52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"60  en arbol  [52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]] se va a la derecha            60  en arbol  [70, [60, [], 65], 80] se va a la izquierda. True",
         "comment":""
      },
      {
         "call":"localizar(126, [100, [80, [70, 65, 74], 85], [120, 110, 125]]) ",
         "result":"126  en arbol  [100, [80, [70, 65, 74], 85], [120, 110, 125]] se va a la derecha            126  en arbol  [120, 110, 125] se va a la derecha            126  en arbol  125 se va a la derecha. False",
         "comment":""
      },
      {
         "call":"localizar(5, [20,[10, 5, 15],[30, 25, 35]]) ",
         "result":"5  en arbol  [20, [10, 5, 15], [30, 25, 35]] se va a la izquierda            5  en arbol  [10, 5, 15] se va a la izquierda. True",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"True o False",
            "type":"Un booleano"
         }
      ],
      "code":"def localizar(ele, arb):\n    if arb == []:\n        return False\n    elif ele == raiz (arb):\n        return True\n    elif ele < raiz(arb):\n        print (ele, \" en arbol \", arb, \"se va a la izquierda\")\n        return localizar(ele, hijoizq(arb))\n    else:\n        print (ele, \" en arbol \", arb, \"se va a la derecha\")\n        return localizar(ele, hijoder(arb))\n\n",
      "inputs":[
         {
            "name":"ele",
            "type":"Un número entero que representa un nodo en el árbol"
         },
         {
            "name":"arb",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Localizar nodo",
   "section":"Árboles",
   "details":"Realice una función que imprima hacia qué lado debe ir en cada sub-árbol para llegar a un determinado nodo."
},
{
   "call":"mayor(arbol)",
   "creator":"Diego Mora",
   "code":"00076",
   "examples":[
      {
         "call":"mayor([52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"80",
         "comment":""
      },
      {
         "call":"mayor([100, [80, [70, 65, 74], 85], [120, 110, []]])",
         "result":"120",
         "comment":""
      },
      {
         "call":"mayor([20,[10, 5, 15],[30, 25, 35]])",
         "result":"35",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Un número",
            "type":"Un número entero que representa un nodo"
         }
      ],
      "code":"def mayor(arbol):\n    if hijoder(arbol) == []:\n        return raiz(arbol)\n    else:\n        return mayor(hijoder(arbol))",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Nodo mayor",
   "section":"Árboles",
   "details":"Realice una función que determine el nodo mayor de un árbol binario ordenado."
},
{
   "call":"eliminar(ele, a)",
   "creator":"Diego Mora",
   "code":"00077",
   "examples":[
      {
         "call":"eliminar(30, [52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"[52, [15, [], [35, [], 38]], [70, [60, [], 65], 80]]",
         "comment":""
      },
      {
         "call":"eliminar(120,[100, [80, [70, 65, 74], 85], [120, 110, []]])",
         "result":"[100, [80, [70, 65, 74], 85], 110]",
         "comment":""
      },
      {
         "call":"eliminar(35, [20,[10, 5, 15],[30, 25, 35]])",
         "result":"[20, [10, 5, 15], [30, 25, []]]",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def eliminar(ele, a):\n    if a == []:\n        return []\n    elif ele < raiz(a):\n        return arbol (raiz(a), eliminar(ele, hijoizq(a)),hijoder(a))\n    elif ele > raiz(a):\n        print(raiz(a),hijoizq(a),hijoder(a))\n        return arbol (raiz(a),hijoizq(a), eliminar(ele, hijoder(a)))\n    # nodo no tiene hijos\n    elif hijoder(a) == [] and hijoizq(a) == []:\n        return []\n    # nodo no tiene hijo izquierdo\n    elif hijoizq(a) == []:\n        return hijoder(a)\n    # nodo no tiene hijo derecho\n    elif hijoder(a) == []:\n        return hijoizq(a)\n    else:\n        return arbol(mayor(hijoizq(a)),eliminar(mayor(hijoizq(a)),hijoizq(a)),hijoder(a)) ",
      "inputs":[
         {
            "name":"ele",
            "type":"Un número entero que representa un nodo en el árbol"
         },
         {
            "name":"a",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"3",
   "created":"2021-06-17",
   "name":"Eliminar nodo",
   "section":"Árboles",
   "details":"Realice una función que elimine un nodo de un árbol, tomando en cuenta los siguientes casos:\ncaso1: Borrar un nodo sin hijos, se borra simplemente.\ncaso2: Borrar un nodo con 1 hijo, el hijo lo sustituye.\ncaso3: Sustituirlo por el mayor de los menores o el menor de los mayores."
},
{
   "call":"cant_nodos(arb)",
   "creator":"Diego Mora",
   "code":"00078",
   "examples":[
      {
         "call":"cant_nodos([52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"9",
         "comment":""
      },
      {
         "call":"cant_nodos([100, [80, [70, 65, 74], 85], 120])",
         "result":"7",
         "comment":""
      },
      {
         "call":"cant_nodos([20,[10, 5, 15],[30, 25, 35]])",
         "result":"7",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Un número",
            "type":"Un número entero positivo o cero"
         }
      ],
      "code":"def cant_nodos(arb):\n    if arb == []:\n        return 0\n    else:\n        return 1 + cant_nodos(hijoder(arb)) +  cant_nodos(hijoizq(arb))",
      "inputs":[
         {
            "name":"arb",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Cantidad de nodos",
   "section":"Árboles",
   "details":"Realice una función que cuente cuántos nodos hay en un árbol."
},
{
   "call":"profundidad (arb)",
   "creator":"Diego Mora",
   "code":"00079",
   "examples":[
      {
         "call":"profundidad([52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"4",
         "comment":""
      },
      {
         "call":"profundidad([100, [80, [70, 65, 74], 85], 120])",
         "result":"4",
         "comment":""
      },
      {
         "call":"profundidad([20,[10, 5, 15],[30, 25, 35]])",
         "result":"3",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Un número",
            "type":"Un número entero positivo o cero"
         }
      ],
      "code":"def profundidad (arb):\n    if arb == []:\n        return 0\n    else:\n        return 1 + max (profundidad(hijoder(arb)), profundidad(hijoizq(arb)))\n",
      "inputs":[
         {
            "name":"arb",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"2",
   "created":"2021-06-17",
   "name":"Profubdidad de un árbol",
   "section":"Árboles",
   "details":"Realice una función que devuelva la profundidad de un árbol."
},
{
   "call":"altura(a)",
   "creator":"Diego Mora",
   "code":"00080",
   "examples":[
      {
         "call":"altura([52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"3",
         "comment":""
      },
      {
         "call":"altura([100, [80, [70, 65, 74], 85], 120])",
         "result":"3",
         "comment":""
      },
      {
         "call":"altura([20,[10, 5, 15],[30, 25, 35]])",
         "result":"2",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Un número",
            "type":"Un número entero positivo o cero"
         }
      ],
      "code":"def altura(a):\n    return profundidad (a) -1\n",
      "inputs":[
         {
            "name":"a",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Altura de un árbol",
   "section":"Árboles",
   "details":"Realice una función que devuelva la altura de un árbol."
},
{
   "call":"apariciones(ele, arb)",
   "creator":"Diego Mora",
   "code":"00081",
   "examples":[
      {
         "call":"apariciones(60,[52, [30, 15, [35, [], 38]], [70, [60, 60, 65], 80]])",
         "result":"2",
         "comment":""
      },
      {
         "call":"apariciones(100,[100, [80, [70, 65, 74], 85], 120])",
         "result":"1",
         "comment":""
      },
      {
         "call":"apariciones(35,[20, [10, 5, 15], [30, 25, [35, [35, 35, []], []]]])",
         "result":"2",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Un número",
            "type":"Un número entero positivo o cero"
         }
      ],
      "code":"def apariciones(ele, arb):\n    if arb == []:\n        return 0\n    elif raiz(arb) == ele:\n        return 1 + apariciones(ele,hijoder(arb)) +  apariciones(ele,hijoizq(arb))\n    else:        \n        return 0 + apariciones(ele,hijoder(arb)) +  apariciones(ele,hijoizq(arb))",
      "inputs":[
         {
            "name":"ele",
            "type":"Un número entero que representa un nodo en el árbol"
         },
         {
            "name":"arb",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Apariciones",
   "section":"Árboles",
   "details":"Realice una función que determine cuántas veces aparece un elemento en un árbol."
},
{
   "call":"apareceUnaVez (ele, arb)",
   "creator":"Diego Mora",
   "code":"00082",
   "examples":[
      {
         "call":"apareceUnaVez(60,[52, [30, 15, [35, [], 38]], [70, [60, 60, 65], 80]])",
         "result":"False",
         "comment":""
      },
      {
         "call":"apareceUnaVez(100,[100, [80, [70, 65, 74], 85], 120])",
         "result":"True",
         "comment":""
      },
      {
         "call":"apareceUnaVez(35,[20, [10, 5, 15], [30, 25, [35, [35, 35, []], []]]])",
         "result":"False",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Una lista ",
            "type":"Lista que representa un árbol"
         }
      ],
      "code":"def apareceUnaVez (ele, arb):\n    return apariciones(ele,arb) <= 1",
      "inputs":[
         {
            "name":"ele",
            "type":"Un número entero que representa un nodo en el árbol"
         },
         {
            "name":"arb",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"1",
   "created":"2021-06-17",
   "name":"Aparece una vez",
   "section":"Árboles",
   "details":"Realice una función que determine si uel valor de un nodo aparece una única vez."
},
{
   "call":"esConjunto(a)",
   "creator":"Diego Mora",
   "code":"00083",
   "examples":[
      {
         "call":"esConjunto([52, [30, 15, [35, [], 38]], [70, [60, 60, 65], 80]])",
         "result":"False",
         "comment":""
      },
      {
         "call":"esConjunto([100, [80, [70, 65, 74], 85], 120])",
         "result":"True",
         "comment":""
      },
      {
         "call":"esConjunto([20, [10, 5, 15], [30, 25, 35]])",
         "result":"True",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"True o False",
            "type":"Un booleano"
         }
      ],
      "code":"def esConjunto(a):\n    if a == []:\n        return True\n    return esConjuntoAux(a,a)\n\n#Función auxiliar\ndef esConjuntoAux (a1,a2):\n    if (a1 == []):\n        return True\n    else:\n        return apareceUnaVez(raiz(a1), a2) and esConjuntoAux(hijoizq(a1),a2) and esConjuntoAux(hijoder(a1),a2)\n",
      "inputs":[
         {
            "name":"a",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"3",
   "created":"2021-06-17",
   "name":"Es conjunto",
   "section":"Árboles",
   "details":"Realice una función o funcines para determinar si un árbol es conjunto, es decir si no tiene valores de nodos repetidos."
},
{
   "call":"mayor(arbol)",
   "creator":"Diego Mora",
   "code":"00084",
   "examples":[
      {
         "call":"mayorABD([52, [30, 15, [35, [], 38]], [70, [60, [], 65], 80]])",
         "result":"80",
         "comment":""
      },
      {
         "call":"mayorABD([100, [80, [70, 65, 74], 85], [120, 110, []]])",
         "result":"120",
         "comment":""
      },
      {
         "call":"mayorABD([20,[10, 5, 15],[30, 25, 35]])",
         "result":"35",
         "comment":""
      }
   ],
   "solution":{
      "outputs":[
         {
            "name":"Un número",
            "type":"Un número entero que representa un nodo"
         }
      ],
      "code":"def mayorABD(arbol):\n\n    #Si es un valor\n    if atomo(arbol):\n        return arbol\n    elif hijoizq(arbol) != [] and hijoder(arbol) != []:\n        return max(raiz(arbol), mayorABD(hijoizq(arbol)), mayorABD(hijoder(arbol)))\n    elif hijoizq(arbol) != []:\n        return max(raiz(arbol), mayorABD(hijoizq(arbol)))\n    else:\n        return max(raiz(arbol), mayorABD(hijoder(arbol)))",
      "inputs":[
         {
            "name":"arbol",
            "type":"Lista que representa un árbol"
         }
      ]
   },
   "level":"3",
   "created":"2021-06-17",
   "name":"Nodo mayor",
   "section":"Árboles",
   "details":"Realice una función que determine el nodo mayor de un árbol binario desordenado."
}
];


  constructor() { }

  ngOnInit(): void {
  }

}
