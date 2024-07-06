# Gatekeeper

A secure, flexible, and very easy-to-use authentication module for your Express applications.

## Nice and simple ✔️

This is what your authentication routes will look like after setting up Gatekeeper.

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';

const router = Router();

// Nice and simple!
router.get('/auth/google', gatekeeper.authenticateWithProvider('google'));
```

## Beloved features

- **Secure, easy-to-use, and flexible 🌟** - Effortless integration that adapts to your needs

- **Async/await 🌀** - Say goodbye to callbacks (very present in old authentication modules, like passport.js)

- **Typescript support 🔷** - Gatekeeper supports and implements Typescript types

- **Pre-built providers 🔒** - Don't worry about implementing the most famous authentication providers -- We got you covered 😉

- **Rich documentation 📚** - Our docs have everything you need (compared to other authentication modules who have little to no documentation...) and they also were carefully built with a lot of love! 

## [Documentation](https://sharifvelasquezalzate.github.io/gatekeeper/docs/gatekeeper)

Find our documentation at [https://sharifvelasquezalzate.github.io/gatekeeper/docs/gatekeeper](https://sharifvelasquezalzate.github.io/gatekeeper/docs/gatekeeper) to start using Gatekeeper in your project!
