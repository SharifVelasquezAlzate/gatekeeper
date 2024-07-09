"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[534],{7549:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var s=n(4848),o=n(8453),t=n(2839);const i={sidebar_position:1},a="Local",l={id:"providers/local",title:"Local",description:"Options",source:"@site/docs/providers/local.mdx",sourceDirName:"providers",slug:"/providers/local",permalink:"/gatekeeper/docs/providers/local",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Providers",permalink:"/gatekeeper/docs/providers/"},next:{title:"Google",permalink:"/gatekeeper/docs/providers/google"}},d={},c=[{value:"Options",id:"options",level:2},{value:"Handler",id:"handler",level:2},{value:"Errors",id:"errors",level:2},{value:"Examples",id:"examples",level:2},{value:"Example #1",id:"example-1",level:3},{value:"Create a Local Provider",id:"create-a-local-provider",level:3},{value:"Login with a Local Provider",id:"login-with-a-local-provider",level:3}];function h(e){const r={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"local",children:"Local"}),"\n",(0,s.jsx)(r.h2,{id:"options",children:"Options"}),"\n",(0,s.jsx)(t.A,{headers:["Option name","Description","Default value","Required?"],body:[[(0,s.jsx)(r.code,{children:"usernameField"}),"Name of the field that represents the username in the body of the request",(0,s.jsx)(r.code,{children:"'username'"}),"No"],[(0,s.jsx)(r.code,{children:"passwordField"}),"Name of the field that represents the password in the body of the request",(0,s.jsx)(r.code,{children:"'password'"}),"No"]]}),"\n",(0,s.jsx)(r.h2,{id:"handler",children:"Handler"}),"\n",(0,s.jsx)(r.p,{children:"The Local Provider passes three parameters to the Handler"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"username"}),": Username sent in the request"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"password"}),": Password sent in the request"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"req"}),": The request object (in case there is other data that is needed, like profile picture, country of origin, email, etc.)"]}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"errors",children:"Errors"}),"\n",(0,s.jsx)(r.p,{children:"The predefined errors of this provider are:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.code,{children:"IncorrectCredentials"})}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsx)(r.h3,{id:"example-1",children:"Example #1"}),"\n",(0,s.jsx)(r.h3,{id:"create-a-local-provider",children:"Create a Local Provider"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-js",children:"import crypto from 'crypto'\r\nimport gatekeeper from '@sharifvelasquez/gatekeeper'\r\nimport LocalProvider, { IncorrectCredentials } from '@sharifvelasquez/gatekeeper/providers/local'\r\n\r\nconst LocalAuth = new LocalProvider((username, password, req) => {\r\n    const user = db.query('SELECT * FROM users WHERE username = ? LIMIT 1', username);\r\n    if (user == null)\r\n        throw new IncorrectCredentials();\r\n    \r\n    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')\r\n    if (hashedPassword !== user.password)\r\n        throw new IncorrectCredentials();\r\n    \r\n    return user;\r\n}, (error, req, res, next) => {\r\n    if (error instanceof IncorrectCredentials)\r\n        return res.json({ error: 'Your username or password are incorrect' });\r\n    \r\n    return next(error);\r\n});\n"})}),"\n",(0,s.jsx)(r.h3,{id:"login-with-a-local-provider",children:"Login with a Local Provider"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-js",children:"// You can use it in both GET...\r\nrouter.get(\r\n    '/auth/local',\r\n    gatekeeper.authenticateWithProvider(LocalAuth), (req, res) => {\r\n        return res.redirect('/profile');\r\n    }\r\n);\r\n// ...and POST routes\r\nrouter.post(\r\n    '/auth/local',\r\n    gatekeeper.authenticateWithProvider(LocalAuth), (req, res) => {\r\n        return res.redirect('/profile');\r\n    }\r\n);\r\n``\n"})})]})}function u(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},2839:(e,r,n)=>{n.d(r,{A:()=>o});var s=n(4848);const o=function(e){let{headers:r,body:n}=e;return(0,s.jsxs)("table",{className:"table",children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:r.map((e=>(0,s.jsx)("th",{children:e})))})}),(0,s.jsx)("tbody",{children:n.map((e=>(0,s.jsx)("tr",{children:e.map((e=>(0,s.jsx)("td",{children:e})))})))})]})}},8453:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>a});var s=n(6540);const o={},t=s.createContext(o);function i(e){const r=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(t.Provider,{value:r},e.children)}}}]);