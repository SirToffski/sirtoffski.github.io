(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{108:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return o})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return c})),r.d(t,"default",(function(){return u}));var a=r(1),n=r(6),i=(r(0),r(128)),o={id:"my-soho",title:"A Brief description of my home network",author:"SirToffski",author_url:"https://github.com/SirToffski"},s={permalink:"/sirtoffski.github.io/blog/my-soho",source:"@site/blog/2019-07-22-my-soho.md",description:"In this post I will briefly describe my current home network setup.",date:"2019-07-22T00:00:00.000Z",tags:[],title:"A Brief description of my home network"},c=[{value:"Basic setup",id:"basic-setup",children:[]},{value:"Home server",id:"home-server",children:[]},{value:"Secutiry",id:"secutiry",children:[]},{value:"WireGuard",id:"wireguard",children:[]},{value:"References",id:"references",children:[]}],l={rightToc:c},b="wrapper";function u(e){var t=e.components,r=Object(n.a)(e,["components"]);return Object(i.b)(b,Object(a.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"In this post I will briefly describe my current home network setup."),Object(i.b)("h3",{id:"basic-setup"},"Basic setup"),Object(i.b)("p",null,"Lately, I've been pretty busing during my days off with setting up my home network. I'd like to thank my girlfriend for putting up with frequent \"I need to restart the router\" and other interruptions that came up during the process."),Object(i.b)("p",null,"The setup is far from sophisticated for many reasons. Mostly, good network and server equipment is not cheap ;). Furthermore, I have yet to complete some elements of the setup. I will provide more details below."),Object(i.b)("p",null,"Here is the basic layout:"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/docs/assets/SOHO.png",alt:"SOHO"}))),Object(i.b)("p",null,"Some brief points to mention:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"The ISP provided gateway has a feature called \"Advanced DMZ\". Basically, it's a poor-man's-bridge allowing the downstream EdgeRouter X to grab a public /20 DHCP address directly from the ISP."),Object(i.b)("li",{parentName:"ul"},"On EdgeRouter - WAN iface is vlan 2 to which I've added a static interface ",Object(i.b)("inlineCode",{parentName:"li"},"192.168.2.250/24")," - outside of DHCP range provded by the upstream IPS-provided gateway.\n",Object(i.b)("img",Object(a.a)({parentName:"li"},{src:"/docs/assets/upstreamIPV4.jpg.png",alt:"upstream-ipv4"}))),Object(i.b)("li",{parentName:"ul"},"vlan 1 on the EdgeRouter is LAN ",Object(i.b)("inlineCode",{parentName:"li"},"192.168.1.0/24")," giving out DHCP addresses to the downstream devices within that range. This is where the home server hosting Pi-Hole exists - which takes care of DNS for all devices both within ",Object(i.b)("inlineCode",{parentName:"li"},"192.168.2.0/24")," and ",Object(i.b)("inlineCode",{parentName:"li"},"192.168.1.0/24"),". To make sure devices in 192.168.2.0/24 can reach the 192.168.1.0/24 network, I've added a static route on the ISP-privided gateway shown in a pic:",Object(i.b)("br",null),Object(i.b)("img",Object(a.a)({parentName:"li"},{src:"/docs/assets/static-route.png",alt:"static-route"})),"."),Object(i.b)("li",{parentName:"ul"},"EdgeRouter X also acts as an L3VPN server/gteway via WireGuard. More on the subject below.")),Object(i.b)("p",null,"Eventually the plan is to get an APU board to act as firewall + hosting PiHole; a simple managed L2 switch and wireless APs to move everything over to the EdgeRouter X, completely bypassing the ISP's gateway."),Object(i.b)("h3",{id:"home-server"},"Home server"),Object(i.b)("p",null,"For the time being I've repurposed an old laptop to be a home server. It's running Manjaro Linux. I've thought of installing Ubuntu Server first, but having AUR is such a nice bonus. Furthermore, Pacman is by far my favourite package manager - hence I opted for Manjaro. Arch would have been a better choise perhaps, however at the time of setting things up speedy setup was a higher priority."),Object(i.b)("h4",{id:"pi-hole"},"Pi-Hole"),Object(i.b)("p",null,"The home server is hosting ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://pi-hole.net/"}),"Pi-Hole")," for network wide ad-blocking. If you are not familiar with Pi-Hole, I encourage you to check it out - a great project. My favourite features are insight into DNS queries on the network (who knew how much junk Samsung TVs send), and awesome graphs showing a nice overview of DNS traffic."),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"/docs/assets/pi-hole-dashboard.png",alt:"pi-hole-dashboard"}))),Object(i.b)("h4",{id:"syslog-ng"},"Syslog-ng"),Object(i.b)("p",null,"On a fine spring evening I've decided to check the syslog on EdgeRouter. Perhaps unsurprisingly, there were tons of IPTABLES REJECT messages of random IPs scanning my ports. It would be a shame is this information was lost after rebooting the ERX, so I've installed syslog-ng on my home server. The ERX is configured to send all syslogs over to the server, which are stored in ",Object(i.b)("inlineCode",{parentName:"p"},"/var/log/network/router-ip/year-month-day/messages")," file. It was a matter of writing a quick bash script to filter the logs by ",Object(i.b)("inlineCode",{parentName:"p"},"REJECT")," querie, extract IPv4 addresses only, remove duplicates, filter out private LAN ",Object(i.b)("inlineCode",{parentName:"p"},"192.168.2.0/24")," IPs and build a master blocklist - drawing some inspiration from Fail2ban. The master blocklist is then sent to a GitHub gist a few times every day."),Object(i.b)("p",null,"The ERX router has a cron job going to download the latest copy of the blocklist daily and add the IPs to the blacklist."),Object(i.b)("p",null,"You can check out the original script ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://gist.github.com/SirToffski/6992b8483505f9075a958b7bfb3e640d"}),"here")," and the master blocklist ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://gist.github.com/SirToffski/f80b894a197b1aa57729f175fda67dbe"}),"here"),". Already at 22297 unique addresses. Wow!"),Object(i.b)("h4",{id:"tig-stack"},"TIG Stack"),Object(i.b)("p",null,"Finally, the home server is running a TIG Stack (Telegraf, InfluxDB, Grafana) to collect basic information about the home server. Currently, it's monitoring DNS queries using Pi-Hole APIs and some general linux host stats of the home server - CPU, memory, load average, etc. You can check the dashboards out ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://raw.githubusercontent.com/SirToffski/sirtoffski.github.io/master/images/grafana-1.png"}),"here")," and ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://raw.githubusercontent.com/SirToffski/sirtoffski.github.io/master/images/grafana-2.png"}),"here"),"."),Object(i.b)("h3",{id:"secutiry"},"Secutiry"),Object(i.b)("p",null,"Finally, I wanted to mention the ERX is running ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://tools.ietf.org/html/bcp38"}),"BCP38")," to block bogus forged ingress prefixes. Perhaps an overkill, it was easy to implement and makes me sleep better :). Of course the defaul firewall policy on ERX is to deny an ingress traffic unless explicitly allowed. SSH logins with password have been disabled on both ERX router and home server and the ports on which OpenSSH server listens on have been changed."),Object(i.b)("p",null,"Speaking of OpenSSH - by default OpenWRT comes with ",Object(i.b)("inlineCode",{parentName:"p"},"dropbear")," as an SSH server - which I've disabled an installed OpenSSH instead. I've opted not to use RSA key, instead going for ED25519."),Object(i.b)("h3",{id:"wireguard"},"WireGuard"),Object(i.b)("p",null,"For those unfamiliar with WireGuard, ",Object(i.b)("em",{parentName:"p"},"WireGuard")," is a ",Object(i.b)("strong",{parentName:"p"},"layer 3 network tunnel"),". It uses ",Object(i.b)("em",{parentName:"p"},"Curve25519")," points as pre-shared static keys to achieve mutual authentication, drawing it's inspiration from ",Object(i.b)("em",{parentName:"p"},"OpenSSH"),". For more information check out ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"#references"}),"1"),",",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"#references"}),"2"),",",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"#references"}),"3"),",",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"#references"}),"4"),"."),Object(i.b)("p",null,"Spinning up a WireGuard server instance is a piece of cake. One of my ongoing projects is specifically designed to automate a large portion of the process. Check it out - ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/SirToffski/WireGuard-Ligase"}),"WireGuard-Ligase"),"."),Object(i.b)("p",null,"At the time of writing, I've got three WireGuard servers running. Two of them run as Ubuntu 18.04/CentOS 7 servers on Amazon EC2 - one in Montreal, the other on Ohio. The third one is setup on my home EdgeRouter X. While the EC2 instances are for mostly for testing purposes, the server hosted on my home router is for daily use."),Object(i.b)("p",null,"Why would I host a WireGuard server from home?"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"Fist, we all know about how sketchy public WiFi is. Having a secure tunnel to my home network make it much harder to snoop my traffic."),Object(i.b)("li",{parentName:"ul"},"Second, remember Pi-Hole? Guess what, with a WireGuard tunnel to my home router, my devices can take advantage of Pi-Hole ad-blocking from anywhere. So no matter where I am, even using my cellphone data, my adds are blocked."),Object(i.b)("li",{parentName:"ul"},"Finally, it's a nice bonus to be able to access my home devices remotely without worrying about security too much.")),Object(i.b)("p",null,"One of the challenges of setting up a server at home is due to not having a static address. My ISP DHCPs a public IPv4 address over to my ERX, which may change at any time. For now, I've written a quick script on my server to check the public IP address a few times a day and to save it to a private github gist. If the address changes, all I'd have to do is check out the gist and update a client config on my devices. Not too difficult."),Object(i.b)("h3",{id:"references"},"References"),Object(i.b)("p",null,"[1]"," - ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/SirToffski/WireGuard-Ligase/wiki/About-the-project"}),"https://github.com/SirToffski/WireGuard-Ligase/wiki/About-the-project")," - Wiki for my ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/SirToffski/WireGuard-Ligase"}),"WireGuard-Ligase")," project.",Object(i.b)("br",null),"\n","[2]"," - ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.wireguard.com/"}),"https://www.wireguard.com/")," - Official WireGuard website.",Object(i.b)("br",null),"\n","[3]"," - ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.wireguard.com/papers/wireguard.pdf"}),"https://www.wireguard.com/papers/wireguard.pdf")," - a whitepaper by WireGuard founder and lead developer - Jason A. Donenfeld",Object(i.b)("br",null),"\n","[4]"," - ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://hal.inria.fr/hal-02100345/document"}),"https://hal.inria.fr/hal-02100345/document")," - a formal research paper presenting the first mechanised cryptographic proof of the protocol underlying WireGuard."))}u.isMDXComponent=!0},128:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return m}));var a=r(0),n=r.n(a);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=n.a.createContext({}),b=function(e){var t=n.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s({},t,{},e)),r},u=function(e){var t=b(e.components);return n.a.createElement(l.Provider,{value:t},e.children)},p="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=b(r),p=a,d=u["".concat(o,".").concat(p)]||u[p]||h[p]||i;return r?n.a.createElement(d,s({ref:t},l,{components:r})):n.a.createElement(d,s({ref:t},l))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:a,o[1]=s;for(var l=2;l<i;l++)o[l]=r[l];return n.a.createElement.apply(null,o)}return n.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"}}]);