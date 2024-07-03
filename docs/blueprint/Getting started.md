## Getting started

### Initializing your session module

Gatekeeper uses sessions to store the user data, thus, it is **very important** that you initialize your session module of your preference before initializing Gatekeeper. Throughout this documentation we will use express-session.

### Initializing Gatekeeper

#### User Serializer

A user serializer is a function that accepts a user object and returns the data that should be stored in the session that will later allow the user deserealizer to retrieve the user.

#### Example
```js
function userSerializer(user) {
	// For example, the user's id will allow us to retrieve the user later when the user deserializer gets called internally by gatekeeper 
	return user.id;
}
```

#### User Deserializer

A user deserealizar is a function that accepts a key (the result of serializing a user) and returns a user object that can be retrieved using the key.

#### Example
```js
function userDeserializer(key) {
	// Use the key (what was returned by the user serializer) to retrieve the user
	const user = User.findOne({ id: key });
	return user;
}
```

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

And with this gatekeeper is already initialized!


