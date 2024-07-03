## Registering a Provider

Now that you know what a provider is and how to create them, it is time to use them!

To register a provider just call `gatekeeper.registerProvider` and pass to it the Provider you want to register (you can also specify a custom name for your provider if you want. If not, Gatekeeper will use the provider's default name).

#### Example #1

```js
import gatekeeper from '@sharifvelasquez/gatekeeper'
import GoogleProvider from '@sharifvelasquez/gatekeeper/providers/google';

gatekeeper.registerProvider('myProviderName', new GoogleProvider({
    clientId: 'Life is beautiful',
    clientSecret: 'Like you!'
}, function handler(access_token, profile) {
    return profile;
}));
```

We recommend you do this at the beginning of your application. You can easily do this by, for example, creating a file called `gatekeeperConfig.js`, registering your providers there, and then importing it inside your main application file. Here's an example:

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

(You can go for a completely different approach, just make sure you register your providers before using them inside your routes!)

Once you have registered your providers, go to *Authentication* to see how to use them in your app.
