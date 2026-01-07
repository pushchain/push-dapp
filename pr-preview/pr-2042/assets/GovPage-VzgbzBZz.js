import{ef as K,e9 as o,eU as l,eV as j,eW as X,e3 as we,eY as je,e4 as Me,dX as n,fz as Te,dV as Ae,fA as Ie,fv as W,fw as _,fu as be,d_ as e,eZ as q,e8 as x,e0 as O,e_ as Ne,eX as g,fB as A,fC as ye,fD as Ue,d$ as $e,ep as N,e6 as ve,f1 as Le,eh as _e,ec as Oe,ei as m,f3 as Pe,__tla as Ce}from"./index-DlNd6zJn.js";import{C as Ge,__tla as ze}from"./ContentLayout-CoCma8y4.js";import{E as Re,__tla as Be}from"./EPNSCoreHelper-C_wgq-ha.js";let Q,ke=Promise.all([(()=>{try{return Ce}catch{}})(),(()=>{try{return ze}catch{}})(),(()=>{try{return Be}catch{}})()]).then(async()=>{const i=new Array(4);function Z(t){for(let s=0;s<i.length;s++)i[s]=0;for(let s=0;s<t.length;s++)i[s%4]=(i[s%4]<<5)-i[s%4]+t.charCodeAt(s)}function E(){const t=i[0]^i[0]<<11;return i[0]=i[1],i[1]=i[2],i[2]=i[3],i[3]=i[3]^i[3]>>19^t^t>>8,(i[3]>>>0)/(1<<31>>>0)}function y(){const t=Math.floor(E()*360),s=`${E()*60+40}%`,r=`${(E()+E()+E()+E())*25+50}%`;return`hsl(${t},${s},${r})`}function ee(t){const s=t,r=t,p=Math.ceil(s/2),f=s-p,h=[];for(let w=0;w<r;w++){const u=[];for(let S=0;S<p;S++)u[S]=Math.floor(E()*2.3);const D=u.slice(0,f);D.reverse(),u.push(...D),h.push(...u)}return h}function te(t){const s={};return s.seed=t.seed||Math.floor(Math.random()*Math.pow(10,16)).toString(16),Z(s.seed),s.size=t.size||8,s.scale=t.scale||4,s.color=t.color||y(),s.bgcolor=t.bgcolor||y(),s.spotcolor=t.spotcolor||y(),s}function P(t,s){t=te(t||{});const r=ee(t.size),p=Math.sqrt(r.length);s.width=s.height=t.size*t.scale;const f=s.getContext("2d");f.fillStyle=t.bgcolor,f.fillRect(0,0,s.width,s.height),f.fillStyle=t.color;for(let h=0;h<r.length;h++)if(r[h]){const w=Math.floor(h/p),u=h%p;f.fillStyle=r[h]==1?t.color:t.spotcolor,f.fillRect(u*t.scale,w*t.scale,t.scale,t.scale)}return s}function se(t){const s=document.createElement("canvas");return P(t,s),s}const re={create:se,render:P};class ie extends K.Component{constructor(s){super(s)}getOpts(){return{seed:this.props.opts.seed||"foo",color:this.props.opts.color||"#dfe",bgcolor:this.props.opts.bgcolor||"#a71",size:this.props.opts.size||15,scale:this.props.opts.scale||3,spotcolor:this.props.opts.spotcolor||"#000"}}componentDidMount(){this.draw()}componentDidUpdate(s){this.props.seed!==s.seed&&this.draw()}draw(){re.render({seed:this.props.opts.seed,size:this.props.opts.size,scale:this.props.opts.scale},this.canvas)}render(){return K.createElement("canvas",{ref:s=>this.canvas=s})}}const ae=()=>{je.pageview("/governance");const t=Me(),{web3NameList:s}=n.useContext(Te),{account:r,provider:p,chainId:f}=Ae(),h=f===_e.coreContractChain,[w,u]=n.useState(!0),[D,S]=n.useState(!1),[a,le]=n.useState(null),[ce,de]=n.useState(null),[I,pe]=n.useState(null),[M,$]=n.useState(!1),[F,he]=n.useState(null),[v,xe]=n.useState(null),[b,fe]=n.useState("0x"),[V,H]=n.useState(null);Ie(r);const L=s[r];n.useEffect(()=>{if(!h){const d=window.location.origin;window.location.replace(`${d}/#/notavailable`)}}),n.useEffect(()=>{if(console.debug(r),p&&r){let d=p.getSigner(r);const c=new W(_.epnsToken,be.epnsToken,d);le(c)}},[r]),n.useEffect(()=>{a&&ue()},[a,r,p,I,ce]),n.useEffect(()=>{u(!1)},[r]);const ge=async d=>{try{const c=await Re.getVotingPower(d,a,!0);H(c)}catch(c){console.error("\u{1F680} ~ file: Delegate.tsx ~ line 86 ~ getVotingPower ~ err",c)}},ue=async()=>{let d=await(a==null?void 0:a.balanceOf(r)),c=await(a==null?void 0:a.decimals()),T=await Number(d/Math.pow(10,c)),De=T.toString(),Se=await(a==null?void 0:a.delegates(r)),me=await(a==null?void 0:a.getCurrentVotes(r)),Ee=(await Number(me/Math.pow(10,c))).toLocaleString();de(T),pe(De),he(Se),xe(Ee)},Y=async d=>{try{if(S(!0),!Oe(d)){m.dark("Invalid address!",{type:m.TYPE.ERROR}),S(!1);return}if(!p){m.dark("No provider found!",{type:m.TYPE.ERROR}),S(!1);return}const c=p.getSigner(r),T=await new W(_.delegateAddress,_.delegateABI,c).delegate(d);await T.wait(),console.log("\u2705 Transaction Mined:",T.hash),m.dark("Transaction Completed!",{type:m.TYPE.SUCCESS})}catch(c){console.error("Error in delegateAction:",c),m.dark(`Error: ${c.message||"Transaction failed"}`,{type:m.TYPE.ERROR})}finally{S(!1)}};return e.jsx(ne,{children:e.jsx(q,{alignItems:"stretch",children:e.jsxs(x,{align:"stretch",justify:"flex-start",margin:"0px 15px 15px 15px",children:[(w||!I||!v)&&e.jsx(x,{padding:"20px",children:e.jsx(O,{})}),e.jsx(q,{margin:"0px 0px 0px 0px",children:e.jsx(Ne,{children:e.jsx(g,{weight:"400",size:"32px",color:t.color,children:"Governance Dashboard"})})}),!w&&I&&v&&e.jsx(x,{margin:"10px 0px 0px 0px",self:"stretch",items:"stretch",children:e.jsxs(C,{align:"stretch",justify:"flex-start",self:"stretch",bg:t.default.secondaryBg,op:"1",children:[e.jsx(G,{bg:"#e20880",children:"Governance Dashboard"}),e.jsxs(z,{children:[e.jsxs(A,{align:"stretch",self:"stretch",children:[e.jsxs(x,{align:"center",self:"center",flex:"initial",padding:"10px",children:[e.jsx(B,{children:e.jsx(k,{children:e.jsx(ie,{seed:r.toLowerCase(),opts:{seed:r.toLowerCase(),size:10,scale:10}})})}),e.jsx(J,{children:L===null?e.jsx(O,{}):L?e.jsx(e.Fragment,{children:L}):e.jsx(e.Fragment,{children:ye(r,6)})})]}),e.jsxs(x,{align:"flex-start",self:"stretch",padding:"10px",size:"16px",children:[e.jsxs(A,{flex:"initial",padding:"5px",children:[e.jsxs(g,{weight:"500",padding:"0px 8px 0px 0px",color:t.color,children:["$PUSH Balance:"," "]}),e.jsx(U,{bg:"#e20880",color:"#fff",weight:"600",padding:"4px 8px",textTransform:"uppercase",children:I})]}),e.jsxs(A,{flex:"initial",padding:"5px",children:[e.jsxs(g,{weight:"500",padding:"0px 8px 0px 0px",color:t.color,children:["Voting Power:"," "]}),e.jsx(U,{bg:"#35c5f3",color:"#fff",weight:"600",padding:"4px 8px",textTransform:"uppercase",children:v})]}),F!=="0x0000000000000000000000000000000000000000"&&e.jsxs(A,{flex:"initial",padding:"5px",children:[e.jsx(g,{padding:"0px 8px 0px 0px",children:"Delegated To: "}),e.jsx(g,{weight:"600",children:F})]})]})]}),M&&e.jsx(x,{bg:"#eeeeeeee",position:"absolute",top:"0",bottom:"0",left:"0",right:"0",children:e.jsxs(x,{align:"stretch",self:"stretch",margin:"0px 20px 40px 20px",children:[e.jsx(g,{color:"#000",weight:"400",children:"Enter delegatee address"}),e.jsx("br",{}),e.jsx(Ue,{placeholder:"Enter delegatee address",radius:"4px",padding:"12px",self:"stretch",bg:"#fff",value:b,onChange:async d=>{fe(d.target.value),H(null)}}),V&&b&&e.jsxs(R,{children:["Voting Power: ",V]})]})}),e.jsx(x,{self:"stretch",align:"flex-end",children:e.jsx(A,{children:e.jsxs($e,{gap:"s2",display:"flex",flexDirection:"row",children:[!D&&e.jsx(N,{variant:"primary",size:"small",disabled:D,onClick:()=>{M?Y(b):$(!0)},children:e.jsx(g,{color:"#fff",weight:"400",children:"Delegate to Others"})}),!M&&!D&&e.jsx(N,{variant:"outline",size:"small",disabled:D,onClick:()=>{Y(r)},children:"Delegate to Myself"}),e.jsx(N,{variant:"tertiary",size:"small",onClick:()=>{M?ge(b):$(!0)},children:D?e.jsx(oe,{children:e.jsx(O,{})}):e.jsx(g,{color:"#fff",weight:"400",children:"Query Voting Power"})}),M&&e.jsx(N,{variant:"tertiary",size:"small",onClick:()=>{$(!1)},children:"Close"})]})})})]})]})})]})})})},ne=o(ve)`
  align-items: center;
  align-self: center;
  background: ${t=>t.theme.default.bg};
  border-radius: ${l.ADJUSTMENTS.RADIUS.LARGE};
  box-shadow: ${l.ADJUSTMENTS.MODULE_BOX_SHADOW};
  display: flex;
  flex-direction: column;
  flex: initial;
  justify-content: center;
  max-width: 1200px;
  width: calc(
    100% - ${j.MINI_MODULES.DESKTOP.RIGHT} - ${j.MINI_MODULES.DESKTOP.LEFT} -
      ${l.ADJUSTMENTS.PADDING.BIG} - ${l.ADJUSTMENTS.PADDING.BIG}
  );
  padding: ${l.ADJUSTMENTS.PADDING.BIG};
  position: relative;
  margin: ${l.ADJUSTMENTS.MARGIN.MINI_MODULES.DESKTOP};

  @media ${X.laptop} {
    margin: ${l.ADJUSTMENTS.MARGIN.MINI_MODULES.TABLET};
    padding: ${l.ADJUSTMENTS.PADDING.DEFAULT};
    width: calc(
      100% - ${j.MINI_MODULES.TABLET.RIGHT} - ${j.MINI_MODULES.TABLET.LEFT} -
        ${l.ADJUSTMENTS.PADDING.DEFAULT} - ${l.ADJUSTMENTS.PADDING.DEFAULT}
    );
  }

  @media ${X.mobileM} {
    margin: ${l.ADJUSTMENTS.MARGIN.MINI_MODULES.MOBILE};
    padding: ${l.ADJUSTMENTS.PADDING.DEFAULT};
    width: calc(
      100% - ${j.MINI_MODULES.MOBILE.RIGHT} - ${j.MINI_MODULES.MOBILE.LEFT} -
        ${l.ADJUSTMENTS.PADDING.DEFAULT} - ${l.ADJUSTMENTS.PADDING.DEFAULT}
    );
  }
`;o(Le)`
  align-items: stretch;
  align-self: stretch;
  background: #fff;
`;const oe=o.span`
  ${t=>t.hideit&&we`
      visibility: hidden;
    `};
`;o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 10px;
`,o.div`
  margin: 0px 10px;
`;let C,G,z,R,U,B,k,J;C=o(x)`
  overflow: hidden;
  min-width: 180px;

  border-radius: 12px;
  border: 1px solid ${t=>t.theme.default.border};

  &:hover {
    opacity: ${t=>t.op?"0.9":t.op};
  }
`,G=o(x)`
  flex: 0;
  align-self: stretch;
  color: #fff;
  top: 0px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: normal;
  font-size: 15px;
  text-align: center;
  padding: 10px 5px;
  right: 0;
  left: 0;
`,z=o(x)`
  padding: 20px 20px;
`,R=o.span`
  // font-weight: bold;
  font-size: 15px;
  letter-spacing: normal;
  align-items: left;
  margin-top: 10px;
`,U=o(g)`
  font-size: 14px;
`,B=o.div`
  position: relative;
  width: 96px;
  height: 96px;
  border-radius: 100%;
  overflow: hidden;
  transform: scale(0.85);
  outline-width: 2px;
  outline-color: rgba(225, 225, 225, 1);
`,k=o.div``,J=o.span`
  margin: 10px 10px;
  padding: 8px 15px;
  height: 16px;
  display: none;
  align-items: baseline;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  border-radius: 15px;
  background: #333;
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
`,Q=()=>e.jsx(Ge,{children:e.jsx(ae,{})}),o(Pe)`
  flex: 1;
  flex-direction: column;
  align-self: stretch;
`});export{ke as __tla,Q as default};
