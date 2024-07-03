# Gatekeeper

### What is Gatekeeper?

Gatekeeper is a secure, flexible, and very easy-to-use authentication module for your Express applications.

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

- **Lots of pre-built providers 🔒**  - Don't worry about implementing the most famous authentication providers -- We got you covered 😉

- **Secure, easy-to-use, and ultra-flexible 🌟** - Effortless integration that adapts to your needs


## Getting Started

### Installation
```console
npm install @sharifvelasquez/gatekeeper
```

### Initializing your session module

Gatekeeper uses sessions to store the user data, thus, it is **very important** that you initialize the session module of your preference before initializing Gatekeeper. Throughout this documentation we will be using `express-session`.

### Initializing Gatekeeper

To initialize Gatekeeper you just have to pass `gatekeeper.initialize({ userSerializer, userDeserializer })` as an express middleware (make sure to do it **after** you initialize your session module). Let's see an example:

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

And with this, gatekeeper is already initialized! Nonetheless, as you saw, we had to pass an object with two properties: userSerializer and userDeserealizer.

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

## What is a Provider?

Providers are an essential part of Gatekeeper. They abstract the complexities involved in managing authentication (such as handling tokens, callbacks, etc.) and offer a clean, easy-to-use way to authenticate users.

Providers accept three parameters:

### Options

Allow you to pass additional data for a Provider to work, or to customize it to your needs. Each provider has its own options, so be sure to check out our *Providers* page and look for the providers you want to implement.

#### Example #1

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
import GoogleProvider from '@sharifvelasquesz/gatekeeper/providers/google';

gatekeeper.registerProvider(new GoogleProvider({
	clientId: '<GOOGLE CLIENT ID>',
	clientSecret: '<GOOGLE CLIENT SECRET>'
}, handler, errorHandler));
```

#### Example #2

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
import GithubProvider from '@sharifvelasquesz/gatekeeper/providers/github';

gatekeeper.registerProvider(new GithubProvider({
	clientId: '<GITHUB CLIENT ID>',
	clientSecret: '<GITHUB CLIENT SECRET>',

	scope: ['user', 'repo', 'project']
}, handler, errorHandler));
```

### Handler

A provider processes a user's request to obtain data that is then passed to **the handler**, which is responsible for utilizing this data to generate and return a user object. This user object is then stored in the session (in `req.session.user`).

#### Example #1

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
import GoogleProvider from '@sharifvelasquez/gatekeeper/providers/google';

gatekeeper.registerProvider(new GoogleProvider(options, (access_token, profile) => {
	// For example, you can use the Google user's id (that is inside the `profile` variable provided by the Google Provider) to get the user from your database
	const user = User.findOne({ externalServiceId: profile.id });

	return user;
}));
```

#### Example #2

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
import GithubProvider from '@sharifvelasquez/gatekeeper/providers/github';

gatekeeper.registerProvider(new GithubProvider(options, (access_token, profile) => {
	const user = User.findOne({ id: profile.id });

	// The handler must ALWAYS return something that will be saved as the user inside req.session.user
	return { id: user.id, createdByProvider: 'github', someOtherProperty: 123 };
}));
```

#### What happens if I cannot return a user?

Maybe the user that is trying to log in doesn't exist, or perhaps its credentials are invalid. Whatever the reason is, you may not always be able to retrieve a user. In these cases, you can throw an error that can later be handled by the error handler (we'll look at that in a moment). Most providers have predefined errors you can use, but you can also create your own.

#### Example #1

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
import LocalProvider, { IncorrectCredentials } from '@sharifvelasquez/gatekeeper/providers/local'

gatekeeper.registerProvider(new LocalProvider(options, (username, password) => {
	const user = User.findOne({ username, password });
	if (user.password !== password) {
		throw new IncorrectCredentials();
	}

	return user;
}, errorHandler));
```

Or, as mentioned before, you can also define your own custom errors:

#### Example #2

```js
import gatekeeper from 'gatekeeper';
import LocalProvider, { IncorrectCredentials } from '@sharifvelasquez/gatekeeper/providers/local'

class BannedUser extends Error {
	constructor(message = '') {
		super(message);
	}
}

gatekeeper.registerProvider(new LocalProvider(options, (username, password) => {
	const user = User.findOne({ username, password });

	if (user.username == 'Mr.Angry') {
		throw new BannedUser();
	}

	return user;
}, errorHandler));
```

This way unexpected/incorrect behaviour becomes clearer and predictable.

### Error Handler (optional)

The error handler allows you to manage and handle the errors that might be thrown during the execution of the handler.

#### Example #1

```js
import gatekeeper from 'gatekeeper';
import LocalProvider, { IncorrectCredentials } from '@sharifvelasquez/gatekeeper/providers/local'

class BannedUser extends Error {
	constructor(message = '') {
		super(message);
	}
}

gatekeeper.registerProvider(new LocalProvider(options, (username, password) => {
	const user = User.findOne({ username, password });

	if (user.username == 'Mr.Angry') {
		throw new BannedUser();
	}

	return user;
}, (error, req, res, next) => {
	if (error instanceof BannedUser) {
		res.redirect('/bannedusers');
	}

	if (error instanceof Error) {
		res.send('There was an error while trying to log in').status(500);
	}

	// Don't forget to call the `next` function in case this is an error we cannot/don't want to handle, as it will pass the error on to Express. Doing this is heavily recommended
	next(error);
}));
```

And here is another example:

#### Example #2

```js
import gatekeeper from 'gatekeeper';
import LocalProvider, { IncorrectCredentials } from '@sharifvelasquez/gatekeeper/providers/local'

class BannedUser extends Error {
	constructor(message = '') {
		super(message);
	}
}

gatekeeper.registerProvider(new LocalProvider(options, (username, password) => {
	const user = User.findOne({ username, password });

	if (user.username == 'Mr.Angry') {
		throw new BannedUser();
	}

	return user;
}, (error, req, res, next) => {
	if (error instanceof IncorrectCredentials) {
		return res.json({ message: 'Your credentials are incorrect', success: false });
	}
	if (error instanceof BannedUser) {
		return res.redirect('/bannedusers');
	}

	next(error);
}));
```

## More examples

We recommend you visit the Local Provider example or the Google Provider example, or you can visit the *Providers* page to see how to implement your favorite providers.


## Authenticating users

### Login

After registering the providers you need, it is time to actually start using them!

Suppose we want to implement Google sign-in in our application. First, we have to define a route we want the user to visit in order to do this. In this example we will use `'/auth/google'`.

To authenticate users whenever they post to this route, you just have to pass `gatekeeper.authenticateWithProvider('<Your provider name>')` to your router, just like this:

```js
router.post(
	// The /* at the end of the route is important, as it will allow gatekeeper to handle the callback of OAuth2 providers
	'/auth/google/*',
	gatekeeper.authenticateWithProvider('google'),

	// The route handler will be called once the authentication has been succesful
	(req, res) => {
		return res.json({ success: true });
	}
);
```

And that's it! Your app now has authentication!

Also, once the user has been authenticated, you can access it through `req.session.user`.

#### Example

```js
router.post(
	// The /* at the end of the route is important, as it will allow gatekeeper to handle the callback of OAuth2 providers
	'/auth/google/*',
	gatekeeper.authenticateWithProvider('google'),

	// The route handler will be called once the authentication has been succesful
	(req, res) => {
		const user = req.session.user;

		return res.json({ user: req.session.user });
	}
);
```

### Protecting routes

To protect a route you can call `gatekeeper.protect` and pass to it a failure handler that specifies what to do in case the user is not authenticated (if you don't provide a failure handler, gatekeeper will just return a 401 status code response). Let's see it in action:

#### Example #1

```js
router.get(
	'/superSecret',
	gatekeeper.protect(),

	// The route handler gets called in case the user is authenticated
	(req, res, next) => {
		res.send('Now that you are authenticated, here is my secret... I like coding!');
	}
);
```

#### Example #2

```js
router.get('/protected', gatekeeper.protect((req, res, next) => {
	return res.redirect('/auth/google');
}), (req, res) => res.send('The user is authenticated!'));
```

That's it! Now your application has a secure, nice and simple authentication system with Gatekeeper!
