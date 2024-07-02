## Authenticating users

### Login

After registering the providers you need, it is time to actually start using them!

Suppose we want to implement Google sign-in in our application. First, we have to define a route we want the user to visit in order to do this. In this example we will use `'/auth/google'`.

To authenticate users whenever they post to this route, you just have to pass `gatekeeper.authenticateWithProvider('<Your provider name>')` to your router, just like this:

```js
router.post(
	'/auth/google',
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

#### `req.isAuthenticated()`

If you just want to check if a user is authenticated or not, you can use `req.isAuthenticated()`.

#### Example #1

```js
router.get('/areYouLoggedIn', (req, res, next) => {
	if (req.isAuthenticated()) return res.send('Yeah!');
	else return res.send('Nope :('); 
});
```

#### `gatekeeper.protect()`

You can also call `gatekeeper.protect` and pass to it a failure handler that specifies what to do in case the user is not authenticated (if you don't provide a failure handler, gatekeeper will just return a 401 status code response). Let's see it in action:

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
}))
```

That's it! Now your application has an unobtrusive, easy-to-use authentication system with Gatekeeper.
