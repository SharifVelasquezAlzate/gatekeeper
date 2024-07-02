# Gatekeeper

### What is Gatekeeper?

Gatekeeper is a simple to get started with, flexible, and secure authentication module for your Express applications.

#### Nice and simple ✔️

This is what your authentication routes will look like after setting up Gatekeeper.

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';

const router = Router();

// Nice and simple!
router.post('/auth/google/*', gatekeeper.authenticateWithProvider('google'));
```

### Beloved features

- **Async/await 🌀** - Say goodbye to callbacks (very present in old authentication modules, like passport.js)

- **Lots of pre-built providers 🔒**  - Don't worry about implementing the most famous authentication providers -- We got you covered

- **Secure, easy-to-use, and ultra-flexible 🌟** - Effortless integration that adapts to your needs


## Getting Started

### Installation
```console
npm install @sharifvelasquez/gatekeeper
```

### Initializing your session module

Gatekeeper uses sessions to store the user data, thus, it is **very important** that you initialize the session module of your preference before initializing Gatekeeper. Throughout this documentation we will be using `express-session`.

### Initializing Gatekeeper

To initialize Gatekeeper you just have to pass `gatekeeper.initialize({ userSerializer, userDeserializer })` as an express middleware. Let's see an example:

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
	secret: 'I love pizza'
}));

app.use(gatekeeper.initialize({
	userSerializer: (user) => user.id,
	userDeserializer: (id) => {
		// Here we are returning an arbitrary user for the sake of the example
		return { id: id, username: 'David Hilbert' };
	}
}));
```

And with this gatekeeper is already initialized! You can skip to *Provider*, or if you want to know more about the User Serializer and User Deserealizer

#### But... What is a User Serializer?

A user serializer is a function that accepts a user object and returns a key that should be stored in the session. The key will then be used by the User Deserealizer to retrieve the user.

#### Example
```js
function userSerializer(user) {
	// For example, the user's id will allow us to retrieve the user later when the user deserializer gets called internally by gatekeeper 
	return user.id;
}
```

#### User Deserializer

A user deserealizer is a function that accepts a key and returns a user object.

#### Example
```js
function userDeserializer(key) {
	// Use the key (in this case, the user id) to retrieve the user
	const user = User.findOne({ id: key });
	return user;
}
```
Now that Gatekeeper is initialized, we can start implementing the concept of *Providers*
