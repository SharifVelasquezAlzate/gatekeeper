# Gatekeeper

If this sinopsis confuses you, or you have any doubts, we recommend you visit the *Step-by-step* guide.

## Sinopsis

### 1. Initialize gatekeeper

Initialize gatekeeper after your session module and provide a User Serializer and User Deserealizer

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';
// Initialize your session module (express-session, for example)
app.use(session({ secret: 'I love pizza' }));
// Initialize Gatekeeper
app.use(gatekeeper.initialize({
	userSerializer: (user) => user.id,
	userDeserializer: (id) => {
		// Here we are returning an arbitrary user for the sake of the example
		return { id: id, username: 'David Hilbert' };
	}
}));
```

### 2. Register your providers

To register a provider just call `gatekeeper.registerProvider` and pass to it the Provider you want to register. We recommend you do this at the beginning of your application, by, for example, creating a file called `gatekeeperConfig.js`, registering your providers there, and then importing it inside your main application file. Here's an **example** (visit our *Providers* page to know how to implement your favorite providers):

gatekeeperConfig.js
```js
import gatekeeper from '@sharifvelasquez/gatekeeper'
import GoogleProvider from '@sharifvelasquez/gatekeeper/providers/google'

gatekeeper.registerProvider(new GoogleProvider({
	clientId: '<YOUR CLIENT ID>',
	clientSecret: '<YOUR CLIENT SECRET>'
}, function handler(access_token, profile) => {
	return profile;
}));
```

app.js
```js
import gatekeeper from '@sharifvelasquez/gatekeeper'
import express from 'express'
import session from 'express-session'

// We import the file that contains our provider registrations
import './config/gatekeeperConfig'
```

### 3. Start using gatekeeper in your log-in and protected routes!

#### Log-in routes

For log-in routes (the route you want a user to visit when they want to log in to your application) use `gatekeeper.authenticateWithProvider`:

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

#### How to access the user once it has logged in?

Once the user has been authenticated, you can access it through `req.session.user`.

```js
router.get('/getUser', (req, res) => req.session.user)
```

#### Protecting routes

To protect a route you can call `gatekeeper.protect` and pass to it a failure handler that specifies what to do in case the user is not authenticated (if you don't provide a failure handler, gatekeeper will just return a 401 status code response). Let's see it in action:

```js
router.get('/protected', gatekeeper.protect((req, res, next) => {
	return res.redirect('/auth/google');
}), (req, res) => res.send('The user', req.session.user.id, 'is authenticated!'));
```

### ✔️ Finally, enjoy a secure, easy-to-use, and flexible authentication system! 🔐

 
