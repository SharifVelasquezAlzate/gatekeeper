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

## Core concepts



// Don't forget the Gatekeeper vs passport
