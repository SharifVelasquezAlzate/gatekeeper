"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[874],{519:(e,o,r)=>{r.r(o),r.d(o,{assets:()=>a,contentTitle:()=>s,default:()=>p,frontMatter:()=>t,metadata:()=>d,toc:()=>c});var n=r(4848),i=r(8453),l=r(2839);const t={sidebar_position:2},s="Google",d={id:"providers/google",title:"Google",description:"Register your app in Google's Dashboard",source:"@site/docs/providers/google.mdx",sourceDirName:"providers",slug:"/providers/google",permalink:"/gatekeeper/docs/providers/google",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Local",permalink:"/gatekeeper/docs/providers/local"},next:{title:"Facebook",permalink:"/gatekeeper/docs/providers/facebook"}},a={},c=[{value:"Register your app in Google&#39;s Dashboard",id:"register-your-app-in-googles-dashboard",level:2},{value:"Examples:",id:"examples",level:4},{value:"Examples:",id:"examples-1",level:4},{value:"Google Provider",id:"google-provider",level:2},{value:"Options",id:"options",level:3},{value:"Handler",id:"handler",level:3},{value:"Errors",id:"errors",level:2},{value:"Examples",id:"examples-2",level:2},{value:"Example #1",id:"example-1",level:3},{value:"Create a Google Provider",id:"create-a-google-provider",level:3},{value:"Login with Google Provider",id:"login-with-google-provider",level:3}];function h(e){const o={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.h1,{id:"google",children:"Google"}),"\n",(0,n.jsx)(o.h2,{id:"register-your-app-in-googles-dashboard",children:"Register your app in Google's Dashboard"}),"\n",(0,n.jsx)(o.p,{children:"To use the Google Provider you will need a client id and a client secret. You will get them while following the process to setup Google OAuth 2.0 for your application. Follow the instructions in the following link:"}),"\n",(0,n.jsxs)(o.admonition,{type:"info",children:[(0,n.jsx)(o.p,{children:"When asked for an origin URL, insert the origin of the url in which your app is hosted."}),(0,n.jsx)(o.h4,{id:"examples",children:"Examples:"}),(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.code,{children:"http://localhost:3000"})}),"\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.code,{children:"https://www.example.com"})}),"\n"]}),(0,n.jsx)(o.p,{children:"When asked for a redirect URL (or callback URL), insert [http or https]://[origin]/[your route for Google authentication]"}),(0,n.jsx)(o.h4,{id:"examples-1",children:"Examples:"}),(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.code,{children:"http://localhost:8000/auth/google"})}),"\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.code,{children:"https://www.example.com/api/login/google"})}),"\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.code,{children:"https://www.example.com/godel/russell/myGoogle"})}),"\n"]})]}),"\n",(0,n.jsxs)(o.p,{children:["Google's official guide (",(0,n.jsx)(o.strong,{children:"Follow the guide until you get a client id and client secret and setup a callback"}),". Don't worry about the rest, Gatekeeper will take care of that): ",(0,n.jsx)(o.a,{href:"https://support.google.com/cloud/answer/6158849",children:"https://support.google.com/cloud/answer/6158849"})]}),"\n",(0,n.jsx)(o.h2,{id:"google-provider",children:"Google Provider"}),"\n",(0,n.jsx)(o.h3,{id:"options",children:"Options"}),"\n",(0,n.jsx)(l.A,{headers:["Option name","Description","Default value","Required?"],body:[[(0,n.jsx)(o.code,{children:"clientId"}),"Your Google OAuth client id","","Yes"],[(0,n.jsx)(o.code,{children:"clientSecret"}),"Your Google OAuth client secret","","Yes"],[(0,n.jsx)(o.code,{children:"callbackURL"}),"The URL that will serve as callback for Google OAuth","","Yes"],[(0,n.jsx)(o.code,{children:"scope"}),"The OAuth scopes that will be granted to the access token",(0,n.jsx)(o.code,{children:"['profile']"}),"No"]]}),"\n",(0,n.jsx)(o.admonition,{type:"danger",children:(0,n.jsxs)(o.p,{children:["To the ",(0,n.jsx)(o.code,{children:"callbackURL"})," option you must provide the URL you provided when asked for a redirect (or callback) URL when\r\nregistering your Google OAuth app (if you followed our recommendation, present in the opening paragraph of this page,\r\njust provide the URL from which you will be using your provider)"]})}),"\n",(0,n.jsx)(o.h3,{id:"handler",children:"Handler"}),"\n",(0,n.jsx)(o.p,{children:"The Google Provider passes three parameters to the handler:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"refresh_token"}),": The OAuth refres token. It is usually only given the first time a user signs-in to your application"]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"access_token"}),": The OAuth access token."]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.code,{children:"profile"}),": The information of the Google user."]}),"\n"]}),"\n",(0,n.jsx)(o.h2,{id:"errors",children:"Errors"}),"\n",(0,n.jsx)(o.p,{children:"The predefined errors of this provider are:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsx)(o.li,{children:(0,n.jsx)(o.code,{children:"UserNotFound"})}),"\n"]}),"\n",(0,n.jsx)(o.h2,{id:"examples-2",children:"Examples"}),"\n",(0,n.jsx)(o.h3,{id:"example-1",children:"Example #1"}),"\n",(0,n.jsx)(o.h3,{id:"create-a-google-provider",children:"Create a Google Provider"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-js",children:"import gatekeeper from 'gatekeeper-authentication'\r\nimport { GoogleProvider } from 'gatekeeper-authentication/providers/google' \r\n\r\nconst GoogleAuth = new GoogleProvider({\r\n    clientId: '<YOUR GOOGLE CLIENT ID>',\r\n    clientSecret: '<YOUR GOOGLE CLIENT SECRET>',\r\n    callbackURL: 'https://yourdomainorlocalhost.com/auth/google'\r\n}, function handler(refresh_token, access_token, profile) => {\r\n    const user = User.findOne({ googleId: profile.sub })\r\n    \r\n    if (user == null) {\r\n        // For example, if the user does not exist, create it\r\n        User.create({\r\n            username: profile.name,\r\n            profilePicture: profile.picture\r\n        });\r\n    }\r\n    \r\n    return user;\r\n});\n"})}),"\n",(0,n.jsx)(o.h3,{id:"login-with-google-provider",children:"Login with Google Provider"}),"\n",(0,n.jsx)(o.admonition,{type:"warning",children:(0,n.jsxs)(o.p,{children:["Important: When using the Google provider on login routes, make sure you use ",(0,n.jsx)(o.code,{children:"gatekeeper.authenticateWithProvider(yourGoogleProvider)"})," in a ",(0,n.jsx)(o.code,{children:"GET"})," route, as the user will be redirected to Google's sign in page"]})}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-js",children:"router.get(\r\n    '/auth/google',\r\n    gatekeeper.authenticateWithProvider(GoogleAuth), (req, res) => {\r\n        return res.redirect('/profile');\r\n    }\r\n);\n"})})]})}function p(e={}){const{wrapper:o}={...(0,i.R)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},2839:(e,o,r)=>{r.d(o,{A:()=>i});var n=r(4848);const i=function(e){let{headers:o,body:r}=e;return(0,n.jsxs)("table",{className:"table",children:[(0,n.jsx)("thead",{children:(0,n.jsx)("tr",{children:o.map((e=>(0,n.jsx)("th",{children:e})))})}),(0,n.jsx)("tbody",{children:r.map((e=>(0,n.jsx)("tr",{children:e.map((e=>(0,n.jsx)("td",{children:e})))})))})]})}},8453:(e,o,r)=>{r.d(o,{R:()=>t,x:()=>s});var n=r(6540);const i={},l=n.createContext(i);function t(e){const o=n.useContext(l);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function s(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),n.createElement(l.Provider,{value:o},e.children)}}}]);