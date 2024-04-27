todo:
- chequear la funcionalidad del archivo error
- ver el tema de las carpetas mock que usan faker
- ver donde se usa matches
# rutas

## api/
### users/ (7)
|ruta|metodo|logged|auth rules|descripcion|
|-|-|-|-|-|
|/current|GET|si|-|imprime el usuario de la session|
|/|GET|si|ADMIN|ver todos los usuarios [username, rol, email ]|
|/_id|GET|si|-|detalle usuario|
|/|POST|no?|-|creacion de usuario, notificar por correo|
|/_id|PUT|si|ADMIN; user.id == _id|actualizacion de usuario|
|/|PUT|si|ADMIN|**WARNING:PENDIENTE** recibira un array que tenga como elementos obj {userid, rol, y cualquier dato pendiente a mod}|
|/_id|DELETE|si|ADMIN; user.id == _id|eliminacion de usuario, ver de eliminar todos sus productos, notificar por correo|
|/|DELETE|si|ADMIN|eliminar a todos cuyo ultimo logeo sea postarior a 2 dias, notificar por correo|

### products/ (5)
|ruta|metodo|logged|auth rules|descripcion|
|-|-|-|-|-|
|/|GET|si|-|ver todos los productos **Nota**: debe pdoer recibir parametros|
|/_id|GET|si|-|detalle producto|
|/|POST|si|USER-PREMIUM, ADMIN|creacion de producto|
|/_id|PUT|si|ADMIN; product.user.id == session.user._id|actualizacion de producto|
|/_id|DELETE|si|ADMIN; product.user.id == session.user._id|eliminacion de producto, notificar por correo|
|/|DELETE|si|-| **Nota** :esta la voy a comentar|

### carts/ (6)
|ruta|metodo|logged|auth rules|descripcion|
|-|-|-|-|-|
|/_id|GET|si|ADMIN; carts.id == session.user.cart._id|detalle cart, usar populate |
|/|POST|si|-|**Nota**: imagino que se creara junto con el User, asi que comentada|
|/_id|PUT|si| carts.id == session.user.cart._id| sobrescribira lo existente con un array de [{product:id,count:num}], **Nota**: ver si alcanzo hacer verificacion de formato|
|/_id/products/_pid|PUT|si| carts.id == session.user.cart._id| carga de cantidad de producto _pid en cart|
|/_id/products/_pid|DELETE|si| carts.id == session.user.cart._id|elimina producto _pid de carrito|
|/_id/products/|DELETE|si| carts.id == session.user.cart._id|vacia el carrito|
|/|GET|si|-|**Nota** :comentada|
|/_id|DELETE|si|-|**Nota** :comentada|
|/|DELETE|si|-| **Nota** :comentada|

### sessions/ (2)
|ruta|metodo|logged|auth rules|descripcion|
|-|-|-|-|-|
|/|POST|no|-|ingreso de username,pass para login |
|/current|DELETE|si|-|cierre de sesion|


## web

|ruta|logged|auth rules|descripcion|
|-|-|-|-|
|/login|no|-|login page |
|/register|no|-|pagina para crear usuario |
|/users/_id|si|-|show del user _id|
|/users/|si|ADMIN|form para el update de usuarios, ponele|
|/products/|si|-|index productos, parametros mas, parametros menos|
|/products/_id|si|-|show producto|
|/products/create|si|USER-PREMIUM, ADMIN|product create **Nota**:vere si llego|
|/my_cart/|si|session.user.cart._id |el usuario vera **su** propio carrito|
|/my_cart/|si|session.user.cart._id |el usuario vera **su** propio carrito|
|/purchased/|si|session.user.cart._id |vista del ticket de la compra **Nota**:pendiente a analizar|

especulo que habra:
* vista login
* vista crear usuario
* vista detalle usuario (no se si esta hace falta)
* vista productos, con buscador
* detalle producto
* crear producto //vere si llego
* vista detalle carrito
* vista de compra realizada
* vista update de usuarios

tambien:
* boton de logout
* boton de agregar carrito
* boton de realizar compra
* boton purgar usuarios

( *llora * X3)

# videos:
### video 1:
- puerto 8080
- node.js
- /products
  - model: {id,title,description,code,price,status,stock,category,user_id,thumbnails}
  - /,get,todos los productos
  - /_id,get,show del producto llamado
  - /_id,put, actualizacion de producto
  - /_id,delete, eliminacion del carrito
- /carts
  - model:id, products
  - /,post,crea un carrito
  - /_id,get,muestra todos los productos del carrito
  - /_cid/product/_pid,post,agrega la cantidad  params del producto mencionado en _pid, si existe en el cart, solo agergar la cantidad mencionada

### video 2:
- que /products/ (get) permita recibir parametros como :
  - limit
  - page
  - sort
  - query
  - y que devuelva algo de mongoose paginate
- modificar de /carts
  - delete carts/_cid/products/_pid eliminar del carito el producto seleccionado
  - put carts/_cid actualizara al nuevo array entregado
  - put carts/_cid/products/_pid actualizara la cantidad del carrito mencionado
  - get carts/_cid hacer un populate con los productos pretenecientes al carts
- en la web:
  - vista paginada de productos
  - boton de agregar al carrito
  - vista para mostrar los productos del carrito

### video 3:
- plicar ,factory (ponele), dao y dto
- usar mongoDB
- /current , no enviar informacion sencible
- middleware de autorizacion
- solo ADMIN puede crear, actualizar y eliminar products
- solo el usuario puede enviar mensajes en el chat (creo que el chat ya no era obligatorio)
- solo el usuario puede acregar productos al carrito
- ADMIN no puede agregar producto a carrito
- modelo Ticket:
  - id
  - codigo unico
  - purchase_datetime:fecha y hora
  - amount: costo basicamente
  - correo del comprador
- en la web, cuando se apriete comprar, ejecutar la compra
- carts/_id/purchase esta es la ruta para hacer la compra
- cuando se realiza la compra, comprobar y actualizar los productos
  - si hay suficiente stock, restarle del producto al realizar la compra
  - si no tiene suficiente stock, se mantendran en el carrito
  - user ticketService para generar la compra real
    - informar que productos no fueron comprados
- en el carrito del producto solo deben quedar los productos que no consiguieron comprarse, si todo se compro, deberia quedar vacio

### video 4:
- vista en web para eliminar, mod rol y visualizar usuarios [solo admins]
- api/users
  - get, todos los usuarios (solo nombre, correo y rol)
  - delete, limpiara a los usuarios que no se conectaron en los ultimos 2 dias (solo ADMINs) avisar a los eliminados por correo
- products
  - delete, avisar al dueño del producto la eliminacion del mismo 
- web ( *llora *)
  - login
  - crear usuario
  - agregar carrito
  - visualizacion carrito
  - visualizacion producto
  - finalizacion compra
- proyecto en github
- proyecto desplegado ( *llora * X 2 )


### consideraciones a integrar
* PUT /api/carts/current (modifico el carrito del usuario logueado para agregar una cantidad de un producto a eleccion)
* POST /api/tickets (cierra la compra, genera el ticket, lo guarda y lo devuelve, y deja el carrito vacío)


### notas clase 23
diferenciar carpetas para cargar archivos (multer)
logger =error  es mas grave
* poder configurar el port y demas configuracioenes, se debe poder pasar desde afuera
* 2:18
* repositorio privado
* crear 3 ramas
  * development
  * staging
  * production 
* render.com
* registrarse
  * ir a dashboard  
    * webservices
    * seleccionar git repository
    * vincular con github
      * ir opbiones github
      * conf/aplicaciones
      * ir a render
      * configurar el repositorio a enlazar
      * 2:40 configuracion en plataforma 
      * 2:46 correo 