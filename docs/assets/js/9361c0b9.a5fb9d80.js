"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[874],{519:(e,r,o)=>{o.r(r),o.d(r,{assets:()=>a,contentTitle:()=>t,default:()=>p,frontMatter:()=>s,metadata:()=>d,toc:()=>c});var i=o(4848),n=o(8453),l=o(2839);const s={sidebar_position:2},t="Google",d={id:"providers/google",title:"Google",description:"Register your app in Google's Dashboard",source:"@site/docs/providers/google.mdx",sourceDirName:"providers",slug:"/providers/google",permalink:"/gatekeeper/docs/providers/google",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Local",permalink:"/gatekeeper/docs/providers/local"},next:{title:"Github",permalink:"/gatekeeper/docs/providers/github"}},a={},c=[{value:"Register your app in Google&#39;s Dashboard",id:"register-your-app-in-googles-dashboard",level:2},{value:"Examples:",id:"examples",level:4},{value:"Examples:",id:"examples-1",level:4},{value:"Google Provider",id:"google-provider",level:2},{value:"Options",id:"options",level:3},{value:"Handler",id:"handler",level:3},{value:"Errors",id:"errors",level:2},{value:"Examples",id:"examples-2",level:2},{value:"Example #1",id:"example-1",level:3},{value:"Register Google Provider",id:"register-google-provider",level:3},{value:"Login with Google Provider",id:"login-with-google-provider",level:3}];function h(e){const r={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h1,{id:"google",children:"Google"}),"\n",(0,i.jsx)(r.h2,{id:"register-your-app-in-googles-dashboard",children:"Register your app in Google's Dashboard"}),"\n",(0,i.jsx)(r.p,{children:"To use the Google Provider you will need a client id and a client secret. You will get them while following the process to setup Google OAuth 2.0 for your application. Follow the instructions in the following link:"}),"\n",(0,i.jsxs)(r.admonition,{type:"info",children:[(0,i.jsx)(r.p,{children:"When asked for an origin URL, insert the origin of the url in which your app is hosted."}),(0,i.jsx)(r.h4,{id:"examples",children:"Examples:"}),(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.code,{children:"http://localhost:3000"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.code,{children:"https://www.example.com"})}),"\n"]}),(0,i.jsx)(r.p,{children:"When asked for a redirect URL (or callback URL), insert [http or https]://[origin]/[your route for Google authentication]"}),(0,i.jsx)(r.h4,{id:"examples-1",children:"Examples:"}),(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.code,{children:"http://localhost:8000/auth/google"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.code,{children:"https://www.example.com/api/login/google"})}),"\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.code,{children:"https://www.example.com/godel/russell/myGoogle"})}),"\n"]})]}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://support.google.com/cloud/answer/6158849",children:"https://support.google.com/cloud/answer/6158849"})}),"\n",(0,i.jsx)(r.h2,{id:"google-provider",children:"Google Provider"}),"\n",(0,i.jsx)(r.h3,{id:"options",children:"Options"}),"\n",(0,i.jsx)(l.A,{headers:["Option name","Description","Default value","Required?"],body:[[(0,i.jsx)(r.code,{children:"clientId"}),"Your Google OAuth client id","","Yes"],[(0,i.jsx)(r.code,{children:"clientSecret"}),"Your Google OAuth client secret","","Yes"],[(0,i.jsx)(r.code,{children:"callbackURL"}),"The URL that will serve as callback for Google OAuth","","Yes"],[(0,i.jsx)(r.code,{children:"scope"}),"The OAuth scopes that will be granted to the access token",(0,i.jsx)(r.code,{children:"['profile']"}),"No"]]}),"\n",(0,i.jsx)(r.admonition,{type:"danger",children:(0,i.jsxs)(r.p,{children:["To the ",(0,i.jsx)(r.code,{children:"callbackURL"})," option you must provide the URL you provided when asked for a redirect (or callback) URL when\r\nregistering your Google OAuth app (if you followed our recommendation, present in the opening paragraph of this page,\r\njust provide the URL from which you will be using your provider)"]})}),"\n",(0,i.jsx)(r.h3,{id:"handler",children:"Handler"}),"\n",(0,i.jsx)(r.p,{children:"The Google Provider passes two parameters to the handler:"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"access_token"}),": The OAuth access token."]}),"\n",(0,i.jsxs)(r.li,{children:[(0,i.jsx)(r.code,{children:"profile"}),": The information of the Google user."]}),"\n"]}),"\n",(0,i.jsx)(r.h2,{id:"errors",children:"Errors"}),"\n",(0,i.jsx)(r.p,{children:"The predefined errors of this provider are:"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"UserNotFound"}),"\n"]}),"\n",(0,i.jsx)(r.h2,{id:"examples-2",children:"Examples"}),"\n",(0,i.jsx)(r.h3,{id:"example-1",children:"Example #1"}),"\n",(0,i.jsx)(r.h3,{id:"register-google-provider",children:"Register Google Provider"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-js",children:"import gatekeeper from '@sharifvelasquez/gatekeeper'\r\nimport { GoogleProvider } from '@sharifvelasquez/gatekeeper/providers/google' \r\n\r\ngatekeeper.registerProvider(new GoogleProvider({\r\n    clientId: '<YOUR GOOGLE CLIENT ID>',\r\n    clientSecret: '<YOUR GOOGLE CLIENT SECRET>',\r\n    callbackURL: 'https://www.example.com/auth/google'\r\n}, function handler(access_token, profile) => {\r\n    const user = User.findOne({ googleId: profile.sub })\r\n    \r\n    if (user == null) {\r\n        // For example, if the user does not exist, create it\r\n        User.create({\r\n            username: profile.name,\r\n            profilePicture: profile.picture\r\n        });\r\n    }\r\n    \r\n    return user;\r\n}));\n"})}),"\n",(0,i.jsx)(r.h3,{id:"login-with-google-provider",children:"Login with Google Provider"}),"\n",(0,i.jsx)(r.admonition,{type:"warning",children:(0,i.jsxs)(r.p,{children:["Important: When using the Google provider on login routes, make sure you use ",(0,i.jsx)(r.code,{children:"gatekeeper.authenticateWithProvider('<Your Google provider name>')"})," in a ",(0,i.jsx)(r.code,{children:"GET"})," route, as the user will be redirected to Google's sign in page"]})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-js",children:"router.get(\r\n    '/auth/google',\r\n    gatekeeper.authenticateWithProvider('google'), (req, res) => {\r\n        return res.redirect('/profile');\r\n    }\r\n);\n"})}),"\n",(0,i.jsx)(r.admonition,{type:"info",children:(0,i.jsxs)(r.p,{children:["Note: The ",(0,i.jsx)(r.code,{children:"/*"})," at the end of the route is important, as it will allow Gatekeeper to handle the callback of the Google provider."]})})]})}function p(e={}){const{wrapper:r}={...(0,n.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},2839:(e,r,o)=>{o.d(r,{A:()=>n});var i=o(4848);const n=function(e){let{headers:r,body:o}=e;return(0,i.jsxs)("table",{className:"table",children:[(0,i.jsx)("thead",{children:(0,i.jsx)("tr",{children:r.map((e=>(0,i.jsx)("th",{children:e})))})}),(0,i.jsx)("tbody",{children:o.map((e=>(0,i.jsx)("tr",{children:e.map((e=>(0,i.jsx)("td",{children:e})))})))})]})}},8453:(e,r,o)=>{o.d(r,{R:()=>s,x:()=>t});var i=o(6540);const n={},l=i.createContext(n);function s(e){const r=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function t(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),i.createElement(l.Provider,{value:r},e.children)}}}]);