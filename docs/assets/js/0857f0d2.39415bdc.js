"use strict";(self.webpackChunkgatekeeper_docs=self.webpackChunkgatekeeper_docs||[]).push([[391],{5771:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var n=r(4848),s=r(8453);const i={sidebar_position:4},o="Authenticating Users and Protecting Routes",a={id:"step-by-step-guide/authenticating-users",title:"Authenticating Users and Protecting Routes",description:"After learning what providers are, it is time to actually start using them!",source:"@site/docs/step-by-step-guide/authenticating-users.md",sourceDirName:"step-by-step-guide",slug:"/step-by-step-guide/authenticating-users",permalink:"/gatekeeper/docs/step-by-step-guide/authenticating-users",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"mainSidebar",previous:{title:"Provider",permalink:"/gatekeeper/docs/step-by-step-guide/provider"},next:{title:"Synopsis",permalink:"/gatekeeper/docs/synopsis"}},u={},c=[{value:"Login",id:"login",level:2},{value:"How to access the user once it has logged in?",id:"how-to-access-the-user-once-it-has-logged-in",level:3},{value:"Protecting Routes",id:"protecting-routes",level:2},{value:"Example #1",id:"example-1",level:4},{value:"Example #2",id:"example-2",level:4},{value:"\u2714\ufe0f That&#39;s it! Now you application has a secure, easy-to-use, and flexible authentication system with Gatekeeper! \ud83d\udd10",id:"\ufe0f-thats-it-now-you-application-has-a-secure-easy-to-use-and-flexible-authentication-system-with-gatekeeper-",level:4}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"authenticating-users-and-protecting-routes",children:"Authenticating Users and Protecting Routes"}),"\n",(0,n.jsx)(t.p,{children:"After learning what providers are, it is time to actually start using them!"}),"\n",(0,n.jsx)(t.h2,{id:"login",children:"Login"}),"\n",(0,n.jsxs)(t.p,{children:["Suppose we want to implement Google sign-in in our application. First, we have to define a route we want the user to visit in order to do this. In this example we will use ",(0,n.jsx)(t.code,{children:"'/auth/google'"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["To authenticate users whenever they get to this route, you just have to pass ",(0,n.jsx)(t.code,{children:"gatekeeper.authenticateWithProvider(theProviderYouWantToUse)"})," to your router, like this:"]}),"\n",(0,n.jsx)(t.admonition,{type:"warning",children:(0,n.jsxs)(t.p,{children:["Important: When using OAuth2 providers on login routes, make sure you use ",(0,n.jsx)(t.code,{children:"gatekeeper.authenticateWithProvider(yourProvider)"})," in a ",(0,n.jsx)(t.code,{children:"GET"})," route, as the user will be redirected to the provider's site to log in."]})}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import gatekeeper from 'gatekeeper-authentication';\r\nimport GithubProvider from 'gatekeeper-authentication/providers/github';\r\n\r\nconst GithubAuth = new GithubProvider({\r\n    clientId: '<YOUR CLIENT ID>',\r\n    clientSecret: '<YOUR CLIENT SECRET>'\r\n    // The OAuth2 callback/redirect url you registered\r\n    // (the URL in which this provider will be used)\r\n    callbackURL: 'https://yourdomainorlocalhost.com/auth/github'\r\n}, function handler(refresh_token, access_token, profile) => {\r\n    return profile;\r\n});\r\n\r\n/* Notice that we can use the prebuilt providers as many times as we want\r\nto create multiple providers that do different things! */\r\nconst GithubWithSmileyFace = new GithubProvider({\r\n    clientId: '<YOUR CLIENT ID>',\r\n    clientSecret: '<YOUR CLIENT SECRET>'\r\n    // The OAuth2 callback/redirect url you registered\r\n    // (the URL in which this provider will be used)\r\n    callbackURL: 'https://yourdomainorlocalhost.com/auth/smiley/github'\r\n}, function handler(refresh_token, access_token, profile) => {\r\n    profile.name = profile.name + ':D';\r\n    return profile;\r\n});\r\n\r\nrouter.get(\r\n    '/auth/smiley/github',\r\n    gatekeeper.authenticateWithProvider(GithubWithSmileyFace),\r\n    (req, res) => {\r\n        return res.json({ user: req.session.user, success: true });\r\n    }\r\n);\r\n\r\nrouter.get(\r\n    '/auth/github',\r\n    gatekeeper.authenticateWithProvider(GithubAuth),\r\n    (req, res) => {\r\n        return res.json({ user: req.session.user, success: true });\r\n    }\r\n);\n"})}),"\n",(0,n.jsx)(t.p,{children:"And that's it! Your app now has a login system! (That was very easy!)"}),"\n",(0,n.jsxs)(t.admonition,{type:"tip",children:[(0,n.jsxs)(t.p,{children:["We recommend you declare your providers in a file (or multiple files if you have a lot of them), say ",(0,n.jsx)(t.code,{children:"authenticationProviders.js"}),", like this:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="authenticationProviders.js"',children:"export const GoogleAuth = new GoogleProvider(options, (refresh_token, access_token, profile) => {\r\n    const user = User.findOne({ externalServiceId: profile.id });\r\n    return user;\r\n});\r\n\r\nexport const SmileyGoogleAuth = new GoogleProvider(options, (refresh_token, access_token, profile) => {\r\n    const user = User.findOne({ externalServiceId: profile.id });\r\n    user.username = user.username + ' :D';\r\n    return user;\r\n});\r\n\r\nexport const FrownyGithubWithModifiedId = new GoogleProvider(options, (refresh_token, access_token, profile) => {\r\n    const user = User.findOne({ externalServiceId: profile.id });\r\n    user.username = user.username + ' :(';\r\n    user.id = `GITHUB-${user.id}`;\r\n    return user;\r\n});\n"})}),(0,n.jsx)(t.p,{children:"And just use them in your routes!"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",metastring:'title="auth.routes.js"',children:"import { GoogleAuth, FrownyGithubWithModifiedId } from './authenticationProviders';\r\n\r\nrouter.get(\r\n    '/auth/google',\r\n    gatekeeper.authenticateWithProvider(GoogleAuth),\r\n    (req, res) => {\r\n        return res.json({ user: req.session.user, success: true });\r\n    }\r\n);\r\n\r\nrouter.get(\r\n    '/auth/frowny/github',\r\n    gatekeeper.authenticateWithProvider(FrownyGithubWithModifiedId),\r\n    (req, res) => {\r\n        return res.json({ user: req.session.user, success: true });\r\n    }\r\n)\n"})})]}),"\n",(0,n.jsx)(t.h3,{id:"how-to-access-the-user-once-it-has-logged-in",children:"How to access the user once it has logged in?"}),"\n",(0,n.jsxs)(t.p,{children:["Once the user has been authenticated, it will be stored in ",(0,n.jsx)(t.code,{children:"req.session.user"}),"."]}),"\n",(0,n.jsx)(t.h2,{id:"protecting-routes",children:"Protecting Routes"}),"\n",(0,n.jsxs)(t.p,{children:["To protect a route you can call ",(0,n.jsx)(t.code,{children:"gatekeeper.protect"})," and pass to it a failure handler that specifies what to do in case the user is not authenticated (if you don't provide a failure handler, gatekeeper will just return a ",(0,n.jsx)(t.code,{children:"401"})," status code response). Let's see it in action:"]}),"\n",(0,n.jsx)(t.h4,{id:"example-1",children:"Example #1"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"router.get(\r\n    '/superSecret',\r\n    gatekeeper.protect(),\r\n    // The route handler gets called only when the user is authenticated\r\n    (req, res, next) => {\r\n        res.send(`\r\n            Now that you are authenticated, here is my secret...\r\n            I like coding and math!\r\n        `);\r\n    }\r\n);\n"})}),"\n",(0,n.jsx)(t.h4,{id:"example-2",children:"Example #2"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"router.get('/protected', gatekeeper.protect((req, res, next) => {\r\n\treturn res.redirect('/auth/google');\r\n}), (req, res) => {\r\n    res.send('The user', req.session.user.id, 'is authenticated!');\r\n});\n"})}),"\n",(0,n.jsx)(t.h4,{id:"\ufe0f-thats-it-now-you-application-has-a-secure-easy-to-use-and-flexible-authentication-system-with-gatekeeper-",children:"\u2714\ufe0f That's it! Now you application has a secure, easy-to-use, and flexible authentication system with Gatekeeper! \ud83d\udd10"}),"\n",(0,n.jsxs)(t.p,{children:["We now recommend you to visit our ",(0,n.jsx)(t.a,{href:"/docs/providers",children:"Providers"})," page to learn to implement your favorite providers."]})]})}function d(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},8453:(e,t,r)=>{r.d(t,{R:()=>o,x:()=>a});var n=r(6540);const s={},i=n.createContext(s);function o(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);