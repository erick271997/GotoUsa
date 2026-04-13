Proxy local para probar EOIR dentro de la app
===========================================

Este pequeño README explica cómo ejecutar un proxy local y exponerlo por HTTPS (con ngrok) para que la `WebView` en la app cargue la página EOIR sin problemas de certificado.

1) Instalar dependencias (en la raíz del proyecto):

```bash
cd /Users/erickcampaz/Desktop/GoToUsa
npm install express node-fetch@2 cors
```

2) Ejecutar el proxy:

```bash
node tools/proxy.js
```

3) (Opcional pero recomendado) Exponer por HTTPS con ngrok para que el dispositivo móvil pueda acceder:

```bash
# instala ngrok si no lo tienes y luego:
ngrok http 3000

# ngrok te dará una URL como https://abcd-1234.ngrok.io
```

4) En la app `EOIRScreen.js` edita la constante `PROXY_BASE` y pon la URL de ngrok seguida de `/proxy?url=`.

Por ejemplo:

```js
// PROXY_BASE en EOIRScreen.js
const PROXY_BASE = 'https://abcd-1234.ngrok.io/proxy?url=';
```

5) En la app, desde la pantalla EOIR, pulsa "Abrir vía proxy". La WebView usará el proxy y debería evitar el error de certificado.

Limitaciones:
- El proxy reenvía el HTML tal cual; recursos relativos (CSS/JS) pueden romperse en algunas páginas.
- Para producción monta un proxy/controlado en un servidor propio y expón sólo la API necesaria.
