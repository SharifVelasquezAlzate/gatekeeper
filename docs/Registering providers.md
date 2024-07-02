## Registering providers

in our file `lib/gatekeeper` you just have to use the `registerProvider` method, and pass to it a Provider (alongside with a name for this provider if you want to identify the provider by a different name other than the default one).

### Example

lib/gatekeeper.js
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

This allows you to register multiple providers depending on your needs, for example, you can register a provider called `'normal'` that saves the user normally, and another one called `'smiley face'` that adds a smilley face to the user's username, just like this:

```js
import gatekeeper from '@sharifvelasquez/gatekeeper'
import GithubProvider from '@sharifvelasquez/gatekeeper/providers/github';

gatekeeper.registerProvider('normal', new GithubProvider({
    clientId: 'Wait... Has it always ben this easy to authenticate users?',
    clientSecret: 'It always has been...'
}, function handler(access_token, profile) {
    return profile;
}));

gatekeeper.registerProvider('smiley face', new GithubProvider({
    clientId: 'I think no one reads this at this point',
    clientSecret: 'Maybe they do, you never know...'
}, function handler(access_token, profile) {
    const smileyProfile = profile.username.name + ' :)';
    return smileyProfile;
}));
```

Please notice how we used the Github provider twice, which means there is no limit or restriction on the amount of providers you can register, nor on the things you can use them for!

Now that we know how to register providers, it's time to actually use them. Visit *Authentication*

