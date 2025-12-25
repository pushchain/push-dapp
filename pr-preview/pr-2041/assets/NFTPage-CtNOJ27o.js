const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/YouTube-D7w2cn-s.js","assets/index-C5b2Gr8I.js","assets/index-BH5qLxKq.css","assets/SoundCloud-D_pm-zgK.js","assets/Vimeo-CrD3WYCt.js","assets/Mux-Buf074zN.js","assets/Facebook-BpQK1pC2.js","assets/Streamable-X-0IyTJH.js","assets/Wistia-BfuTVq91.js","assets/Twitch-HMc_5uaj.js","assets/DailyMotion-CuJVGrE5.js","assets/Mixcloud-Dns8JwY3.js","assets/Vidyard-DLXSeaqB.js","assets/Kaltura-CX8vNRRA.js","assets/FilePlayer-B0N0yIfA.js","assets/Preview-BWzNkl2h.js"])))=>i.map(i=>d[i]);
import{fo as da,dX as B,hs as pa,ht as Lt,eT as z,hu as ua,hv as zt,hw as ha,ey as fa,e9 as c,e3 as X,dV as K,ef as p,eh as H,fv as S,fw as O,fu as E,d_ as o,e8 as M,hx as me,fB as ce,gb as be,e6 as G,eZ as de,e0 as Q,e1 as ee,hy as Ut,e7 as W,e_ as pe,eX as D,hz as $t,fD as we,f1 as Fe,eU as U,eV as te,eW as Ft,eY as ya,e4 as xa,f0 as Vt,fy as Bt,f2 as ga,f3 as ma,__tla as ba}from"./index-C5b2Gr8I.js";let Ht,Ve,ne,wa=Promise.all([(()=>{try{return ba}catch{}})()]).then(async()=>{function Be(e){return da({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M432 136h-84.3c12.4-11 20.3-26.6 20.3-44 0-33.1-28.3-60-63.1-60-20.6 0-37.9 9.7-48.9 27.4C245 41.7 227.7 32 207.1 32 172.3 32 144 58.9 144 92c0 17.4 7.8 33 20.3 44H80c-17.7 0-32 14.3-32 32v20c0 2.2 1.8 4 4 4h408c2.2 0 4-1.8 4-4v-20c0-17.7-14.3-32-32-32zM304.9 60c18.6 0 33.7 14.3 33.7 32s-15.1 32-33.7 32h-33.7c0-48 15.1-64 33.7-64zm-97.8 0c18.6 0 33.7 16 33.7 64h-33.7c-18.6 0-33.7-14.3-33.7-32s15.1-32 33.7-32zM64 226v222c0 17.6 14.4 32 32 32h146V218H72c-4.4 0-8 3.6-8 8zM440 218H270v262h146c17.6 0 32-14.4 32-32V226c0-4.4-3.6-8-8-8z"}}]})(e)}var Gt=Object.create,ue=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyNames,Jt=Object.getPrototypeOf,Xt=Object.prototype.hasOwnProperty,Yt=(e,t)=>{for(var a in t)ue(e,a,{get:t[a],enumerable:!0})},He=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Wt(t))!Xt.call(e,r)&&r!==a&&ue(e,r,{get:()=>t[r],enumerable:!(n=Kt(t,r))||n.enumerable});return e},Pe=(e,t,a)=>(a=e!=null?Gt(Jt(e)):{},He(!e||!e.__esModule?ue(a,"default",{value:e,enumerable:!0}):a,e)),qt=e=>He(ue({},"__esModule",{value:!0}),e),Ge={};Yt(Ge,{callPlayer:()=>pn,getConfig:()=>cn,getSDK:()=>ln,isBlobUrl:()=>hn,isMediaStream:()=>un,lazy:()=>Zt,omit:()=>dn,parseEndTime:()=>an,parseStartTime:()=>rn,queryString:()=>sn,randomString:()=>on,supportsWebKitPresentationMode:()=>fn});let Ke,We,Je;ne=qt(Ge),Ke=Pe(B),We=Pe(pa),Je=Pe(Lt);const Zt=e=>Ke.default.lazy(async()=>{const t=await e();return typeof t.default=="function"?t:t.default}),Qt=/[?&#](?:start|t)=([0-9hms]+)/,en=/[?&#]end=([0-9hms]+)/,Te=/(\d+)(h|m|s)/g,tn=/^\d+$/;function Xe(e,t){if(e instanceof Array)return;const a=e.match(t);if(a){const n=a[1];if(n.match(Te))return nn(n);if(tn.test(n))return parseInt(n)}}function nn(e){let t=0,a=Te.exec(e);for(;a!==null;){const[,n,r]=a;r==="h"&&(t+=parseInt(n,10)*60*60),r==="m"&&(t+=parseInt(n,10)*60),r==="s"&&(t+=parseInt(n,10)),a=Te.exec(e)}return t}function rn(e){return Xe(e,Qt)}function an(e){return Xe(e,en)}function on(){return Math.random().toString(36).substr(2,5)}function sn(e){return Object.keys(e).map(t=>`${t}=${e[t]}`).join("&")}function ve(e){return window[e]?window[e]:window.exports&&window.exports[e]?window.exports[e]:window.module&&window.module.exports&&window.module.exports[e]?window.module.exports[e]:null}const Y={},ln=function(e,t,a=null,n=()=>!0,r=We.default){const i=ve(t);return i&&n(i)?Promise.resolve(i):new Promise((s,u)=>{if(Y[e]){Y[e].push({resolve:s,reject:u});return}Y[e]=[{resolve:s,reject:u}];const l=h=>{Y[e].forEach(d=>d.resolve(h))};if(a){const h=window[a];window[a]=function(){h&&h(),l(ve(t))}}r(e,h=>{h?(Y[e].forEach(d=>d.reject(h)),Y[e]=null):a||l(ve(t))})})};function cn(e,t){return(0,Je.default)(t.config,e.config)}function dn(e,...t){const a=[].concat(...t),n={},r=Object.keys(e);for(const i of r)a.indexOf(i)===-1&&(n[i]=e[i]);return n}function pn(e,...t){if(!this.player||!this.player[e]){let a=`ReactPlayer: ${this.constructor.displayName} player could not call %c${e}%c \u2013 `;return this.player?this.player[e]||(a+="The method was not available"):a+="The player was not available",console.warn(a,"font-weight: bold",""),null}return this.player[e](...t)}function un(e){return typeof window<"u"&&typeof window.MediaStream<"u"&&e instanceof window.MediaStream}function hn(e){return/^blob:/.test(e)}function fn(e=document.createElement("video")){const t=/iPhone|iPod/.test(navigator.userAgent)===!1;return e.webkitSupportsPresentationMode&&typeof e.webkitSetPresentationMode=="function"&&t}var je=Object.defineProperty,yn=Object.getOwnPropertyDescriptor,xn=Object.getOwnPropertyNames,gn=Object.prototype.hasOwnProperty,mn=(e,t)=>{for(var a in t)je(e,a,{get:t[a],enumerable:!0})},bn=(e,t,a,n)=>{if(typeof t=="object"||typeof t=="function")for(let r of xn(t))!gn.call(e,r)&&r!==a&&je(e,r,{get:()=>t[r],enumerable:!(n=yn(t,r))||n.enumerable});return e},wn=e=>bn(je({},"__esModule",{value:!0}),e),Ye={};mn(Ye,{AUDIO_EXTENSIONS:()=>Se,DASH_EXTENSIONS:()=>dt,FLV_EXTENSIONS:()=>pt,HLS_EXTENSIONS:()=>Ee,MATCH_URL_DAILYMOTION:()=>it,MATCH_URL_FACEBOOK:()=>et,MATCH_URL_FACEBOOK_WATCH:()=>tt,MATCH_URL_KALTURA:()=>ct,MATCH_URL_MIXCLOUD:()=>st,MATCH_URL_MUX:()=>Qe,MATCH_URL_SOUNDCLOUD:()=>qe,MATCH_URL_STREAMABLE:()=>nt,MATCH_URL_TWITCH_CHANNEL:()=>ot,MATCH_URL_TWITCH_VIDEO:()=>at,MATCH_URL_VIDYARD:()=>lt,MATCH_URL_VIMEO:()=>Ze,MATCH_URL_WISTIA:()=>rt,MATCH_URL_YOUTUBE:()=>_e,VIDEO_EXTENSIONS:()=>Oe,canPlay:()=>Pn});let ke;Ve=wn(Ye),ke=ne;const _e=/(?:youtu\.be\/|youtube(?:-nocookie|education)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//,qe=/(?:soundcloud\.com|snd\.sc)\/[^.]+$/,Ze=/vimeo\.com\/(?!progressive_redirect).+/,Qe=/stream\.mux\.com\/(?!\w+\.m3u8)(\w+)/,et=/^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/,tt=/^https?:\/\/fb\.watch\/.+$/,nt=/streamable\.com\/([a-z0-9]+)$/,rt=/(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?([^?]+)/,at=/(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/,ot=/(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/,it=/^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?(?:[\w.#_-]+)?/,st=/mixcloud\.com\/([^/]+\/[^/]+)/,lt=/vidyard.com\/(?:watch\/)?([a-zA-Z0-9-_]+)/,ct=/^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_].*)$/,Se=/\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i,Oe=/\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i,Ee=/\.(m3u8)($|\?)/i,dt=/\.(mpd)($|\?)/i,pt=/\.(flv)($|\?)/i,Ie=e=>{if(e instanceof Array){for(const t of e)if(typeof t=="string"&&Ie(t)||Ie(t.src))return!0;return!1}return(0,ke.isMediaStream)(e)||(0,ke.isBlobUrl)(e)?!0:Se.test(e)||Oe.test(e)||Ee.test(e)||dt.test(e)||pt.test(e)},Pn={youtube:e=>e instanceof Array?e.every(t=>_e.test(t)):_e.test(e),soundcloud:e=>qe.test(e)&&!Se.test(e),vimeo:e=>Ze.test(e)&&!Oe.test(e)&&!Ee.test(e),mux:e=>Qe.test(e),facebook:e=>et.test(e)||tt.test(e),streamable:e=>nt.test(e),wistia:e=>rt.test(e),twitch:e=>at.test(e)||ot.test(e),dailymotion:e=>it.test(e),mixcloud:e=>st.test(e),vidyard:e=>lt.test(e),kaltura:e=>ct.test(e),file:Ie};var Ae=Object.defineProperty,Tn=Object.getOwnPropertyDescriptor,vn=Object.getOwnPropertyNames,jn=Object.prototype.hasOwnProperty,kn=(e,t)=>{for(var a in t)Ae(e,a,{get:t[a],enumerable:!0})},_n=(e,t,a,n)=>{if(typeof t=="object"||typeof t=="function")for(let r of vn(t))!jn.call(e,r)&&r!==a&&Ae(e,r,{get:()=>t[r],enumerable:!(n=Tn(t,r))||n.enumerable});return e},Sn=e=>_n(Ae({},"__esModule",{value:!0}),e),ut={};kn(ut,{default:()=>En});var On=Sn(ut),L=ne,R=Ve,En=[{key:"youtube",name:"YouTube",canPlay:R.canPlay.youtube,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./YouTube-D7w2cn-s.js").then(async e=>(await e.__tla,e)).then(e=>e.Y),__vite__mapDeps([0,1,2])))},{key:"soundcloud",name:"SoundCloud",canPlay:R.canPlay.soundcloud,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./SoundCloud-D_pm-zgK.js").then(async e=>(await e.__tla,e)).then(e=>e.S),__vite__mapDeps([3,1,2])))},{key:"vimeo",name:"Vimeo",canPlay:R.canPlay.vimeo,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Vimeo-CrD3WYCt.js").then(async e=>(await e.__tla,e)).then(e=>e.V),__vite__mapDeps([4,1,2])))},{key:"mux",name:"Mux",canPlay:R.canPlay.mux,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Mux-Buf074zN.js").then(async e=>(await e.__tla,e)).then(e=>e.M),__vite__mapDeps([5,1,2])))},{key:"facebook",name:"Facebook",canPlay:R.canPlay.facebook,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Facebook-BpQK1pC2.js").then(async e=>(await e.__tla,e)).then(e=>e.F),__vite__mapDeps([6,1,2])))},{key:"streamable",name:"Streamable",canPlay:R.canPlay.streamable,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Streamable-X-0IyTJH.js").then(async e=>(await e.__tla,e)).then(e=>e.S),__vite__mapDeps([7,1,2])))},{key:"wistia",name:"Wistia",canPlay:R.canPlay.wistia,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Wistia-BfuTVq91.js").then(async e=>(await e.__tla,e)).then(e=>e.W),__vite__mapDeps([8,1,2])))},{key:"twitch",name:"Twitch",canPlay:R.canPlay.twitch,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Twitch-HMc_5uaj.js").then(async e=>(await e.__tla,e)).then(e=>e.T),__vite__mapDeps([9,1,2])))},{key:"dailymotion",name:"DailyMotion",canPlay:R.canPlay.dailymotion,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./DailyMotion-CuJVGrE5.js").then(async e=>(await e.__tla,e)).then(e=>e.D),__vite__mapDeps([10,1,2])))},{key:"mixcloud",name:"Mixcloud",canPlay:R.canPlay.mixcloud,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Mixcloud-Dns8JwY3.js").then(async e=>(await e.__tla,e)).then(e=>e.M),__vite__mapDeps([11,1,2])))},{key:"vidyard",name:"Vidyard",canPlay:R.canPlay.vidyard,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Vidyard-DLXSeaqB.js").then(async e=>(await e.__tla,e)).then(e=>e.V),__vite__mapDeps([12,1,2])))},{key:"kaltura",name:"Kaltura",canPlay:R.canPlay.kaltura,lazyPlayer:(0,L.lazy)(()=>z(()=>import("./Kaltura-CX8vNRRA.js").then(async e=>(await e.__tla,e)).then(e=>e.K),__vite__mapDeps([13,1,2])))},{key:"file",name:"FilePlayer",canPlay:R.canPlay.file,canEnablePIP:e=>R.canPlay.file(e)&&(document.pictureInPictureEnabled||(0,L.supportsWebKitPresentationMode)())&&!R.AUDIO_EXTENSIONS.test(e),lazyPlayer:(0,L.lazy)(()=>z(()=>import("./FilePlayer-B0N0yIfA.js").then(async e=>(await e.__tla,e)).then(e=>e.F),__vite__mapDeps([14,1,2])))}],In=Object.create,he=Object.defineProperty,An=Object.getOwnPropertyDescriptor,Dn=Object.getOwnPropertyNames,Cn=Object.getPrototypeOf,Rn=Object.prototype.hasOwnProperty,Nn=(e,t)=>{for(var a in t)he(e,a,{get:t[a],enumerable:!0})},ht=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Dn(t))!Rn.call(e,r)&&r!==a&&he(e,r,{get:()=>t[r],enumerable:!(n=An(t,r))||n.enumerable});return e},Mn=(e,t,a)=>(a=e!=null?In(Cn(e)):{},ht(!e||!e.__esModule?he(a,"default",{value:e,enumerable:!0}):a,e)),Ln=e=>ht(he({},"__esModule",{value:!0}),e),ft={};Nn(ft,{defaultProps:()=>$n,propTypes:()=>Un});var yt=Ln(ft),zn=Mn(ua);const{string:I,bool:N,number:q,array:De,oneOfType:re,shape:$,object:C,func:k,node:xt}=zn.default,Un={url:re([I,De,C]),playing:N,loop:N,controls:N,volume:q,muted:N,playbackRate:q,width:re([I,q]),height:re([I,q]),style:C,progressInterval:q,playsinline:N,pip:N,stopOnUnmount:N,light:re([N,I,C]),playIcon:xt,previewTabIndex:q,previewAriaLabel:I,fallback:xt,oEmbedUrl:I,wrapper:re([I,k,$({render:k.isRequired})]),config:$({soundcloud:$({options:C}),youtube:$({playerVars:C,embedOptions:C,onUnstarted:k}),facebook:$({appId:I,version:I,playerId:I,attributes:C}),dailymotion:$({params:C}),vimeo:$({playerOptions:C,title:I}),mux:$({attributes:C,version:I}),file:$({attributes:C,tracks:De,forceVideo:N,forceAudio:N,forceHLS:N,forceSafariHLS:N,forceDisableHls:N,forceDASH:N,forceFLV:N,hlsOptions:C,hlsVersion:I,dashVersion:I,flvVersion:I}),wistia:$({options:C,playerId:I,customControls:De}),mixcloud:$({options:C}),twitch:$({options:C,playerId:I}),vidyard:$({options:C})}),onReady:k,onStart:k,onPlay:k,onPause:k,onBuffer:k,onBufferEnd:k,onEnded:k,onError:k,onDuration:k,onSeek:k,onPlaybackRateChange:k,onPlaybackQualityChange:k,onProgress:k,onClickPreview:k,onEnablePIP:k,onDisablePIP:k},A=()=>{},$n={playing:!1,loop:!1,controls:!1,volume:null,muted:!1,playbackRate:1,width:"640px",height:"360px",style:{},progressInterval:1e3,playsinline:!1,pip:!1,stopOnUnmount:!0,light:!1,fallback:null,wrapper:"div",previewTabIndex:0,previewAriaLabel:"",oEmbedUrl:"https://noembed.com/embed?url={url}",config:{soundcloud:{options:{visual:!0,buying:!1,liking:!1,download:!1,sharing:!1,show_comments:!1,show_playcount:!1}},youtube:{playerVars:{playsinline:1,showinfo:0,rel:0,iv_load_policy:3,modestbranding:1},embedOptions:{},onUnstarted:A},facebook:{appId:"1309697205772819",version:"v3.3",playerId:null,attributes:{}},dailymotion:{params:{api:1,"endscreen-enable":!1}},vimeo:{playerOptions:{autopause:!1,byline:!1,portrait:!1,title:!1},title:null},mux:{attributes:{},version:"2"},file:{attributes:{},tracks:[],forceVideo:!1,forceAudio:!1,forceHLS:!1,forceDASH:!1,forceFLV:!1,hlsOptions:{},hlsVersion:"1.1.4",dashVersion:"3.1.3",flvVersion:"1.5.0",forceDisableHls:!1},wistia:{options:{},playerId:null,customControls:null},mixcloud:{options:{hide_cover:1}},twitch:{options:{},playerId:null},vidyard:{options:{}}},onReady:A,onStart:A,onPlay:A,onPause:A,onBuffer:A,onBufferEnd:A,onEnded:A,onError:A,onDuration:A,onSeek:A,onPlaybackRateChange:A,onPlaybackQualityChange:A,onProgress:A,onClickPreview:A,onEnablePIP:A,onDisablePIP:A};var Fn=Object.create,ae=Object.defineProperty,Vn=Object.getOwnPropertyDescriptor,Bn=Object.getOwnPropertyNames,Hn=Object.getPrototypeOf,Gn=Object.prototype.hasOwnProperty,Kn=(e,t,a)=>t in e?ae(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,Wn=(e,t)=>{for(var a in t)ae(e,a,{get:t[a],enumerable:!0})},gt=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Bn(t))!Gn.call(e,r)&&r!==a&&ae(e,r,{get:()=>t[r],enumerable:!(n=Vn(t,r))||n.enumerable});return e},mt=(e,t,a)=>(a=e!=null?Fn(Hn(e)):{},gt(!e||!e.__esModule?ae(a,"default",{value:e,enumerable:!0}):a,e)),Jn=e=>gt(ae({},"__esModule",{value:!0}),e),P=(e,t,a)=>(Kn(e,typeof t!="symbol"?t+"":t,a),a),bt={};Wn(bt,{default:()=>fe});var Xn=Jn(bt),wt=mt(B),Yn=mt(zt),Pt=yt,qn=ne;const Zn=5e3;class fe extends wt.Component{constructor(){super(...arguments),P(this,"mounted",!1),P(this,"isReady",!1),P(this,"isPlaying",!1),P(this,"isLoading",!0),P(this,"loadOnReady",null),P(this,"startOnPlay",!0),P(this,"seekOnPlay",null),P(this,"onDurationCalled",!1),P(this,"handlePlayerMount",t=>{if(this.player){this.progress();return}this.player=t,this.player.load(this.props.url),this.progress()}),P(this,"getInternalPlayer",t=>this.player?this.player[t]:null),P(this,"progress",()=>{if(this.props.url&&this.player&&this.isReady){const t=this.getCurrentTime()||0,a=this.getSecondsLoaded(),n=this.getDuration();if(n){const r={playedSeconds:t,played:t/n};a!==null&&(r.loadedSeconds=a,r.loaded=a/n),(r.playedSeconds!==this.prevPlayed||r.loadedSeconds!==this.prevLoaded)&&this.props.onProgress(r),this.prevPlayed=r.playedSeconds,this.prevLoaded=r.loadedSeconds}}this.progressTimeout=setTimeout(this.progress,this.props.progressFrequency||this.props.progressInterval)}),P(this,"handleReady",()=>{if(!this.mounted)return;this.isReady=!0,this.isLoading=!1;const{onReady:t,playing:a,volume:n,muted:r}=this.props;t(),!r&&n!==null&&this.player.setVolume(n),this.loadOnReady?(this.player.load(this.loadOnReady,!0),this.loadOnReady=null):a&&this.player.play(),this.handleDurationCheck()}),P(this,"handlePlay",()=>{this.isPlaying=!0,this.isLoading=!1;const{onStart:t,onPlay:a,playbackRate:n}=this.props;this.startOnPlay&&(this.player.setPlaybackRate&&n!==1&&this.player.setPlaybackRate(n),t(),this.startOnPlay=!1),a(),this.seekOnPlay&&(this.seekTo(this.seekOnPlay),this.seekOnPlay=null),this.handleDurationCheck()}),P(this,"handlePause",t=>{this.isPlaying=!1,this.isLoading||this.props.onPause(t)}),P(this,"handleEnded",()=>{const{activePlayer:t,loop:a,onEnded:n}=this.props;t.loopOnEnded&&a&&this.seekTo(0),a||(this.isPlaying=!1,n())}),P(this,"handleError",(...t)=>{this.isLoading=!1,this.props.onError(...t)}),P(this,"handleDurationCheck",()=>{clearTimeout(this.durationCheckTimeout);const t=this.getDuration();t?this.onDurationCalled||(this.props.onDuration(t),this.onDurationCalled=!0):this.durationCheckTimeout=setTimeout(this.handleDurationCheck,100)}),P(this,"handleLoaded",()=>{this.isLoading=!1})}componentDidMount(){this.mounted=!0}componentWillUnmount(){clearTimeout(this.progressTimeout),clearTimeout(this.durationCheckTimeout),this.isReady&&this.props.stopOnUnmount&&(this.player.stop(),this.player.disablePIP&&this.player.disablePIP()),this.mounted=!1}componentDidUpdate(t){if(!this.player)return;const{url:a,playing:n,volume:r,muted:i,playbackRate:s,pip:u,loop:l,activePlayer:h,disableDeferredLoading:d}=this.props;if(!(0,Yn.default)(t.url,a)){if(this.isLoading&&!h.forceLoad&&!d&&!(0,qn.isMediaStream)(a)){console.warn(`ReactPlayer: the attempt to load ${a} is being deferred until the player has loaded`),this.loadOnReady=a;return}this.isLoading=!0,this.startOnPlay=!0,this.onDurationCalled=!1,this.player.load(a,this.isReady)}!t.playing&&n&&!this.isPlaying&&this.player.play(),t.playing&&!n&&this.isPlaying&&this.player.pause(),!t.pip&&u&&this.player.enablePIP&&this.player.enablePIP(),t.pip&&!u&&this.player.disablePIP&&this.player.disablePIP(),t.volume!==r&&r!==null&&this.player.setVolume(r),t.muted!==i&&(i?this.player.mute():(this.player.unmute(),r!==null&&setTimeout(()=>this.player.setVolume(r)))),t.playbackRate!==s&&this.player.setPlaybackRate&&this.player.setPlaybackRate(s),t.loop!==l&&this.player.setLoop&&this.player.setLoop(l)}getDuration(){return this.isReady?this.player.getDuration():null}getCurrentTime(){return this.isReady?this.player.getCurrentTime():null}getSecondsLoaded(){return this.isReady?this.player.getSecondsLoaded():null}seekTo(t,a,n){if(!this.isReady){t!==0&&(this.seekOnPlay=t,setTimeout(()=>{this.seekOnPlay=null},Zn));return}if(a?a==="fraction":t>0&&t<1){const r=this.player.getDuration();if(!r){console.warn("ReactPlayer: could not seek using fraction \u2013\xA0duration not yet available");return}this.player.seekTo(r*t,n);return}this.player.seekTo(t,n)}render(){const t=this.props.activePlayer;return t?wt.default.createElement(t,{...this.props,onMount:this.handlePlayerMount,onReady:this.handleReady,onPlay:this.handlePlay,onPause:this.handlePause,onEnded:this.handleEnded,onLoaded:this.handleLoaded,onError:this.handleError}):null}}P(fe,"displayName","Player"),P(fe,"propTypes",Pt.propTypes),P(fe,"defaultProps",Pt.defaultProps);var Qn=Object.create,oe=Object.defineProperty,er=Object.getOwnPropertyDescriptor,tr=Object.getOwnPropertyNames,nr=Object.getPrototypeOf,rr=Object.prototype.hasOwnProperty,ar=(e,t,a)=>t in e?oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,or=(e,t)=>{for(var a in t)oe(e,a,{get:t[a],enumerable:!0})},Tt=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of tr(t))!rr.call(e,r)&&r!==a&&oe(e,r,{get:()=>t[r],enumerable:!(n=er(t,r))||n.enumerable});return e},ie=(e,t,a)=>(a=e!=null?Qn(nr(e)):{},Tt(!e||!e.__esModule?oe(a,"default",{value:e,enumerable:!0}):a,e)),ir=e=>Tt(oe({},"__esModule",{value:!0}),e),T=(e,t,a)=>(ar(e,typeof t!="symbol"?t+"":t,a),a),vt={};or(vt,{createReactPlayer:()=>yr});var sr=ir(vt),Z=ie(B),lr=ie(Lt),Ce=ie(ha),jt=ie(zt),se=yt,kt=ne,cr=ie(Xn);const dr=(0,kt.lazy)(()=>z(()=>import("./Preview-BWzNkl2h.js").then(async e=>(await e.__tla,e)).then(e=>e.P),__vite__mapDeps([15,1,2]))),pr=typeof window<"u"&&window.document&&typeof document<"u",ur=typeof globalThis<"u"&&globalThis.window&&globalThis.window.document,hr=Object.keys(se.propTypes),fr=pr||ur?Z.Suspense:()=>null,le=[],yr=(e,t)=>{var a;return a=class extends Z.Component{constructor(){super(...arguments),T(this,"state",{showPreview:!!this.props.light}),T(this,"references",{wrapper:n=>{this.wrapper=n},player:n=>{this.player=n}}),T(this,"handleClickPreview",n=>{this.setState({showPreview:!1}),this.props.onClickPreview(n)}),T(this,"showPreview",()=>{this.setState({showPreview:!0})}),T(this,"getDuration",()=>this.player?this.player.getDuration():null),T(this,"getCurrentTime",()=>this.player?this.player.getCurrentTime():null),T(this,"getSecondsLoaded",()=>this.player?this.player.getSecondsLoaded():null),T(this,"getInternalPlayer",(n="player")=>this.player?this.player.getInternalPlayer(n):null),T(this,"seekTo",(n,r,i)=>{if(!this.player)return null;this.player.seekTo(n,r,i)}),T(this,"handleReady",()=>{this.props.onReady(this)}),T(this,"getActivePlayer",(0,Ce.default)(n=>{for(const r of[...le,...e])if(r.canPlay(n))return r;return t||null})),T(this,"getConfig",(0,Ce.default)((n,r)=>{const{config:i}=this.props;return lr.default.all([se.defaultProps.config,se.defaultProps.config[r]||{},i,i[r]||{}])})),T(this,"getAttributes",(0,Ce.default)(n=>(0,kt.omit)(this.props,hr))),T(this,"renderActivePlayer",n=>{if(!n)return null;const r=this.getActivePlayer(n);if(!r)return null;const i=this.getConfig(n,r.key);return Z.default.createElement(cr.default,{...this.props,key:r.key,ref:this.references.player,config:i,activePlayer:r.lazyPlayer||r,onReady:this.handleReady})})}shouldComponentUpdate(n,r){return!(0,jt.default)(this.props,n)||!(0,jt.default)(this.state,r)}componentDidUpdate(n){const{light:r}=this.props;!n.light&&r&&this.setState({showPreview:!0}),n.light&&!r&&this.setState({showPreview:!1})}renderPreview(n){if(!n)return null;const{light:r,playIcon:i,previewTabIndex:s,oEmbedUrl:u,previewAriaLabel:l}=this.props;return Z.default.createElement(dr,{url:n,light:r,playIcon:i,previewTabIndex:s,previewAriaLabel:l,oEmbedUrl:u,onClick:this.handleClickPreview})}render(){const{url:n,style:r,width:i,height:s,fallback:u,wrapper:l}=this.props,{showPreview:h}=this.state,d=this.getAttributes(n),g=typeof l=="string"?this.references.wrapper:void 0;return Z.default.createElement(l,{ref:g,style:{...r,width:i,height:s},...d},Z.default.createElement(fr,{fallback:u},h?this.renderPreview(n):this.renderActivePlayer(n)))}},T(a,"displayName","ReactPlayer"),T(a,"propTypes",se.propTypes),T(a,"defaultProps",se.defaultProps),T(a,"addCustomPlayer",n=>{le.push(n)}),T(a,"removeCustomPlayers",()=>{le.length=0}),T(a,"canPlay",n=>{for(const r of[...le,...e])if(r.canPlay(n))return!0;return!1}),T(a,"canEnablePIP",n=>{for(const r of[...le,...e])if(r.canEnablePIP&&r.canEnablePIP(n))return!0;return!1}),a};var xr=Object.create,ye=Object.defineProperty,gr=Object.getOwnPropertyDescriptor,mr=Object.getOwnPropertyNames,br=Object.getPrototypeOf,wr=Object.prototype.hasOwnProperty,Pr=(e,t)=>{for(var a in t)ye(e,a,{get:t[a],enumerable:!0})},_t=(e,t,a,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of mr(t))!wr.call(e,r)&&r!==a&&ye(e,r,{get:()=>t[r],enumerable:!(n=gr(t,r))||n.enumerable});return e},Tr=(e,t,a)=>(a=e!=null?xr(br(e)):{},_t(!e||!e.__esModule?ye(a,"default",{value:e,enumerable:!0}):a,e)),vr=e=>_t(ye({},"__esModule",{value:!0}),e),St={};Pr(St,{default:()=>Sr});var jr=vr(St),Re=Tr(On),kr=sr;const _r=Re.default[Re.default.length-1];var Sr=(0,kr.createReactPlayer)(Re.default,_r);const Ot=fa(jr);function Et({NFTObject:e,setControlAt:t,setTokenId:a}){const{account:n,provider:r,chainId:i}=K(),[s,u]=p.useState(null),[l,h]=p.useState(!0);p.useState(!1);const d=i===H.mainnetCoreContractChain;return p.useEffect(()=>{if(r&&n){let g=r.getSigner(n);const f=new S(O.NFTRewards,E.NFTRewards,g);u(f)}},[n,r]),p.useEffect(()=>{e&&h(!1)},[n,e]),o.jsx(M,{children:o.jsxs(Dr,{theme:n&&r&&n==e.owner?"#e20880":n&&r&&e.owner!=14367003520353756e32?"#eee":"#fff",children:[o.jsx(Cr,{children:o.jsxs(Rr,{children:[l&&o.jsx(me,{color:"#eee",width:"100%",height:"100%"}),!l&&o.jsx(Ot,{url:`https://ipfs.io/ipfs/${e.metadata}`,controls:!0,playing:!1,loop:!0}),!!n&&!!r&&e.owner!=14367003520353756e32&&o.jsxs(Or,{children:[o.jsx(Be,{size:20,color:"#fff"}),o.jsx(Er,{children:"Gifted"})]}),!!n&&!!r&&e.claimable&&o.jsx(Ir,{children:o.jsx(Ar,{children:"2400 $PUSH"})})]})}),!!n&&!!r&&o.jsx(ce,{children:o.jsxs(Nr,{children:[l&&o.jsx(zr,{children:o.jsx(me,{})}),!!n&&!!r&&d&&n==e.owner&&!l&&o.jsx(Ur,{children:o.jsx(Lr,{onClick:()=>{a(e.id),t(2)},children:"Transfer"})})]})})]})},e.id)}const It=c.label`
  margin: 0px 5px;
  color: #fff;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
`,Or=c.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`,Er=c(It)`
  background: #35c4f3;
`,Ir=c.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 10px;
  left: 10px;
`,Ar=c(It)`
  background: #e20880;
`,Dr=c.div`
  background: ${e=>e.theme||"#fff"};
  max-width: 25%;
  min-width: 200px;
  flex: 1;
  margin: 5px;
  padding: 10px;
  border: 2px solid #fafafa;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`,Cr=c.div`
  padding-top: 100%;
  position: relative;
`,Rr=c.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;c.label`
  margin: 0px 5px;
  color: #fff;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
`;const Nr=c.div`
  margin: 5px;
  flex-grow: 1;
  max-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`,Mr=c.button`
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  margin: 10px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    pointer: hand;
  }
  &:active {
    opacity: 0.75;
    cursor: pointer;
    pointer: hand;
  }
  ${e=>e.disabled&&X`
      background: #e20880;
      &:hover {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
      &:active {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
    `}
`,Lr=c.span`
  font-size: 12px;
  ${e=>e.hideit&&X`
      visibility: hidden;
    `};
`;c.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;const zr=c.div`
  border: 0;
  outline: 0;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 5px;
  flex: 1;
`,Ur=c(Mr)`
  background: #000;
`;c.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 10px;
`,c.div`
  margin: 0px 10px;
`;const b={getNFTBalance:async(e,t)=>new Promise((a,n)=>{t&&t.balanceOf(e).then(r=>{a(r.toNumber())}).catch(r=>{console.error("!!!Error, getNFTBalance() --> %o",r),n(r)})}),getTotalSupply:async e=>new Promise((t,a)=>{e.totalSupply().then(n=>{t(n.toNumber())}).catch(n=>{console.error("!!!Error, getNFTBalance() --> %o",n),a(n)})}),getOwnerOfTokenId:async({tokenId:e,contract:t})=>new Promise((a,n)=>{t.ownerOf(e).then(r=>{a(r)}).catch(r=>{console.error("!!!Error, getOwnerOfTokenId() --> %o",r),n(r)})}),getTokenOfOwnerByIndex:async(e,t,a)=>new Promise((n,r)=>{a.tokenOfOwnerByIndex(e,t).then(i=>{n(i.toNumber())}).catch(i=>{console.error("!!!Error, getTokenOfOwnerByIndex() --> %o",i),r(i)})}),getTokenByIndex:async(e,t)=>new Promise((a,n)=>{t.tokenByIndex(e).then(r=>{a(r.toNumber())}).catch(r=>{console.error("!!!Error, getTokenByIndex() --> %o",r),n(r)})}),getTokenMetadata:async({tokenId:e,contract:t})=>new Promise((a,n)=>{t.tokenURI(e).then(r=>{a(r)}).catch(r=>{console.error("!!!Error, getTokenMetadata() --> %o",r),n(r)})}),getTokenMetadatasOfOwner:async(e,t,a)=>new Promise((n,r)=>{b.getNFTBalance(e,t).then(async i=>{let s=[],u=[];for(let l=0;l<i;l++)u.push(b.getTokenOfOwnerByIndex(e,l,t).then(async h=>{await b.getClaimable({tokenId:h,contract:a}).then(async d=>{console.debug("\u{1F680} ~ file: NFTHelper.js ~ line 102 ~ .then ~ claimable",d),await b.getTokenMetadata({tokenId:h,contract:t}).then(async g=>{h!=null&&g!=null&&d!=null&&s.push({id:h,metadata:g,claimable:d})})}).catch(d=>{console.error("!!!Error, getClaimable() --> %o",d),r(d)})}));await Promise.all(u),console.debug("\u{1F680} ~ file: NFTHelper.js ~ line 83 ~ .then ~ NFTDetails",s),n(s)}).catch(i=>{console.error("!!!Error, getTokenMetadatasOfOwner() --> %o",i),r(i)})}),getAllTokenDatas:async(e,t)=>new Promise((a,n)=>{b.getNFTBalance(e).then(async r=>{let i=[],s=[];for(let u=0;u<r;u++)s.push(b.getTokenByIndex(u,e).then(async l=>{await b.getClaimable({tokenId:l,contract:t}).then(async h=>{await b.getTokenMetadata({tokenId:l,contract:e}).then(async d=>{await b.getOwnerOfTokenId({tokenId:l,contract:e}).then(async g=>{l!=null&&d!=null&&h!=null&&g!=null&&i.push({id:l,metadata:d,owner:g,claimable:h})}).catch(g=>{console.error("!!!Error, getAllTokenDatas::getOwnerOfTokenId() --> %o",g),n(g)})}).catch(d=>{console.error("!!!Error, getAllTokenDatas::getTokenMetadata() --> %o",d),n(d)})}).catch(h=>{console.error("!!!Error, getAllTokenDatas::getClaimable() --> %o",h),n(h)})}).catch(l=>{console.error("!!!Error, getAllTokenDatas::getTokenByIndex() --> %o",l),n(l)}));await Promise.all(s),console.debug("\u{1F680} ~ file: NFTHelper.js ~ line 83 ~ .then ~ NFTDetails",i),a(i)}).catch(r=>{console.error("!!!Error, getAllTokenDatas() --> %o",r),n(r)})}),getTokenData:async(e,t,a)=>new Promise((n,r)=>{b.getTokenMetadata({tokenId:e,contract:t}).then(async i=>{await b.getOwnerOfTokenId({tokenId:e,contract:t}).then(async s=>{e!=null&&i!=null&&s!=null&&n({id:e,metadata:i,owner:s})})}).catch(i=>{console.error("!!!Error, getTokenData() --> %o",i),r(i)})}),transferNFT:async(e,t,a,n)=>new Promise((r,i)=>{n.safeTransferFrom(e,t,a).then(s=>{console.debug("transferNFT() --> %o",s),r(s)}).catch(s=>{console.error("!!!Error, transferNFT() --> %o",s),i(s)})}),getClaimable:async({tokenId:e,contract:t})=>(console.debug(e,t),new Promise((a,n)=>{t&&t.getClaimRewardStatus(e).then(r=>{a(r)}).catch(r=>{console.error("!!!Error, getClaimable() --> %o",r),n(r)})}))};function $r({controlAt:e,setControlAt:t,setTokenId:a}){const{account:n,chainId:r,provider:i}=K(),[s,u]=p.useState(null),[l,h]=p.useState(null),[d,g]=p.useState(null),[f,y]=p.useState([]),[m,F]=p.useState(!0),v=r===H.mainnetCoreContractChain?i:new be(H.mainnetCoreRPC);p.useEffect(()=>{if(v&&n){const w=new S(O.rockstar,E.rockstar,v);u(w);let x=v.getSigner(n);const j=new S(O.rockstar,E.rockstar,x);h(j);const _=new S(O.NFTRewards,E.NFTRewards,x);g(_)}},[n]),p.useEffect(()=>{s&&d&&J()},[n,s,l,d]);const J=async()=>{let w=await b.getTotalSupply(s);F(!1);for(let x=0;x<w;x++){let j=await b.getTokenByIndex(x,s),_=await b.getTokenData(j,s,d);await y(V=>[...V,_])}};return o.jsxs(G,{align:"center",children:[m&&o.jsx(de,{padding:"50px 20px 20px 20px",children:o.jsx(Q,{type:ee.SEAMLESS})}),!m&&f.length!=0&&o.jsx(ce,{id:"scrollstyle-secondary",margin:"20px 0 0 0",children:Object.keys(f).map(w=>{if(f)return o.jsx(o.Fragment,{children:o.jsx(Et,{NFTObject:f[w],nftReadProvider:s,nftWriteProvider:l,controlAt:e,setControlAt:t,setTokenId:a},f[w].id)})})})]})}c.div`
  padding: 20px;
`;function At({NFTObject:e,setControlAt:t,setTokenId:a}){const{account:n,provider:r,chainId:i}=K(),[s,u]=p.useState(null),[l,h]=p.useState(!0);p.useState(!1);const d=i===H.mainnetCoreContractChain;p.useEffect(()=>{if(r&&n){let f=r.getSigner(n);const y=new S(O.NFTRewardsV2,E.NFTRewardsV2,f);u(y)}},[n,r]),p.useEffect(()=>{e&&h(!1)},[n,e]);let g=e.nftInfo.animation_url.replace("https://epns.mypinata.cloud/ipfs/","https://ipfs.io/ipfs/");return o.jsx(M,{children:o.jsxs(Gr,{theme:n&&r&&n==e.owner?"#e20880":n&&r&&e.owner!=1178191227273143e33?"#eee":"#fff",children:[o.jsx(Kr,{children:o.jsxs(Wr,{children:[l&&o.jsx(me,{color:"#eee",width:"100%",height:"100%"}),!l&&o.jsx(Ot,{url:`${g}`,controls:!0,playing:!1,loop:!0}),!!n&&!!r&&e.owner!=1178191227273143e33&&o.jsxs(Fr,{children:[o.jsx(Be,{size:20,color:"#fff"}),o.jsx(Vr,{children:"Gifted"})]}),!!n&&!!r&&e.claimable&&o.jsx(Br,{children:o.jsx(Hr,{children:"900 $PUSH"})})]})}),!!n&&!!r&&o.jsx(ce,{children:o.jsxs(Jr,{children:[l&&o.jsx(qr,{children:o.jsx(me,{})}),!!n&&!!r&&d&&n==e.owner&&!l&&o.jsx(Zr,{children:o.jsx(Yr,{onClick:()=>{a(e.id),t(3)},children:"Transfer"})})]})})]})},e.id)}const Dt=c.label`
  margin: 0px 5px;
  color: #fff;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
`,Fr=c.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`,Vr=c(Dt)`
  background: #35c4f3;
`,Br=c.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 10px;
  left: 10px;
`,Hr=c(Dt)`
  background: #e20880;
`,Gr=c.div`
  background: ${e=>e.theme||"#fff"};
  max-width: 25%;
  min-width: 200px;
  flex: 1;
  margin: 5px;
  padding: 10px;
  border: 2px solid #fafafa;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
`,Kr=c.div`
  padding-top: 100%;
  position: relative;
`,Wr=c.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`,Jr=c.div`
  margin: 5px;
  flex-grow: 1;
  max-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`,Xr=c.button`
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  margin: 10px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    pointer: hand;
  }
  &:active {
    opacity: 0.75;
    cursor: pointer;
    pointer: hand;
  }
  ${e=>e.disabled&&X`
      background: #e20880;
      &:hover {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
      &:active {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
    `}
`,Yr=c.span`
  font-size: 12px;
  ${e=>e.hideit&&X`
      visibility: hidden;
    `};
`;c.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;const qr=c.div`
  border: 0;
  outline: 0;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 5px;
  flex: 1;
`,Zr=c(Xr)`
  background: #000;
`;c.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 10px;
`,c.div`
  margin: 0px 10px;
`;function Qr({controlAt:e,setControlAt:t,setTokenId:a}){const{account:n,chainId:r,provider:i}=K(),[s,u]=p.useState(null),[l,h]=p.useState(null),[d,g]=p.useState(null),[f,y]=p.useState([]),[m,F]=p.useState(!0),v=r===H.mainnetCoreContractChain?i:new be(H.mainnetCoreRPC);p.useEffect(()=>{if(v&&n){const w=new S(O.rockstarV2,E.rockstarV2,v);u(w);let x=v.getSigner(n);const j=new S(O.rockstarV2,E.rockstarV2,x);h(j);const _=new S(O.NFTRewardsV2,E.NFTRewardsV2,x);g(_)}return()=>{u(null),h(null),g(null)}},[n]),p.useEffect(()=>{s&&J()},[n,s]);const J=async()=>{let w=await b.getTotalSupply(s);F(!1);for(let x=0;x<w;x++){let j=await b.getTokenByIndex(x,s),_=await b.getTokenData(j,s,d),V=_.metadata.replace("ipfs://","https://ipfs.io/ipfs/"),Ue=await(await fetch(`${V}`)).json();_.nftInfo=Ue,await y($e=>[...$e,_])}};return o.jsxs(G,{align:"center",children:[m&&o.jsx(de,{padding:"50px 20px 20px 20px",children:o.jsx(Q,{type:ee.SEAMLESS})}),!m&&f.length!=0&&o.jsx(ce,{id:"scrollstyle-secondary",margin:"20px 0 0 0",children:Object.keys(f).map(w=>{var x;if(f)return o.jsx(At,{NFTObject:f[w],nftReadProvider:s,nftWriteProvider:l,controlAt:e,setControlAt:t,setTokenId:a},(x=f[w])==null?void 0:x.id)})})]})}c.div`
  padding: 20px;
`;function ea({controlAt:e,setControlAt:t,setTokenId:a}){const{account:n,provider:r,chainId:i}=K(),[s,u]=p.useState(null),[l,h]=p.useState(null),[d,g]=p.useState(null),[f,y]=p.useState([]),[m,F]=p.useState(!0),v=i===H.mainnetCoreContractChain?r:new be(H.mainnetCoreRPC);p.useEffect(()=>{if(v&&n){const w=new S(O.rockstar,E.rockstar,v);u(w);let x=v.getSigner(n);const j=new S(O.rockstar,E.rockstar,x);h(j);const _=new S(O.NFTRewards,E.NFTRewards,x);g(_)}},[n]),p.useEffect(()=>{s&&d&&J()},[n,s,l,d]);const J=async()=>{let w=await b.getNFTBalance(n,s);F(!1);for(let x=0;x<w;x++){let j=await b.getTokenOfOwnerByIndex(n,x,s),_=await b.getTokenData(j,s,d);await y(V=>[...V,_])}};return o.jsxs(de,{margin:"32px 0 0 0",children:[m&&o.jsx(Ct,{children:o.jsx(Q,{type:ee.SEAMLESS,spinnerSize:40})}),!m&&f.length==0&&o.jsx(Ct,{children:o.jsx(Ut,{title:"No ROCKSTAR tokens are available in your account"})}),!m&&f.length!=0&&o.jsx(ta,{id:"scrollstyle-secondary",margin:"20px 0 0 0",children:Object.keys(f).map(w=>{if(f[w].id)return o.jsx(Et,{NFTObject:f[w],nftReadProvider:s,nftWriteProvider:l,controlAt:e,setControlAt:t,setTokenId:a},f[w].id)})})]})}const Ct=c.div`
  padding: 20px;
`,ta=c.div`
  display: block;
  align-self: stretch;
  padding: 10px 20px;
`;function na({controlAt:e,setControlAt:t,setTokenId:a}){const{account:n,provider:r,chainId:i}=K(),[s,u]=B.useState(null),[l,h]=B.useState(null),[d,g]=B.useState(null),[f,y]=B.useState([]),[m,F]=B.useState(!0),v=i===H.mainnetCoreContractChain?r:new be(H.mainnetCoreRPC);B.useEffect(()=>{if(v&&n){const x=new S(O.rockstarV2,E.rockstarV2,v);u(x);let j=v.getSigner(n);const _=new S(O.rockstarV2,E.rockstarV2,j);h(_);const V=new S(O.NFTRewardsV2,E.NFTRewardsV2,j);g(V)}},[n]),B.useEffect(()=>{s&&J()},[n,s]);const J=async()=>{let x=await b.getNFTBalance(n,s);F(!1);for(let j=0;j<x;j++){let _=await b.getTokenOfOwnerByIndex(n,j,s);if(_<1||_>100)return;let V=await b.getTokenData(_,s,d),Ue=await w(V.metadata);V.nftInfo=Ue,y($e=>[...$e,V])}},w=async x=>{let j=x.replace("ipfs://","https://ipfs.io/ipfs/");return await(await fetch(`${j}`)).json()};return o.jsxs(de,{margin:"32px 0 0 0",children:[m&&o.jsx(Rt,{children:o.jsx(Q,{type:ee.SEAMLESS,spinnerSize:40})}),!m&&f.length==0&&o.jsx(Rt,{children:o.jsx(Ut,{title:"No ROCKSTAR NFTs are available in your account"})}),!m&&f.length!=0&&o.jsx(ce,{margin:"20px 0 0 0",children:Object.keys(f).map(x=>{if(f)return o.jsx(At,{NFTObject:f[x],nftReadProvider:s,nftWriteProvider:l,controlAt:e,setControlAt:t,setTokenId:a},f[x].id)})})]})}const Rt=c.div`
  padding: 20px;
`;function ra({tokenId:e}){const{account:t,provider:a}=K(),[n,r]=p.useState(null),[i,s]=p.useState(""),[u,l]=p.useState(0),[h,d]=p.useState("");p.useEffect(()=>{if(a&&t){let y=a.getSigner(t);const m=new S(O.rockstar,E.rockstar,y);r(m)}},[t]);const g=async y=>{if(n){if(console.info("\u{1F680} ~ file: TransferNFT.js ~ line 64 ~ handleTransferNFT ~ nftWriteProvider",n),y.preventDefault(),f(i))return l(3),d("Recipient address field is empty! Please retry!"),!1;l(1),d("Transferring NFT...");let F=a.getSigner(t);new S(O.rockstar,E.rockstar,F);var m=n["safeTransferFrom(address,address,uint256)"](t,i,e);const v=await m;console.debug(v),console.info("waiting for tx to finish"),d("Waiting for Transfer tx to finish..."),await a.waitForTransaction(v.hash),d("Transfer successfull! "),l(3)}},f=y=>y.trim().length==0;return o.jsxs(o.Fragment,{children:[o.jsx(G,{children:o.jsx(W,{padding:"10px 20px 20px",children:o.jsxs(M,{align:"flex-start",children:[o.jsx(pe,{textTransform:"uppercase",spacing:"normal",children:o.jsx(D,{weight:"200",children:"Transfer Your NFT!"})}),o.jsx(pe,{textTransform:"uppercase",spacing:"normal",children:o.jsxs(D,{bg:"#674c9f",color:"#fff",weight:"600",padding:"0px 8px",children:["Token #",e]})})]})})}),o.jsx(G,{children:o.jsx(W,{padding:"50px 0px 0px 0px",children:o.jsxs($t,{flex:"1",direction:"column",margin:"0px",justify:"center",size:"1.1rem",onSubmit:g,children:[o.jsxs(M,{margin:"-10px 20px 15px 20px",flex:"1",self:"stretch",align:"stretch",children:[o.jsx(we,{required:!0,placeholder:"Recipient Address",maxlength:"40",padding:"12px",borderBottom:"1px solid #000",weight:"400",size:"1.2em",bg:"#fff",value:i,onChange:y=>{s(y.target.value)}}),i.trim().length==0&&o.jsx(D,{padding:"4px 10px",right:"0px",top:"0px",pos:"absolute",color:"#fff",bg:"#000",size:"0.7rem",z:"1",children:"Recipient Address"})]}),o.jsx(M,{margin:"15px 0px 0px 0px",flex:"1",self:"stretch",align:"stretch",children:o.jsxs(Fe,{bg:"#674c9f",color:"#fff",flex:"1",radius:"0px",padding:"20px 10px",disabled:u==1,children:[u==1&&o.jsx(Q,{type:ee.SEAMLESS,spinnerSize:24,spinnerColor:"#fff"}),u!=1&&o.jsx(we,{cursor:"hand",textTransform:"uppercase",color:"#fff",weight:"400",size:"0.8em",spacing:"normal",type:"submit",value:"Transfer"})]})})]})})}),(u==1||u==3)&&o.jsx(G,{children:o.jsx(W,{padding:"0px 0px 0px 0px",children:o.jsx(M,{color:"#fff",bg:u==1?"#e1087f":"#000",padding:"10px 15px",margin:"15px 0px",children:o.jsx(D,{color:"#fff",textTransform:"uppercase",spacing:"normal",weight:"400",size:"1em",children:h})})})})]})}function aa({tokenId:e}){const{account:t,provider:a}=K(),[n,r]=p.useState(null),[i,s]=p.useState(""),[u,l]=p.useState(0),[h,d]=p.useState("");p.useEffect(()=>{if(a&&t){let y=a.getSigner(t);const m=new S(O.rockstarV2,E.rockstarV2,y);r(m)}},[t]);const g=async y=>{if(n){if(y.preventDefault(),f(i))return l(3),d("Recipient address field is empty! Please retry!"),!1;l(1),d("Transferring NFT...");let F=a.getSigner(t);new S(O.rockstarV2,E.rockstarV2,F);var m=n["safeTransferFrom(address,address,uint256)"](t,i,e);const v=await m;console.debug(v),console.info("waiting for tx to finish"),d("Waiting for Transfer tx to finish..."),await a.waitForTransaction(v.hash),d("Transfer successfull! "),l(3)}},f=y=>y.trim().length==0;return o.jsxs(o.Fragment,{children:[o.jsx(G,{children:o.jsx(W,{padding:"10px 20px 20px",children:o.jsxs(M,{align:"flex-start",children:[o.jsx(pe,{textTransform:"uppercase",spacing:"normal",children:o.jsx(D,{weight:"200",children:"Transfer Your NFT!"})}),o.jsx(pe,{textTransform:"uppercase",spacing:"normal",children:o.jsxs(D,{bg:"#674c9f",color:"#fff",weight:"600",padding:"0px 8px",children:["Token #",e]})})]})})}),o.jsx(G,{children:o.jsx(W,{padding:"50px 0px 0px 0px",children:o.jsxs($t,{flex:"1",direction:"column",margin:"0px",justify:"center",size:"1.1rem",onSubmit:g,children:[o.jsxs(M,{margin:"-10px 20px 15px 20px",flex:"1",self:"stretch",align:"stretch",children:[o.jsx(we,{required:!0,placeholder:"Recipient Address",maxlength:"40",padding:"12px",borderBottom:"1px solid #000",weight:"400",size:"1.2em",bg:"#fff",value:i,onChange:y=>{s(y.target.value)}}),i.trim().length==0&&o.jsx(D,{padding:"4px 10px",right:"0px",top:"0px",pos:"absolute",color:"#fff",bg:"#000",size:"0.7rem",z:"1",children:"Recipient Address"})]}),o.jsx(M,{margin:"15px 0px 0px 0px",flex:"1",self:"stretch",align:"stretch",children:o.jsxs(Fe,{bg:"#674c9f",color:"#fff",flex:"1",radius:"0px",padding:"20px 10px",disabled:u==1,children:[u==1&&o.jsx(Q,{type:ee.SEAMLESS,spinnerSize:24,spinnerColor:"#FFF"}),u!=1&&o.jsx(we,{cursor:"hand",textTransform:"uppercase",color:"#fff",weight:"400",size:"0.8em",spacing:"normal",type:"submit",value:"Transfer"})]})})]})})}),(u==1||u==3)&&o.jsx(G,{children:o.jsx(W,{padding:"0px 0px 0px 0px",children:o.jsx(M,{color:"#fff",bg:u==1?"#e1087f":"#000",padding:"10px 15px",margin:"15px 0px",children:o.jsx(D,{color:"#fff",textTransform:"uppercase",spacing:"normal",weight:"400",size:"1em",children:h})})})})]})}function oa(){ya.pageview("/rockstars");const{account:e}=K(),t=xa(),[a,n]=p.useState(null),[r,i]=p.useState(1),[s,u]=p.useState(2),[l,h]=p.useState([]),d=y=>{let m=[...l];m[y]=!m[y],h(m)};p.useEffect(()=>{g(2)},[e]);const g=y=>{u(y)},f=y=>{y.target.checked?i(0):i(1)};return o.jsx(ia,{children:o.jsxs(G,{children:[o.jsxs(W,{padding:"20px 0px",children:[o.jsxs(de,{alignSelf:"stretch",justifyContent:"flex-start",margin:"0 0 40px 0",children:[o.jsx(pe,{children:o.jsx(D,{weight:"400",size:"32px",color:t.color,children:"Rockstar of Push (EPNS)"})}),o.jsx(D,{color:t.default.secondaryColor,weight:"400",size:"16px",textTransform:"none",textAlign:"center",spacing:"normal",margin:"0px 0px",children:"Thank you community for all your support. Over the next year, we are excited to continue returning our gratitude!"})]}),o.jsx(M,{align:"stretch",justify:"flex-start",margin:"0px 20px 0px 20px",children:o.jsxs(M,{align:"stretch",margin:"0px 0px 20px 0px",children:[o.jsxs(Le,{children:[o.jsxs(xe,{onClick:()=>{d(1)},hover:"#e20880",children:[o.jsx(D,{color:t.color,children:"Does $ROCKSTAR of Push (EPNS) Vol 2 NFTs carry something along with NFTs?"}),o.jsx(Vt,{size:20,color:"#ddd"})]}),l[1]&&o.jsx(ge,{children:o.jsxs(D,{children:["Yes, Each ",o.jsx(Bt,{children:"$ROCKSTAR_V2"})," contains ",o.jsx(Bt,{children:"900 $PUSH"})," tokens that can be claimed instantly!!!"," ",o.jsx(ze,{href:"https://medium.com/ethereum-push-notification-service/push-token-economics-d7f566c29b1a",target:"_blank",title:"Read more about $PUSH tokeneconomics",children:"Learn about $PUSH Token Economics."})]})})]}),o.jsxs(Le,{children:[o.jsxs(xe,{onClick:()=>{d(2)},hover:"#e20880",children:[o.jsx(D,{color:t.color,children:"How to get $ROCKSTAR of Push (EPNS)?"}),o.jsx(Vt,{size:20,color:"#ddd"})]}),l[2]&&o.jsx(ge,{children:o.jsxs(D,{children:["We\u2019ll be distributing one NFT a week (every Monday) to one community member who does something to help us push the envelope forward."," ",o.jsx(ze,{href:"https://medium.com/push-protocol/announcing-volume-2-of-epns-rockstars-64f0b3246604",target:"_blank",title:"Read how to get $ROCKSTAR of Push (EPNS)",children:"Here are some ways by which you can get one!"})]})})]})]})})]}),o.jsx(W,{padding:"20px 0px",bg:"#eee",children:o.jsxs(M,{align:"flex-start",margin:"0px 20px 0px 20px",children:[o.jsxs(sa,{children:[o.jsx(Ne,{className:s===2?"v2":"v1",onClick:()=>{g(2)},children:o.jsx(Me,{children:"ROCKSTAR V2"})}),o.jsx(Ne,{className:s===1?"v2":"v1",onClick:()=>{g(1)},children:o.jsx(Me,{children:"ROCKSTAR V1"})}),o.jsxs(la,{children:[o.jsx("input",{type:"checkbox",className:"checkbox",onChange:f}),"Show mine"]})]}),r===0&&s===1&&o.jsx(ea,{controlAt:r,setControlAt:i,setTokenId:n}),r===0&&s===2&&o.jsx(na,{controlAt:r,setControlAt:i,setTokenId:n}),r===1&&s===1&&o.jsx($r,{controlAt:r,setControlAt:i,setTokenId:n}),r===1&&s===2&&o.jsx(Qr,{controlAt:r,setControlAt:i,setTokenId:n}),r===2&&a&&o.jsx(ra,{tokenId:a}),r===3&&a&&o.jsx(aa,{tokenId:a})]})})]})})}const ia=c(G)`
  align-items: center;
  align-self: center;
  background: ${e=>e.theme.default.bg};
  border-radius: ${U.ADJUSTMENTS.RADIUS.LARGE};
  box-shadow: ${U.ADJUSTMENTS.MODULE_BOX_SHADOW};
  display: flex;
  flex-direction: column;
  flex: initial;
  justify-content: center;
  max-width: 1200px;
  width: calc(
    100% - ${te.MINI_MODULES.DESKTOP.RIGHT} - ${te.MINI_MODULES.DESKTOP.LEFT} -
      ${U.ADJUSTMENTS.PADDING.BIG} - ${U.ADJUSTMENTS.PADDING.BIG}
  );
  position: relative;
  margin: ${U.ADJUSTMENTS.MARGIN.MINI_MODULES.DESKTOP};
  padding: ${U.ADJUSTMENTS.PADDING.BIG};

  @media ${Ft.laptop} {
    margin: ${U.ADJUSTMENTS.MARGIN.MINI_MODULES.TABLET};
    padding: ${U.ADJUSTMENTS.PADDING.DEFAULT};
    width: calc(
      100% - ${te.MINI_MODULES.TABLET.RIGHT} - ${te.MINI_MODULES.TABLET.LEFT} -
        ${U.ADJUSTMENTS.PADDING.DEFAULT} - ${U.ADJUSTMENTS.PADDING.DEFAULT}
    );
  }

  @media ${Ft.mobileM} {
    margin: ${U.ADJUSTMENTS.MARGIN.MINI_MODULES.MOBILE};
    padding: ${U.ADJUSTMENTS.PADDING.DEFAULT};
    width: calc(
      100% - ${te.MINI_MODULES.MOBILE.RIGHT} - ${te.MINI_MODULES.MOBILE.LEFT} -
        ${U.ADJUSTMENTS.PADDING.DEFAULT} - ${U.ADJUSTMENTS.PADDING.DEFAULT}
    );
  }
`,sa=c.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`,la=c.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  background-color: #adb5bd;
  height: 20px;
  padding: 0px 5px;
  color: white;
  input.checkbox {
    width: 11px;
    height: 11px;
    margin-right: 5px;
    border: 1px solid transparent;
    // -webkit-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    background-color: white;
    &:checked {
      background-color: #e10780;
      border: 1px solid transparent;
    }
  }
`;c.div`
  padding: 20px;
`,c.div`
  display: block;
  align-self: stretch;
  padding: 10px 20px;
  overflow-y: scroll;
  background: #fafafa;
`;const ca=c.button`
  border: 0;
  outline: 0;
  display: flex;
  align-items: left;
  // align-items: center;
  justify-content: flex-end;
  // justify-content: center;
  padding: 8px 15px;
  margin: 10px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    pointer: hand;
  }
  &:active {
    opacity: 0.75;
    cursor: pointer;
    pointer: hand;
  }
  ${e=>e.disabled&&X`
      &:hover {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
      &:active {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
    `}
`;c.button`
  border: 0;
  outline: 0;
  display: flex;
  align-items: left;
  // align-items: center;
  justify-content: flex-end;
  // justify-content: center;
  padding: 8px 15px;
  margin: 10px;
  color: #fff;
  // border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    pointer: hand;
  }
  &:active {
    opacity: 0.75;
    cursor: pointer;
    pointer: hand;
  }
  ${e=>e.disabled&&X`
      &:hover {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
      &:active {
        opacity: 1;
        cursor: default;
        pointer: default;
      }
    `}
`;let Ne,Me,xe,ge,Le,ze,Nt,Mt;Ne=c(ca)`
  &.v1 {
    background-color: #adb5bd;
  }
  &.v2 {
    background-color: #35c5f3;
  }
  border-radius: 0px;
  font-size: 1rem;
  letter-spacing: normal;
`,Me=c.span`
  ${e=>e.hideit&&X`
      visibility: hidden;
    `};
`,xe=c(Fe)`
  align-items: stretch;
  align-self: stretch;
`,ge=c(M)`
  align-items: stretch;
  align-self: stretch;
`,Le=c(M)`
  align-items: stretch;
  align-self: stretch;
  flex: auto;
  margin: 15px 0px;
  border: 1px solid ${e=>e.theme.default.border};
  border-radius: 10px;
  box-shadow: 0px 5px 20px -10px rgb(0 0 0 / 0.2);
  overflow: hidden;
  & ${xe} {
    background: ${e=>e.theme.qnaBg};
    justify-content: flex-start;
    text-transform: uppercase;
    & ${D} {
      font-weight: 400;
      letter-spacing: normal;
      margin-left: 10px;
      flex: 1;
    }
    &:hover {
      & ${D} {
        color: #fff;
      }
    }
  }
  & ${ge} {
    border: 1px solid ${e=>e.theme.default.border};
    border-top: 1px solid ${e=>e.theme.default.border};
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px 15px;
    margin: -1px;
    margin-top: 0px;
    align-items: flex-start;
    background: ${e=>e.theme.qnaBg};
    & ${D} {
      line-height: 1.5em;
      margin: 10px;
      color: ${e=>e.theme.default.color};
      font-size: 1.05em;
    }
  }
`,ze=c(ga)`
  color: #e20880;
  font-weight: 500;
`,Nt=()=>o.jsx(Mt,{children:o.jsx(oa,{})}),Mt=c(ma)`
  flex: 1;
  flex-direction: column;
  align-self: stretch;
  justify-content: flex-start;
`,Ht=Object.freeze(Object.defineProperty({__proto__:null,default:Nt},Symbol.toStringTag,{value:"Module"}))});export{Ht as N,wa as __tla,Ve as p,ne as u};
