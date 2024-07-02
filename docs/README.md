# Gatekeeper

### What is Gatekeeper?

Gatekeeper es un módulo de autenticación rápido y fácil de usar en tu aplicación de Express.

```js
import gatekeeper from '@sharifvelasquez/gatekeeper';

const router = Router();

// Nice and simple!
router.post('/auth/google/*', gatekeeper.authenticate('google'));
```

### Installation
```console
npm install @sharifvelasquez/gatekeeper
```

### 



// Don't forget the Gatekeeper vs passport
