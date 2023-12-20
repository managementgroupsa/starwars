# starwars

Este proyecto desarrolla el Reto Técnico para la creación de un API Gateway en AWS con utilizando serverless. El despliegue debe realizarse con el comando del "deploy".

A continuación se describe el reto técnico:

1. Crear una API en Node.js con el framework Serverless para un despliegue en AWS. 
2. Adaptar y transformar los modelos de la API de prueba. Se tienen que mapear todos los nombres de atributos modelos del inglés al español. 
3. Integrar la API de prueba StarWars API (líneas abajo está el link) se deben integrar uno o más endpoints. 
4. Crear un modelo de su elección mediante el uso de un endpoint POST, la data se tendrá que almacenar dentro de una base de datos. 
5. Crear un endpoint GET que muestre la data almacenada. 
6. El proyecto se integra con una base de datos en MYSQL utilizando el servicio RDS de Amazon. 
7. El lengiuaje de programación es Node.js 


API de prueba SWAPI: https://swapi.py4e.com/documentation

## Tabla de Contenidos

- [Instalación](#instalación)
- [Arquitectura](#arquitectura)
- [Uso](#uso)
- [Pruebas](#pruebas)
- [Documentación](#documentación)
- [Test](#test)

## Instalación

Una vez descargado el proyecto se debera de instalar las siguientes dependencias:

```shell
# Ejemplo de comandos para la instalación de axios
npm install axios
```
```shell
# Ejemplo de comandos para la instalación de express
npm install express
```
```shell
# Ejemplo de comandos para la instalación de Mysql
npm install mysql
```

## Arquitectura

Los Endpoints creados tienen acceso a dos origenes de datos diferentes como se muestra a continuacion:

![Arquitectura](/src/assets/images/arquitectura.png)

## Uso

Los Endpoints creados que se conectan a la base de datos MYSQL son:

1. Listar especies  

    Permite consultar todas las especies.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/listarespecies
    METODO: GET  

2. Listar especies por nombre:  

    Permite consultar todas las especies por nombre.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/listarespecies/{nombre}
    METODO: GET  

3. Crea especies:  

    Permite crear una especie, para ello se debe de enviar un JSON como body y en el parametro accion debera de tener los siguientes valores: INSERTAR.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/especies  
    METODO: POST  
    JSON:  
```shell
# Ejemplo de comandos para crear una especie.
{
    "accion": "INSERTAR",
    "id": null,
    "nombre": "Human Full All",
    "clasificacion": "clasif",
    "designacion": "sentient",
    "promedio_altura": "180",
    "promedio_tiempovida": "120",
    "color_ojos": "brown, blue, green, hazel, grey, amber",
    "color_cabello": "blonde, brown, black, red",
    "color_piel": "caucasian,",
    "lenguaje": "Galactic Basic",
    "mundonatal": "https://swapi.py4e.com/api/planets/9/",
    "personas": [
        "https://swapi.py4e.com/api/people/13/",
        "https://swapi.py4e.com/api/people/80/"
    ],
    "peliculas": [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/2/",
        "https://swapi.py4e.com/api/films/3/"
    ],
    "url": "https://www.linkedin.com/in/miguellopezs/",
    "creado": null,
    "editado": null
}  
```
4. Eliminar especies:  

    Permite eliminar una especie, para ello se debe de enviar un JSON como body y en el parametro accion debera de tener los siguientes valores: ELIMINAR.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/especies  
    METODO: DELETE  
    JSON:  
```shell
# Ejemplo de comandos para eliminar una especie, donde el poarametro "id" es la llave de la tabla asociada.
{
    "accion": "ELIMINAR",
    "id": 13,
    "nombre": "",
    "clasificacion": "",
    "designacion": "",
    "promedio_altura": "",
    "promedio_tiempovida": "",
    "color_ojos": "",
    "color_cabello": "",
    "color_piel": "",
    "lenguaje": "",
    "mundonatal": "",
    "personas": 0,
    "peliculas": 0,
    "url": "",
    "creado": null,
    "editado": null
}
```

5. Listar peliculas:  

    Permite consultar todas las peliculas.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/listarpeliculas  
    METODO: GET  

6. Listar peliculas por titulo:  

    Permite consultar todas las peliculas por titulo.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/listarpeliculas/{titulo}  
    METODO: GET  

7. Crea peliculas:  

    Permite crear una pelicula, para ello se debe de enviar un JSON como body y en el parametro accion debera de tener los siguientes valores: INSERTAR.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/peliculas  
    METODO: POST  
    JSON:  
```shell
# Ejemplo de comandos para crear una pelicula.
{
    "accion": "INSERTAR",
    "id": 0,
    "titulo": "A New Hope 5",
    "id_episodio": 5,
    "apertura": "It is a period of civil war.",
    "director": "George Lucas",
    "produccion": "Gary Kurtz, Rick McCallum",
    "fecha_realizacion": "1977-05-25T05:00:00.000Z",
    "planetas": [
        "https://swapi.py4e.com/api/planets/1/",
        "https://swapi.py4e.com/api/planets/2/"
    ],
    "especies": [
        "https://swapi.py4e.com/api/species/1/",
        "https://swapi.py4e.com/api/species/2/",
        "https://swapi.py4e.com/api/species/3/"
    ],
    "estelares": [
        "https://swapi.py4e.com/api/starships/2/",
        "https://swapi.py4e.com/api/starships/3/",
        "https://swapi.py4e.com/api/starships/4/"
    ],
    "vehiculos": [
        "https://swapi.py4e.com/api/vehicles/4/",
        "https://swapi.py4e.com/api/vehicles/6/"
    ],
    "caracteres": [
        "https://swapi.py4e.com/api/people/4/",
        "https://swapi.py4e.com/api/people/5/",
        "https://swapi.py4e.com/api/people/6/",
        "https://swapi.py4e.com/api/people/7/",
        "https://swapi.py4e.com/api/people/8/"
    ]
}  
```  

8. Eliminar peliculas:  

    Permite eliminar una pelicula, para ello se debe de enviar un JSON como body y en el parametro accion debera de tener los siguientes valores: ELIMINAR.  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/peliculas  
    METODO: DELETE  
    JSON:  
```shell
# Ejemplo de comandos para eliminar una peliculas, donde el poarametro "id" es la llave de la tabla asociada.
{
    "accion": "ELIMINAR",
    "id": 5,
    "titulo": "",
    "id_episodio": 0,
    "apertura": "",
    "director": "",
    "produccion": "",
    "fecha_realizacion": null,
    "especies": "",
    "estelares": "",
    "vehiculos": "",
    "caracteres": "",
    "planetas": "",
    "url": "",
    "creado": null,
    "editado": null
}
```  

Los Endpoints creados que se conectan al APi de prueba SWAPI son:  

9. Listar apis:  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/swapiraiz  
    METODO: GET  

10. Listar peliculas:  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/swapipeliculas  
    METODO: GET  

11. Listar peliculas por titulo:  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/swapipeliculas/{titulo}  
    METODO: GET  

12. Listar personas:  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/swapipersonas  
    METODO: GET  

13. Listar personas por nombre:  

    URL:    https://oi3ppomtoi.execute-api.us-east-2.amazonaws.com/dev/swapipersonas/{nombre}  
    METODO: GET  

## Pruebas  

Todas Las pruebas se realizaron utilizando POSTMAN, tanto para el CRUD para los servicios de las Especies y de las Peliculas.  

A continuacion muestro algunas de todas las pruebas realizadas:  

Prueba 01: Muestra el listado de especies

![prueba01](/src/assets/images/prueba01.png)  

Prueba 02: Inserta una especie

![prueba02](/src/assets/images/prueba02.png)  

Prueba 03: Listado de peliculas por nombre (nombre = hope)

![prueba03](/src/assets/images/prueba03.png)  

Prueba 04: Edicion de una pelicula por id (id = 2)

![prueba04](/src/assets/images/prueba04.png)  

## Documentación  

Se realizó la documentación con SWAGGER, para ello se levanto en proyecto en modo offline y en otro terminal el frontend del swagger, direccionando a la url y el puerto del backend de los APIS.  

A continuación se muestran algunas de todas las pruebas realizadas:  

Prueba 01: Muestra el listado de los APIS utilizanfo los metodos: GET, POST y DELETE.

![prueba05](/src/assets/images/prueba05.png)  

Prueba 02: Muestra el resultado de ejecución de unos de los APIS  

![prueba06](/src/assets/images/prueba06.png)  

## Test  

Se realizó las pruebas unitarias se utilizo la biblioteca Mocha y una biblioteca de aserciones Chai, en conjunto con herramientas como Sinon para la simulacion de llamadas a la API.  

A continuación se muestran algunas de  las pruebas realizadas:  

Prueba 03: Prueba de validacion de rutas HTTP y prueba de timpo de respuesta.

![prueba07](/src/assets/images/prueba07.png)  

Prueba 04: Prueba de validación de entradas en la url y tiempo de respuesta.  

![prueba08](/src/assets/images/prueba08.png)  