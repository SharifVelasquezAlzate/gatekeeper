"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[304],{9436:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>a,contentTitle:()=>d,default:()=>p,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var r=n(4848),t=n(8453),o=n(2839);const s={sidebar_position:5},d="Linkedin",l={id:"providers/linkedin",title:"Linkedin",description:"Register your app in Linkedin's Developer Dashboard",source:"@site/docs/providers/linkedin.mdx",sourceDirName:"providers",slug:"/providers/linkedin",permalink:"/gatekeeper/docs/providers/linkedin",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Github",permalink:"/gatekeeper/docs/providers/github"},next:{title:"Discord",permalink:"/gatekeeper/docs/providers/discord"}},a={},c=[{value:"Register your app in Linkedin&#39;s Developer Dashboard",id:"register-your-app-in-linkedins-developer-dashboard",level:2},{value:"Examples:",id:"examples",level:4},{value:"Examples:",id:"examples-1",level:4},{value:"Linkedin Provider",id:"linkedin-provider",level:2},{value:"Options",id:"options",level:3},{value:"Handler",id:"handler",level:3},{value:"Errors",id:"errors",level:2},{value:"Examples",id:"examples-2",level:2},{value:"Example #1",id:"example-1",level:3},{value:"Create a Linkedin Provider",id:"create-a-linkedin-provider",level:3},{value:"Login with a Linkedin Provider",id:"login-with-a-linkedin-provider",level:3}];function h(e){const i={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{id:"linkedin",children:"Linkedin"}),"\n",(0,r.jsx)(i.h2,{id:"register-your-app-in-linkedins-developer-dashboard",children:"Register your app in Linkedin's Developer Dashboard"}),"\n",(0,r.jsx)(i.p,{children:"To use the Linkedin Provider you will need a client id and a client secret. You will get them while following the process to setup Linkedin OAuth 2.0 for your application. Follow the instructions in the following link:"}),"\n",(0,r.jsxs)(i.admonition,{type:"info",children:[(0,r.jsx)(i.p,{children:"When asked for an origin URL, insert the origin of the url in which your app is hosted."}),(0,r.jsx)(i.h4,{id:"examples",children:"Examples:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"http://localhost:3000"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"https://www.example.com"})}),"\n"]}),(0,r.jsx)(i.p,{children:"When asked for a redirect URL (or callback), insert[http or https]://[origin]/[your route for Linkedin authentication]"}),(0,r.jsx)(i.h4,{id:"examples-1",children:"Examples:"}),(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"http://localhost:8000/auth/linkedin"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"https://www.example.com/api/login/linkedin"})}),"\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"https://www.example.com/godel/russell/myLinkedinLogin"})}),"\n"]})]}),"\n",(0,r.jsxs)(i.p,{children:["Easy-to-read Medium article (",(0,r.jsx)(i.strong,{children:"Follow the guide until you get a client id and client secret and setup a callback"}),". Don't worry about the rest, Gatekeeper will take care of that): ",(0,r.jsx)(i.a,{href:"https://medium.com/@pp411100/how-to-get-linkedin-api-access-token-98a91f77f35a",children:"https://medium.com/@pp411100/how-to-get-linkedin-api-access-token-98a91f77f35a"})]}),"\n",(0,r.jsxs)(i.p,{children:["Linkedin's official guide (",(0,r.jsx)(i.strong,{children:"Follow the guide until you get a client id and client secret and setup a callback"}),". Don't worry about the rest, Gatekeeper will take care of that): ",(0,r.jsx)(i.a,{href:"https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1",children:"https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1"})]}),"\n",(0,r.jsx)(i.h2,{id:"linkedin-provider",children:"Linkedin Provider"}),"\n",(0,r.jsx)(i.h3,{id:"options",children:"Options"}),"\n",(0,r.jsx)(o.A,{headers:["Option name","Description","Default value","Required?"],body:[[(0,r.jsx)(i.code,{children:"clientId"}),"Your Linkedin OAuth client id","","Yes"],[(0,r.jsx)(i.code,{children:"clientSecret"}),"Your Linkedin OAuth client secret","","Yes"],[(0,r.jsx)(i.code,{children:"callbackURL"}),"The URL that will serve as callback for Linkedin OAuth","","Yes"],[(0,r.jsx)(i.code,{children:"scope"}),"The OAuth scopes that will be granted to the access token",(0,r.jsx)(i.code,{children:"['profile', 'email']"}),"No"]]}),"\n",(0,r.jsx)(i.admonition,{type:"danger",children:(0,r.jsxs)(i.p,{children:["To the ",(0,r.jsx)(i.code,{children:"callbackURL"})," option you must provide the URL you provided when asked for a redirect (or callback) URL when\r\nregistering your Linkedin OAuth app."]})}),"\n",(0,r.jsx)(i.h3,{id:"handler",children:"Handler"}),"\n",(0,r.jsx)(i.p,{children:"The Linkedin Provider passes three parameters to the handler:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"refresh_token"}),": The OAuth refres token. It is usually only given the first time a user signs-in to your application"]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"access_token"}),": The OAuth access token."]}),"\n",(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.code,{children:"profile"}),": The information of the Linkedin user."]}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"errors",children:"Errors"}),"\n",(0,r.jsx)(i.p,{children:"The predefined errors of this provider are:"}),"\n",(0,r.jsxs)(i.ul,{children:["\n",(0,r.jsx)(i.li,{children:(0,r.jsx)(i.code,{children:"UserNotFound"})}),"\n"]}),"\n",(0,r.jsx)(i.h2,{id:"examples-2",children:"Examples"}),"\n",(0,r.jsx)(i.h3,{id:"example-1",children:"Example #1"}),"\n",(0,r.jsx)(i.h3,{id:"create-a-linkedin-provider",children:"Create a Linkedin Provider"}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-js",children:"import gatekeeper from '@sharifvelasquez/gatekeeper'\r\nimport { LinkedinProvider } from '@sharifvelasquez/gatekeeper/providers/linkedin' \r\n\r\nconst LinkedinAuth = new LinkedinProvider({\r\n    clientId: '<YOUR LINKEDIN CLIENT ID>',\r\n    clientSecret: '<YOUR LINKEDIN CLIENT SECRET>',\r\n    callbackURL: 'https://yourdomainorlocalhost.com/auth/linkedin'\r\n}, function handler(refresh_token, access_token, profile) => {\r\n    const user = User.findOne({ linkedinId: profile.sub })\r\n    \r\n    if (user == null) {\r\n        // For example, if the user does not exist, create it\r\n        User.create({\r\n            username: profile.name,\r\n            profilePicture: profile.picture\r\n        });\r\n    }\r\n    \r\n    return user;\r\n});\n"})}),"\n",(0,r.jsx)(i.h3,{id:"login-with-a-linkedin-provider",children:"Login with a Linkedin Provider"}),"\n",(0,r.jsx)(i.admonition,{type:"warning",children:(0,r.jsxs)(i.p,{children:["Important: When using the Linkedin provider on login routes, make sure you use ",(0,r.jsx)(i.code,{children:"gatekeeper.authenticateWithProvider(yourLinkedinProvider)"})," in a ",(0,r.jsx)(i.code,{children:"GET"})," route, as the user will be redirected to Linkedin's sign in page"]})}),"\n",(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:"language-js",children:"router.get(\r\n    '/auth/linkedin',\r\n    gatekeeper.authenticateWithProvider(LinkedinAuth), (req, res) => {\r\n        return res.redirect('/profile');\r\n    }\r\n);\n"})})]})}function p(e={}){const{wrapper:i}={...(0,t.R)(),...e.components};return i?(0,r.jsx)(i,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},2839:(e,i,n)=>{n.d(i,{A:()=>t});var r=n(4848);const t=function(e){let{headers:i,body:n}=e;return(0,r.jsxs)("table",{className:"table",children:[(0,r.jsx)("thead",{children:(0,r.jsx)("tr",{children:i.map((e=>(0,r.jsx)("th",{children:e})))})}),(0,r.jsx)("tbody",{children:n.map((e=>(0,r.jsx)("tr",{children:e.map((e=>(0,r.jsx)("td",{children:e})))})))})]})}},8453:(e,i,n)=>{n.d(i,{R:()=>s,x:()=>d});var r=n(6540);const t={},o=r.createContext(t);function s(e){const i=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function d(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),r.createElement(o.Provider,{value:i},e.children)}}}]);