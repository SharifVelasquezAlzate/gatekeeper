### How does Gatekeeper work?

Vamos a verlo con un ejemplo, implementando autenticación de Google en nuestra aplicación.

Lo primero que debes hacer es inicializar tu módulo de sesión (es recomendable utilizar express-session).


## Initializing Gatekeeper
Para inicializar Gatekeeper solo deberemos especificar dos funciones: userSerializaer, y userDeserealizer.

userSerializer será la función que nos permita guardar la información del usuario internamente (generalmente guardaremos el id de un usuario)

userDeserealizer se encargará de, cada vez que llegue una nueva petición, recuperar el usuario que serializamos con userSerializer (en el caso de haber serializado el usuario con su id, userDeserealizer se encargará de recuperar el usuario a partir de su id).

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
	secret: 'I love pizza :D',
}));

// Inicializamos Gatekeeper
app.use(gatekeeper.initialize({
	userSerializer: (user) => user?.id
	userDeserealizer: (id) => {
		// Use the serealized data to retrieve the user
		return User.find({ id: id });
	}
}))
```

And that's it! Now we just have to setup our providers.

### How does a Provider work?

#### Handler
A handler is a function that accepts the information retrieved by a provider and returns a user to be saved in session.

For example, the Google provider retrieves an access token and the user's profile information. Using these two pieces of data, a handler returns a user to be saved in session, just like this:

```js
gatekeeper.registerProvider('google', new GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.OWN_URL}/auth/google/callback`
        }, (access_token, profile) => {
            const user = db.query('SELECT * FROM users WHERE id = ?', profile.id);

            return user;
        }));
```

### Configuring Providers

Ahora crearemos un archivo llamado "gatekeeperConfig.js" en el cual configuraremos nuestros proveedores.

Lo primero que haremos será configurar nuestro proveedor con el método `registerProvider`, quien recibe como primer parámetro el nombre con el que nos referiremos a nuestro proveedor, y como segundo, el proveedor:

```js
import gatekeeper from '@sharifvelasquez/gatekeeper'
import GoogleProvider from '@sharifvelasquez/gatekeeper/providers/google'

gatekeeper.registerProvider('google', new GoogleProvider())
```

Gatekeeper utiliza "Providers", quienes se encargan de realizar toda la lógica detrás de la autenticación.

Cada provider entrega una determinada información (por ejemplo, todos los Providers que hacen uso de OAuth2 (Google, Github, Facebook, etc.) entregan la infomación básica del usuario)

para esto cada Profile requiere de un Handler que se encarga de 
