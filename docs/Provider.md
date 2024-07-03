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

#### Example #1 -- Predefined errors

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

#### Example #2 -- Custom errors

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
