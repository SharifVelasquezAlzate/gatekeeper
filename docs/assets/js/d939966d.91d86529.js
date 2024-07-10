"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[925],{9284:(e,r,i)=>{i.r(r),i.d(r,{assets:()=>l,contentTitle:()=>t,default:()=>p,frontMatter:()=>d,metadata:()=>c,toc:()=>a});var s=i(4848),o=i(8453),n=i(2839);const d={sidebar_position:6},t="Discord",c={id:"providers/discord",title:"Discord",description:"Register your app in Discord's Developer Dashboard",source:"@site/docs/providers/discord.mdx",sourceDirName:"providers",slug:"/providers/discord",permalink:"/gatekeeper/docs/providers/discord",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Linkedin",permalink:"/gatekeeper/docs/providers/linkedin"}},l={},a=[{value:"Register your app in Discord&#39;s Developer Dashboard",id:"register-your-app-in-discords-developer-dashboard",level:2},{value:"Examples:",id:"examples",level:4},{value:"Examples:",id:"examples-1",level:4},{value:"Discord Provider",id:"discord-provider",level:2},{value:"Options",id:"options",level:3},{value:"Handler",id:"handler",level:3},{value:"Errors",id:"errors",level:2},{value:"Examples",id:"examples-2",level:2},{value:"Example #1",id:"example-1",level:3},{value:"Create a Discord Provider",id:"create-a-discord-provider",level:3},{value:"Login with a Discord Provider",id:"login-with-a-discord-provider",level:3}];function h(e){const r={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"discord",children:"Discord"}),"\n",(0,s.jsx)(r.h2,{id:"register-your-app-in-discords-developer-dashboard",children:"Register your app in Discord's Developer Dashboard"}),"\n",(0,s.jsx)(r.p,{children:"To use the Discord Provider you will need a client id and a client secret. You will get them while following the process to setup Discord OAuth 2.0 for your application. Follow the instructions in the following link:"}),"\n",(0,s.jsxs)(r.admonition,{type:"info",children:[(0,s.jsx)(r.p,{children:"When asked for an origin URL, insert the origin of the url in which your app is hosted."}),(0,s.jsx)(r.h4,{id:"examples",children:"Examples:"}),(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.code,{children:"http://localhost:3000"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.code,{children:"https://www.example.com"})}),"\n"]}),(0,s.jsx)(r.p,{children:"When asked for a redirect URL (or callback), insert[http or https]://[origin]/[your route for Discord authentication]"}),(0,s.jsx)(r.h4,{id:"examples-1",children:"Examples:"}),(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.code,{children:"http://localhost:8000/auth/discord"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.code,{children:"https://www.example.com/api/login/discord"})}),"\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.code,{children:"https://www.example.com/godel/russell/myDiscordLogin"})}),"\n"]})]}),"\n",(0,s.jsxs)(r.p,{children:["Discord's official guide (",(0,s.jsx)(r.strong,{children:"Follow the guide until you get a client id and client secret and setup a callback"}),". Don't worry about the rest, Gatekeeper will take care of that): ",(0,s.jsx)(r.a,{href:"https://discord.com/developers/docs/topics/oauth2/#shared-resources",children:"https://discord.com/developers/docs/topics/oauth2/#shared-resources"})]}),"\n",(0,s.jsx)(r.h2,{id:"discord-provider",children:"Discord Provider"}),"\n",(0,s.jsx)(r.h3,{id:"options",children:"Options"}),"\n",(0,s.jsx)(n.A,{headers:["Option name","Description","Default value","Required?"],body:[[(0,s.jsx)(r.code,{children:"clientId"}),"Your Discord OAuth client id","","Yes"],[(0,s.jsx)(r.code,{children:"clientSecret"}),"Your Discord OAuth client secret","","Yes"],[(0,s.jsx)(r.code,{children:"callbackURL"}),"The URL that will serve as callback for Discord OAuth","","Yes"],[(0,s.jsx)(r.code,{children:"scope"}),"The OAuth scopes that will be granted to the access token",(0,s.jsx)(r.code,{children:"['identify', 'email']"}),"No"]]}),"\n",(0,s.jsx)(r.admonition,{type:"danger",children:(0,s.jsxs)(r.p,{children:["To the ",(0,s.jsx)(r.code,{children:"callbackURL"})," option you must provide the URL you provided when asked for a redirect (or callback) URL when\r\nregistering your Discord OAuth app."]})}),"\n",(0,s.jsx)(r.h3,{id:"handler",children:"Handler"}),"\n",(0,s.jsx)(r.p,{children:"The Discord Provider passes three parameters to the handler:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"refresh_token"}),": The OAuth refres token. It is usually only given the first time a user signs-in to your application"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"access_token"}),": The OAuth access token."]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.code,{children:"profile"}),": The information of the Discord user."]}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"errors",children:"Errors"}),"\n",(0,s.jsx)(r.p,{children:"The predefined errors of this provider are:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:(0,s.jsx)(r.code,{children:"UserNotFound"})}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"examples-2",children:"Examples"}),"\n",(0,s.jsx)(r.h3,{id:"example-1",children:"Example #1"}),"\n",(0,s.jsx)(r.h3,{id:"create-a-discord-provider",children:"Create a Discord Provider"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-js",children:"import gatekeeper from '@sharifvelasquez/gatekeeper'\r\nimport { DiscordProvider } from '@sharifvelasquez/gatekeeper/providers/discord' \r\n\r\nconst DiscordAuth = new DiscordProvider({\r\n    clientId: '<YOUR DISCORD CLIENT ID>',\r\n    clientSecret: '<YOUR DISCORD CLIENT SECRET>',\r\n    callbackURL: 'https://yourdomainorlocalhost.com/auth/discord'\r\n}, function handler(refresh_token, access_token, profile) => {\r\n    const user = User.findOne({ discordId: profile.sub })\r\n    \r\n    if (user == null) {\r\n        // For example, if the user does not exist, create it\r\n        User.create({\r\n            username: profile.name,\r\n            profilePicture: profile.picture\r\n        });\r\n    }\r\n    \r\n    return user;\r\n});\n"})}),"\n",(0,s.jsx)(r.h3,{id:"login-with-a-discord-provider",children:"Login with a Discord Provider"}),"\n",(0,s.jsx)(r.admonition,{type:"warning",children:(0,s.jsxs)(r.p,{children:["Important: When using the Discord provider on login routes, make sure you use ",(0,s.jsx)(r.code,{children:"gatekeeper.authenticateWithProvider(yourDiscordProvider)"})," in a ",(0,s.jsx)(r.code,{children:"GET"})," route, as the user will be redirected to Discord's sign in page"]})}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-js",children:"router.get(\r\n    '/auth/discord',\r\n    gatekeeper.authenticateWithProvider(DiscordAuth), (req, res) => {\r\n        return res.redirect('/profile');\r\n    }\r\n);\n"})})]})}function p(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},2839:(e,r,i)=>{i.d(r,{A:()=>o});var s=i(4848);const o=function(e){let{headers:r,body:i}=e;return(0,s.jsxs)("table",{className:"table",children:[(0,s.jsx)("thead",{children:(0,s.jsx)("tr",{children:r.map((e=>(0,s.jsx)("th",{children:e})))})}),(0,s.jsx)("tbody",{children:i.map((e=>(0,s.jsx)("tr",{children:e.map((e=>(0,s.jsx)("td",{children:e})))})))})]})}},8453:(e,r,i)=>{i.d(r,{R:()=>d,x:()=>t});var s=i(6540);const o={},n=s.createContext(o);function d(e){const r=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function t(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:d(e.components),s.createElement(n.Provider,{value:r},e.children)}}}]);