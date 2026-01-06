var As=Object.defineProperty;var zs=(Se,fe,Pe)=>fe in Se?As(Se,fe,{enumerable:!0,configurable:!0,writable:!0,value:Pe}):Se[fe]=Pe;var ue=(Se,fe,Pe)=>zs(Se,typeof fe!="symbol"?fe+"":fe,Pe);import{ex as I,fw as l,eh as he,e9 as a,eZ as y,hc as N,d_ as e,f_ as Is,hd as vt,f3 as We,e$ as je,he as Ns,fU as T,fd as st,fV as Ce,dV as ke,dX as r,gd as ze,e4 as _e,fW as Ee,fZ as c,fq as re,eX as Ge,e0 as le,e1 as pe,fv as C,fu as k,gM as xe,gf as D,ge as Rt,ef as Ye,fD as Ds,fz as Ls,fc as $s,hf as it,hg as Vs,ep as ie,g3 as Bs,fy as Ut,fe as Je,ff as Ke,d$ as qe,fi as Mt,eU as de,fj as Ft,eW as Qe,hh as Re,eV as Ze,eY as Os,__tla as Hs}from"./index-D0laDxf9.js";import{n as ee,f as _,b as Ws,__tla as _s}from"./StakingHelper-DOET_xSG.js";import{C as Gs,__tla as Ys}from"./ContentLayout-BqNr-RjZ.js";let At,Js=Promise.all([(()=>{try{return Hs}catch{}})(),(()=>{try{return _s}catch{}})(),(()=>{try{return Ys}catch{}})()]).then(async()=>{const Se=I.from(1).mul(I.from(10).pow(I.from(18))),fe=3e4,Pe=35e3,at=t=>t.mul(I.from(10).pow(I.from(18))),ve=t=>t.div(I.from(10).pow(I.from(10))).toNumber()/1e8,ye=class ye{constructor(){ue(this,"state",{account:null,signer:null,staking:null,yieldFarmingPUSH:null,yieldFarmingLP:null,rewardForCurrentEpochPush:null,rewardForCurrentEpochLP:null,genesisEpochAmountPUSH:fe,deprecationPerEpochPUSH:100,genesisEpochAmountLP:Pe,deprecationPerEpochLP:100,uniswapV2Router02:null});ue(this,"init",(s,i,p,n,o,h)=>{this.state.account=s,this.state.pushToken=i,this.state.staking=p,this.state.yieldFarmingPUSH=n,this.state.yieldFarmingLP=o,this.state.uniswapV2Router02=h});ue(this,"getPoolStats",()=>new Promise(async(s,i)=>{const p=await this.state.yieldFarmingPUSH.getCurrentEpoch(),n=await this.state.uniswapV2Router02.getAmountsOut(Se.toString(),[l.pushToken,l.WETHAddress,l.USDTAddress]);let o;he.coreContractChain===42||he.coreContractChain===5?o=n[n.length-1].div(1e6).toNumber():o=n[n.length-1].toNumber()/1e6,console.debug("Push PRice",o);const h=ve(await this.state.pushToken.balanceOf(l.uniV2LPToken)),x=ve(await this.state.pushToken.attach(l.WETHAddress).balanceOf(l.uniV2LPToken)),d=await this.state.uniswapV2Router02.getAmountsOut(Se.toString(),[l.WETHAddress,l.USDTAddress]);let u;he.coreContractChain===42||he.coreContractChain===5?u=ve(d[d.length-1]):u=d[d.length-1].toNumber()/1e6,console.debug("Eth Price",u);const v=ve(await this.state.pushToken.attach(l.uniV2LPToken).totalSupply()),E=(h*o+x*u)/v/o;s({currentEpoch:p,lpToPushRatio:E})}));ue(this,"getPUSHPoolStats",async()=>new Promise(async(s,i)=>{const p=this.state.yieldFarmingPUSH;let n=await p.NR_OF_EPOCHS();const o=await p.getCurrentEpoch();n=n.toString()>o.toString()?o:n;const h=at(I.from(this.state.genesisEpochAmountPUSH)),x=at(I.from(this.state.deprecationPerEpochPUSH)),d=this.calcTotalAmountPerEpoch(h,n,x);this.state.rewardForCurrentEpochPush=d;const u=await p.getPoolSize(o.add(1));s({currentEpochPUSH:o,totalEpochPUSH:n,poolBalance:u})}));ue(this,"getLPPoolStats",async s=>new Promise(async(i,p)=>{const n=this.state.yieldFarmingLP;let o=await n.NR_OF_EPOCHS();const h=await n.getCurrentEpoch();o=o.toString()>h.toString()?h:o;const x=await n.getPoolSize(h.add(1));i({currentEpochPUSH:h,totalEpochPUSH:o,poolBalance:x})}));ue(this,"getUserData",async s=>new Promise(async(i,p)=>{if(this.state.account){const n=await s.getCurrentEpoch().then(W=>I.from(Math.min(W,100))),o=await s.getCurrentEpoch(),h=await s.getEpochStake(this.state.account,o.add(1)),x=(await s.lastEpochIdHarvested(this.state.account)).toNumber();let d=this.getAccumulatedReward(n,s),u=this.getTotalAvailableRewards(x,n,s),[v,E]=await Promise.all([d,u]);i({epochStakeNext:h,totalAccumulatedReward:v,totalAvailableReward:E})}}));ue(this,"getTotalAvailableRewards",async(s,i,p)=>{let n=[];for(var o=s+1;o<=i.toNumber();o++){const x=this.calculateUserEpochReward(o,p);n.push(x)}let h=(await Promise.all(n)).reduce((x,d)=>x+d,0);return h=h.toFixed(2),h});ue(this,"getAccumulatedReward",async(s,i)=>{let p=[];for(var n=0;n<=s.toNumber();n++){const h=this.calculateUserEpochReward(n,i);p.push(h)}let o=(await Promise.all(p)).reduce((h,x)=>h+x,0);return o=o.toFixed(2),o});ue(this,"calcTotalAmountPerEpoch",(s,i,p)=>s.sub(i.mul(p)));ue(this,"calculateUserEpochReward",async(s,i)=>{const p=ve(await i.getEpochStake(this.state.account,s)),n=ve(await i.getPoolSize(s));let o=0;if(n>0)if(i.address==l.yieldFarmLP){const h=this.state.genesisEpochAmountLP,x=this.state.deprecationPerEpochLP,d=h-x*s;o=p/n*d}else{const h=this.state.genesisEpochAmountPUSH,x=this.state.deprecationPerEpochPUSH,d=h-x*s;o=p/n*d}return o})}static getInstance(){return ye.instance||(ye.instance=new ye),ye.instance}};ue(ye,"instance",null);let be=ye;const J=t=>e.jsx(Is,{wrapperProps:{width:"100%",maxWidth:"none",minWidth:"auto",display:"flex",flex:"1",margin:t.margin?t.margin:"0"},placementProps:{background:"none",bottom:t.bottom?t.bottom:"25px",left:t.error?"40px":"0px"},tooltipContent:t.error?e.jsx(zt,{title:t.ToolTipTitle,width:t.ToolTipWidth}):e.jsx(It,{title:t.ToolTipTitle,body:t.ToolTipBody}),children:t.children}),zt=t=>e.jsx(y,{width:t.width,background:"#131313",justifyContent:"flex-start",border:"1px solid rgba(173, 176, 190, 0.2)",alignItems:"flex-start",padding:"0.75rem 0.75rem 0.75rem 1rem",boxShadow:"0px 4px 20px rgba(0, 0, 0, 0.05)",color:"#FFF",borderRadius:"2px 12px 12px 12px",children:e.jsx(N,{color:"inherit",children:t.title})}),It=({title:t,body:s})=>e.jsxs(Nt,{children:[e.jsx(Dt,{children:t}),e.jsxs(Lt,{children:[s,"  "," ",s.includes("Push Fee Pool APR")&&e.jsx(vt,{cursor:"pointer",href:"https://medium.com/push-protocol/new-push-yield-farming-rewards-full-details-4a9ff473226d",target:"_blank",children:"here"})]})]}),Nt=a(y)`
  box-sizing: border-box;
  width: 16rem;
  background: ${t=>t.theme.default.bg};
  justify-content: flex-start;
  border: 1px solid rgba(173, 176, 190, 0.2);
  align-items: flex-start;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius:1rem 1rem 1rem 0.125rem;

  @media (max-width:400px){
    width:16.75rem;
  }


`,Dt=a(N)`
  color: ${t=>t.theme.tooltipTopHeading};
  font-weight: 500;
  font-size: 0.75rem;
`,Lt=a(N)`
  color: ${t=>t.theme.tooltipTopSubHeading};
  font-weight: 300;
  font-size: 0.625rem;
  text-align:left;
`,ge="data:image/svg+xml,%3csvg%20width='17'%20height='17'%20viewBox='0%200%2017%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_15284_45077)'%3e%3cpath%20d='M8.5%2014.5C11.8137%2014.5%2014.5%2011.8137%2014.5%208.5C14.5%205.18629%2011.8137%202.5%208.5%202.5C5.18629%202.5%202.5%205.18629%202.5%208.5C2.5%2011.8137%205.18629%2014.5%208.5%2014.5Z'%20stroke='%23797D8F'%20stroke-width='1.2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8%208C8.13261%208%208.25979%208.05268%208.35355%208.14645C8.44732%208.24021%208.5%208.36739%208.5%208.5V11C8.5%2011.1326%208.55268%2011.2598%208.64645%2011.3536C8.74021%2011.4473%208.86739%2011.5%209%2011.5'%20stroke='%23797D8F'%20stroke-width='1.2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.25%206.5C8.66421%206.5%209%206.16421%209%205.75C9%205.33579%208.66421%205%208.25%205C7.83579%205%207.5%205.33579%207.5%205.75C7.5%206.16421%207.83579%206.5%208.25%206.5Z'%20fill='%23797D8F'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15284_45077'%3e%3crect%20width='16'%20height='16'%20fill='white'%20transform='translate(0.5%200.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",ot=({poolName:t,userData:s,PoolStats:i,poolAddress:p,getUserData:n,tokenAddress:o,setActiveTab:h})=>{const{account:x,provider:d,wallet:u,isWalletConnected:v,connect:E}=ke(),[W,B]=r.useState(!1),[L,$]=r.useState(!1),[G,O]=r.useState(!1),[X,U]=r.useState(null),[ae,Y]=r.useState(null),[H,P]=r.useState(null),[V,M]=r.useState(0),w=ze(),R=_e(),K=async()=>{if(!v){E();return}if(!L){if((s==null?void 0:s.totalAvailableReward)==0){P("No Rewards to Claim"),$(!1);return}$(!0);var m=d.getSigner(x);new C(p,k.yieldFarming,m).massHarvest().then(async g=>{w.showLoaderToast({loaderMessage:"Waiting for Confirmation..."});try{await d.waitForTransaction(g.hash),w.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!",toastType:"SUCCESS",getToastIcon:b=>e.jsx(xe,{size:b,color:"green"})}),n(),$(!1)}catch(b){w.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Failed! (" +${b.name}+ ")`,toastType:"ERROR",getToastIcon:j=>e.jsx(D,{size:j,color:"red"})}),$(!1)}}).catch(g=>{w.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Cancelled!",toastType:"ERROR",getToastIcon:b=>e.jsx(D,{size:b,color:"red"})}),$(!1)})}},me=async()=>{if(!v){E();return}if(W)return;B(!0);const m=_(s.epochStakeNext);if(m==0){Y("Nothing to unstake, Stake Now in new reward program."),B(!1);return}var g=d.getSigner(x);let b=new C(l.staking,k.staking,g);await b.balanceOf(x,o),b.withdraw(o,I.from(m).mul(I.from(10).pow(18))).then(async j=>{w.showLoaderToast({loaderMessage:"Waiting for Confirmation..."});try{await d.waitForTransaction(j.hash),w.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!",toastType:"SUCCESS",getToastIcon:f=>e.jsx(xe,{size:f,color:"green"})}),B(!1),n()}catch(f){console.error("Error",f),w.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Failed! (" +${f.name}+ ")`,toastType:"ERROR",getToastIcon:A=>e.jsx(D,{size:A,color:"red"})}),B(!1)}}).catch(j=>{w.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Cancelled! ${j.message}`,toastType:"ERROR",getToastIcon:f=>e.jsx(D,{size:f,color:"red"})}),B(!1)})},F=async()=>{if(!v){E();return}if(G)return;let m=3;const g=_(s.epochStakeNext);if(g==0){w.showMessageToast({toastTitle:"Error",toastMessage:"Nothing to Withdraw!",toastType:"ERROR",getToastIcon:Q=>e.jsx(D,{size:Q,color:"red"})}),O(!1),U(null);return}var b=d.getSigner(x);let j=new C(l.staking,k.staking,b);const f=o===l.pushToken?l.pushCoreV2:l.stakingV2;var A=new C(o,k.pushToken,b);let z=await A.allowance(x,f),te=_(z);parseInt(te)>=parseInt(g)?(m=2,M(50)):(m=3,M(33)),O(!0),U(`Withdrawing 1/${m}`);let se;se=j.withdraw(o,I.from(g).mul(I.from(10).pow(18))),se.then(async Q=>{if(w.showLoaderToast({loaderMessage:"Withdrawing! Please Wait..."}),await d.waitForTransaction(Q.hash),w.showMessageToast({toastTitle:"Success",toastMessage:"Successfully withdrawn!",toastType:"SUCCESS",getToastIcon:ce=>e.jsx(xe,{size:ce,color:"green"})}),o===l.pushToken){var q=new C(o,k.pushToken,b);let ce=await q.allowance(x,l.pushCoreV2),oe=_(ce);parseInt(oe)>=parseInt(g)?we(Q,g,m):(Q=q.approve(l.pushCoreV2,I.from(g).mul(I.from(10).pow(18))),U(`Approving 2/${m}`),M(66),Q.then(async ne=>{w.showLoaderToast({loaderMessage:"Approving! Please Wait..."}),await d.waitForTransaction(ne.hash),w.showMessageToast({toastTitle:"Success",toastMessage:"Successfully Approved!",toastType:"SUCCESS",getToastIcon:Te=>e.jsx(xe,{size:Te,color:"green"})}),we(ne,g,m)}).catch(ne=>{console.error("Error in approving 2",ne),w.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Failed! Could Not Approve",toastType:"ERROR",getToastIcon:Te=>e.jsx(D,{size:Te,color:"red"})}),O(!1),U(null),n(),M(0)}))}else{var q=new C(o,k.pushToken,b);let oe=await q.allowance(x,l.stakingV2),ne=_(oe);parseInt(ne)>=parseInt(g)?Z(Q,g,m):(Q=q.approve(l.stakingV2,I.from(g).mul(I.from(10).pow(18))),U(`Approving 2/${m}`),M(66),Q.then(async Te=>{w.showLoaderToast({loaderMessage:"Approving! Please Wait..."}),await d.waitForTransaction(Te.hash),w.showMessageToast({toastTitle:"Success",toastMessage:"Successfully Approved!",toastType:"SUCCESS",getToastIcon:tt=>e.jsx(xe,{size:tt,color:"green"})}),Z(Te,g,m)}).catch(Te=>{console.error("Error in approving",Te),w.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Failed! Could Not Approve",toastType:"ERROR",getToastIcon:tt=>e.jsx(D,{size:tt,color:"red"})}),O(!1),U(null),n(),M(0)}))}}).catch(Q=>{console.error("Error in withdrawing: ",Q),w.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Failed! Could Not Withdraw!",toastType:"ERROR",getToastIcon:q=>e.jsx(D,{size:q,color:"red"})}),O(!1),U(null),M(0)})},Z=async(m,g,b)=>{if(!v){E();return}var j=d.getSigner(x),f=new C(l.stakingV2,k.stakingV2,j);U(`Staking ${b}/${b}`),M(100),m=f.deposit(o,I.from(g).mul(I.from(10).pow(18))),m.then(async A=>{w.showLoaderToast({loaderMessage:"Depositing to V2 ! Please Wait..."}),await d.waitForTransaction(A.hash),w.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!Successfully Deposited the UNI-V2 Token to V2 ",toastType:"SUCCESS",getToastIcon:z=>e.jsx(xe,{size:z,color:"green"})}),O(!1),n(),U(null),h(0)}).catch(A=>{console.error("Error in depositing: ",A),w.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Failed! Could Not Deposit the Amount",toastType:"ERROR",getToastIcon:z=>e.jsx(D,{size:z,color:"red"})}),O(!1),n(),U(null),M(0)})},we=async(m,g,b)=>{if(!v){E();return}var j=d.getSigner(x);let f=new C(l.pushCoreV2,k.pushCoreV2,j);U(`Staking ${b}/${b}`),M(100),m=f.stake(I.from(g).mul(I.from(10).pow(18))),m.then(async A=>{w.showLoaderToast({loaderMessage:"Depositing to V2 ! Please Wait..."}),await d.waitForTransaction(A.hash),w.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed! Successfully Deposited the Push Token to V2 ",toastType:"SUCCESS",getToastIcon:z=>e.jsx(xe,{size:z,color:"green"})}),O(!1),n(),U(null),h(0)}).catch(A=>{console.error("Error in depositing: ",A),w.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Failed! Could Not Deposit Push Token",toastType:"ERROR",getToastIcon:z=>e.jsx(D,{size:z,color:"red"})}),O(!1),n(),U(null),M(0)})};r.useEffect(()=>{P(null),Y(null)},[x]);const S=Ee(600);return e.jsxs($t,{margin:t==="UNI-V2"?" 10px 0 10px 10px ":"  10px 10px 10px 0",children:[e.jsx(y,{margin:"0px 0px 20px 0",children:i?e.jsxs(e.Fragment,{children:[e.jsxs(Vt,{children:[t==="UNI-V2"?"Uniswap V2 Staking Pool":"PUSH Staking Pool ",e.jsx(Bt,{children:"Deprecated"})]}),e.jsxs(Xe,{children:["Current APR"," ",e.jsx(je,{color:"#D53A94",fontWeight:"600",children:"0%"})]})]}):e.jsxs(Me,{padding:"15px 15px 0 15px",children:[e.jsx(c,{height:"15px",width:"234px",margin:"0 0 10px 0"}),e.jsx(c,{height:"15px",width:"112px"})]})}),e.jsxs(y,{children:[e.jsxs(Wt,{border:`1px solid ${R.stakingBorder}`,borderRadius:"16px",children:[e.jsx(y,{margin:S?"0px 6px 0 0 ":"0px 18px 0px 0px",padding:S?" 7px":"10px",children:i?e.jsxs(e.Fragment,{children:[e.jsx(Xe,{children:"Current Reward"}),e.jsx(N,{fontSize:S?"18px":"24px",fontWeight:"600",color:"#D53A94",letterSpacing:"normal",children:"0 PUSH"})]}):e.jsxs(Me,{padding:S?"0px":"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:S?"100px":"135px",margin:"0 0 8px 0"}),e.jsx(c,{height:"12px",width:S?"65px":"100px}"})]})}),e.jsx(Ot,{width:"10px",height:"100%"}),e.jsx(y,{margin:S?"0px 6px 0 0 ":"0px 18px 0px 0px",padding:S?" 7px":"10px",children:i?e.jsxs(e.Fragment,{children:[e.jsx(Xe,{children:"Total Staked"}),e.jsxs(Ht,{fontSize:S?"18px":"24px",fontWeight:"600",letterSpacing:"normal",children:[ee(_(i==null?void 0:i.poolBalance))," ",t=="UNI-V2"?"UNI-V2":"PUSH"]})]}):e.jsxs(Me,{padding:S?"0px":"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:S?"100px":"135px",margin:"0 0 8px 0"}),e.jsx(c,{height:"12px",width:S?"65px":"100px}"})]})})]}),e.jsx(T,{alignSelf:"end",margin:"12px 13px 24px 0px",color:"#575D73",letterSpacing:"normal",children:i?e.jsxs(e.Fragment,{children:[e.jsx(nt,{padding:"0px 5px 0px 0px",children:"Current Epoch"}),e.jsx(nt,{margin:"0 0 0 5px",children:"100 / 100"})]}):e.jsx(Me,{padding:"6px 0px 0 15px",children:e.jsx(c,{height:"17px",width:"124px"})})}),e.jsx(_t,{children:s?e.jsxs(y,{children:[e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Ie,{children:["User Deposit",e.jsx(Ne,{children:e.jsx(J,{ToolTipTitle:"User Deposited",ToolTipBody:`Amount of ${t} Token User Staked`,children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(De,{children:[" ",_(s==null?void 0:s.epochStakeNext)," ",t=="UNI-V2"?"UNI-V2":"PUSH"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Ie,{children:["Rewards Claimed",e.jsx(Ne,{children:e.jsx(J,{ToolTipTitle:"Rewards Claimed",ToolTipBody:"Amount of Push Claimed by User",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(De,{children:[" ",ee(((s==null?void 0:s.totalAccumulatedReward)-(s==null?void 0:s.totalAvailableReward)).toFixed(2))," ","PUSH"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Ie,{children:["Current Epoch Reward",e.jsx(Ne,{children:e.jsx(J,{ToolTipTitle:"Current Epoch Reward",ToolTipBody:"Displays the approximate latest reward amount for current epoch",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsx(De,{children:"0 PUSH"})]}),e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Ie,{children:["Available for Claiming",e.jsx(Ne,{children:e.jsx(J,{ToolTipTitle:"Available for Claiming",ToolTipBody:"Amount of Push Token Available to claim",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(De,{children:[ee(s==null?void 0:s.totalAvailableReward)," PUSH"]})]})]}):e.jsxs(Ce,{padding:"16px 15px 16px 15px",width:"100%",maxWidth:" -webkit-fill-available",borderRadius:"5px",children:[e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]})]})})]}),e.jsx(Gt,{padding:S?"0px ":"0px 14px",margin:"24px 0px 0px 0px",children:s?e.jsxs(e.Fragment,{children:[e.jsx(rt,{children:_(s==null?void 0:s.epochStakeNext)==="0"?e.jsx(J,{error:!0,ToolTipTitle:"Nothing to Withdraw, so you cannot Migrate.",ToolTipWidth:"16rem",bottom:"-50px",margin:"0 0 15px 0",children:e.jsx(Ue,{border:"none",cursor:"default",background:R.disableButtonBg,color:R.disabledButtonText,children:e.jsx(lt,{children:!G&&X==null&&e.jsxs(Ge,{color:R.disabledButtonText,weight:"400",cursor:"default",children:["Migrate to ",t==="UNI-V2"?"UNI-V2 ":"PUSH Fee"," Pool"]})})})}):e.jsxs(Yt,{onClick:F,children:[e.jsx(Jt,{style:{width:`${V}%`}}),e.jsxs(lt,{children:[!G&&X==null&&e.jsxs(Ge,{color:"#FFF",weight:"400",cursor:"pointer",children:["Migrate to ",t==="UNI-V2"?"UNI-V2 ":"PUSH Fee"," Pool"]}),G&&X!=null&&e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:"#FFF",title:X,titleColor:"#FFF"})]})]})}),e.jsxs(rt,{children:[_(s==null?void 0:s.epochStakeNext)==="0"?e.jsx(J,{error:!0,ToolTipTitle:ae||"Nothing to unstake, Stake First",ToolTipWidth:"16rem",margin:"0 10px 0 0",bottom:"-30px",children:e.jsx(Ue,{border:"none",cursor:"default",background:R.disableButtonBg,color:R.disabledButtonText,children:W?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:R.activeButtonText,title:"Claiming",titleColor:R.activeButtonText}):` Unstake ${t}`})}):e.jsx(Ue,{border:`1px solid ${R.activeButtonText}`,background:"transparent",color:R.activeButtonText,cursor:"pointer",margin:"0 10px 0 0",onClick:me,children:W?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:R.activeButtonText,title:"Unstaking",titleColor:R.activeButtonText}):` Unstake ${t}`}),(s==null?void 0:s.totalAvailableReward)==="0.00"?e.jsx(J,{bottom:"-30px",ToolTipTitle:"No Rewards to Claim",error:!0,ToolTipWidth:"10rem",children:e.jsx(Ue,{border:"none",cursor:"default",background:R.disableButtonBg,color:R.disabledButtonText,children:L?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:R.activeButtonText,title:"Claiming",titleColor:R.activeButtonText}):" Claim Rewards"})}):e.jsx(Ue,{border:`1px solid ${R.activeButtonText}`,background:"transparent",color:R.activeButtonText,cursor:"pointer",onClick:K,children:L?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:R.activeButtonText,title:"Claiming",titleColor:R.activeButtonText}):"Claim Rewards"})]})]}):e.jsxs(Me,{width:"100%",children:[e.jsx(c,{height:"49px",width:"100%",margin:"0 0 11px 0"}),e.jsx(c,{height:"49px",width:"100%"})]})})]})},$t=a(We)`
  border: 1px solid ${t=>t.theme.stakingBorder};
  border-radius: 24px;
  padding: 24px 19px;
  font-family: 'FK Grotesk Neu';
  font-style: normal;
  font-weight: 500;
  // min-height: 587px;
  color: ${t=>t.theme.stakingPrimaryText};
`,Vt=a(N)`
  font-size: 24px;
  line-height: 141%;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  color: ${t=>t.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 20px;
  }

  @media (max-width: 470px) {
    flex-direction: column;
  }
`,Bt=a(je)`
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #d53a94;
  margin-left: 10px;
  padding: 2px 6px;
  background: #f3d7fa;
  border-radius: 6px;
  height: 17px;
`,Xe=a.p`
  margin: 0px;
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,Ot=a.div`
  width: 1px;
  height: 100%;
  background: ${t=>t.theme.stakingBorder};
`,Ie=a.div`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${t=>t.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,Ht=a(N)`
  color: ${t=>t.theme.stakingSecondaryText};
`,nt=a(Ns)`
  font-weight: 600;
  text-align: right;
  letter-spacing: normal;
  font-size: 16px;
  margin-left: 5px;
  line-height: 141%;
  color: ${t=>t.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,Ne=a(je)`
  margin: 0px 0px 0px 6px;
  cursor: pointer;
`,Wt=a(T)`
  max-height: 108px;
  min-height: 108px;
  @media (min-width: 600px) and (max-width: 992px) {
    margin: 0px 13px;
  }
`,De=a(N)`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  color: ${t=>t.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,_t=a(y)`
  min-height: 150px;
`,Gt=a(y)`
  // min-height:132px;
`,rt=a.div`
  display: flex;
  width: 100%;
  // margin:15px 0px 0px 0px;
`;a(st)`
  width: 100%;
  background: #d53a94;
  border: 1px solid #d53a94;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  line-height: 141%;
  flex-direction: row;
  letter-spacing: normal;
  color: #ffffff;
  cursor: pointer;
  & > div {
    display: block;
  }
`;const Yt=a(st)`
  width: 100%;
  background: #d53a94;
  border: 1px solid #d53a94;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  line-height: 141%;
  flex-direction: row;
  letter-spacing: normal;
  color: #ffffff;
  cursor: pointer;
  justify-content: flex-start;
  margin: 0px 0px 15px 0px;
  min-height: 49px;
  position: relative;

  &:after {
    background: transparent;
  }

  & > div {
    display: block;
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,Jt=a.div`
  min-height: 37px;
  background-color: rgb(183, 46, 126);
  transition: width 0.5s ease 0s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`,lt=a.div`
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #eee;
`,Ue=a(st)`
  font-size: 16px;
  line-height: 19px;
  flex-direction: row;
  flex: 1;
  // width: 145px;
  height: 49px;
  padding: 12px;
  border-radius: 8px;
  & > div {
    display: block;
  }
  &:after {
    background: transparent;
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,Me=a(Ce)`
  // width:150px;
  max-width: -webkit-fill-available;
  border-radius: 5px;
  gap: 5px;
`,pt=({logo:t,title:s,body:i,setActiveTab:p})=>{const n=Ee(600);return e.jsxs(T,{style:{color:t==="announcement"?"white":"#333"},justifyContent:"stretch",padding:n?"12px":"16px",background:t==="announcement"?"linear-gradient(90deg, #121315 -2.55%, #2A2A39 32.62%, #8E317A 68.34%, #121315 102.97%)":"#FFF7DA",borderRadius:"16px",children:[e.jsx(re,{width:t==="announcement"?"60px":"32px",height:t==="announcement"?"60px":"32px",src:Rt(`svg/${t}.svg`),alt:"Announcement Logo"}),e.jsxs(y,{margin:t==="announcement"?"0 0 0 16px":"0 0 0 13px",justifyContent:"center",alignItems:"flex-start",gap:t==="announcement"?"4px":"0px",children:[e.jsx(N,{color:"inherit",fontSize:n?"20px":"24px",textAlign:"left",fontWeight:500,children:s}),e.jsxs(N,{color:"inherit",fontSize:n?"12px":"16px",textAlign:"left",fontWeight:500,children:[i," ",s.includes("New V2")&&e.jsxs(e.Fragment,{children:[e.jsx(Kt,{onClick:()=>p(1),children:"here"})," to migrate."]})]})]})]})},Kt=a(vt)`
  cursor: pointer;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`;he.coreContractChain;const qt=({setActiveTab:t})=>{const{account:s,provider:i}=ke(),[p,n]=r.useState(null),[o,h]=r.useState(null),[x,d]=r.useState(null),[u,v]=r.useState(null),[E,W]=r.useState(null),[B,L]=r.useState(null),[$,G]=r.useState(null),[O,X]=r.useState(null),[U,ae]=r.useState(null),[Y,H]=r.useState(null),P=i==null?void 0:i.getSigner(s),V=r.useCallback(async()=>{const F=await be.getInstance().getPoolStats();L({...F})},[p,o,x,u,E]),M=r.useCallback(async()=>{const F=await be.getInstance().getPUSHPoolStats();G({...F})},[p,o,x,u,E]),w=r.useCallback(async F=>{const Z=await be.getInstance().getLPPoolStats(F);X({...Z})},[p,o,x,u,E]),R=r.useCallback(async()=>{const F=await be.getInstance().getUserData(u);ae({...F})},[u]),K=r.useCallback(async()=>{const F=await be.getInstance().getUserData(x);H({...F})},[x]);r.useEffect(()=>{let F=new C(l.pushToken,k.pushToken,P),Z=new C(l.staking,k.staking,P),we=new C(l.depYieldFarmPUSH,k.yieldFarming,P),S=new C(l.depYieldFarmLP,k.yieldFarming,P),m=new C(l.uniswapV2Router02,k.uniswapV2Router02,P);if(n(F),h(Z),v(we),d(S),W(m),P&&s){var g=i.getSigner(s);let b=new C(l.pushToken,k.pushToken,g),j=new C(l.staking,k.staking,g),f=new C(l.depYieldFarmPUSH,k.yieldFarming,g),A=new C(l.depYieldFarmLP,k.yieldFarming,g),z=new C(l.uniswapV2Router02,k.uniswapV2Router02,g);n(b),h(j),v(f),d(A),W(z)}},[s]),r.useEffect(()=>{p!=null&&o!=null&&u!=null&&(be.getInstance().init(s,p,o,u,x,E),V())},[V]),r.useEffect(()=>{B&&me(B)},[B]);const me=async F=>{M(),w(F),R(),K()};return e.jsxs(e.Fragment,{children:[e.jsx(pt,{logo:"WarningCircle",title:"This reward program (V1) has ended.",body:"To continue earning rewards please migrate to new pools.",setActiveTab:t}),e.jsxs(Qt,{children:[e.jsx(ot,{poolName:"PUSH",userData:U,PoolStats:$,poolAddress:l.depYieldFarmPUSH,getUserData:R,getPoolStats:M,tokenAddress:l.pushToken,setActiveTab:t}),e.jsx(ot,{poolName:"UNI-V2",userData:Y,PoolStats:O,poolAddress:l.depYieldFarmLP,getUserData:K,getPoolStats:w,tokenAddress:l.uniV2LPToken,setActiveTab:t})]})]})},Qt=a(T)`
  @media (max-width: 1300px) {
    margin: auto;
    width: 75%;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
  }
`,Zt=({poolStats:t})=>{function s(p){return p==null?void 0:p.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}const i=Ee(600);return e.jsx(Xt,{justifyContent:"stretch",children:t?e.jsxs(e.Fragment,{children:[e.jsx(xt,{fontSize:i?"16px":"18px",textAlign:"left",fontWeight:600,children:"Push Price"}),e.jsxs(T,{gap:"5px",justifyContent:"flex-end",children:[e.jsxs(xt,{fontSize:i?"18px ":"24px",textAlign:"left",fontWeight:600,children:["$",s(t==null?void 0:t.pushPrice.toFixed(2))]}),e.jsx(re,{width:"25px",height:i?"20px":"27px",src:Rt("svg/uniswapLogo.svg"),alt:"Uniswap Logo"})]})]}):e.jsxs(es,{children:[e.jsx(c,{height:"12px",width:"135px",margin:"10px 0 10px 0"}),e.jsx(c,{height:"12px",width:"135px",margin:"10px 0 10px 0"})]})})},Xt=a(T)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;

  border: 1px solid #bac4d6;
  border-color: ${t=>t.theme.default.borderColor};
  border-radius: 14px;

  @media (max-width: 600px) {
    padding: 7px 14px;
  }
`,xt=a(N)`
  color: ${t=>t.theme.stakingPrimaryText};
`,es=a(Ce)`
  // width:150px;
  z-index: 1;
  align-items: baseline;
  max-width: -webkit-fill-available;
  border-radius: 5px;
  gap: 5px;
  flex-direction: row;
  justify-content: inherit;
  flex: 1;
`,ts=({getLpPoolStats:t,poolStats:s,setPoolStats:i})=>{const[p,n]=Ye.useState(""),[o,h]=Ye.useState(),x=()=>{const u=s.epochEndTime,v=new Date().getTime()+u*1e3;h(v)};Ye.useEffect(()=>{s&&x()},[s]);const d=()=>{if(s!=null&&s.epochEndTimestamp){s.epochEndTimestamp.toNumber();const u=new Date().getTime(),v=o-u;v<0&&(i(null),t());const E=Math.floor(v/(1e3*60*60*24)),W=Math.floor(v%(1e3*60*60*24)/(1e3*60*60)),B=Math.floor(v%(1e3*60*60)/(1e3*60)),L=Math.floor(v%(1e3*60)/1e3);n(`${E}D ${W}H ${B}M ${L}S`)}};return Ye.useEffect(()=>{const u=setTimeout(()=>{d()},1e3);return()=>clearTimeout(u)}),e.jsxs(ss,{children:[e.jsxs(ct,{alignItems:"baseline",justifyContent:"center",background:"linear-gradient(0deg, #7ADDB3, #7ADDB3), #FFFFFF",children:[e.jsx(ht,{background:"radial-gradient(70% 90% at 40% 16.25%, #7CDCB4 2.6%, #7ADDB3 53.65%, #E888F8 85.42%, #F99DEA 100%)"}),s?e.jsx(e.Fragment,{children:e.jsxs(wt,{children:[e.jsx(gt,{children:"Total Value Locked"}),e.jsx(ut,{children:`$ ${ee(s==null?void 0:s.totalValueLocked.toFixed(2))}`})]})}):e.jsx(dt,{})]}),e.jsxs(ct,{alignItems:"baseline",justifyContent:"center",background:"#F58DF8",children:[e.jsx(ht,{background:"radial-gradient(70% 90% at 40% 16.25%, #F58DF8 2.6%, #F47EF8 53.65%, #A17DEF 85.42%, #AE68F4 100%)"}),s?e.jsx(e.Fragment,{children:e.jsxs(wt,{children:[e.jsx(gt,{children:"Push Rewards Given"}),e.jsxs(mt,{justifyContent:"end",children:[e.jsx(ut,{children:ee(Math.min(_(s==null?void 0:s.pushRewardsDistributed),_(s==null?void 0:s.totalDistributedAmount)))}),e.jsxs(je,{color:"#fff",fontSize:"16px",fontWeight:"600",lineHeight:"141%",children:["out of ",ee(_(s==null?void 0:s.totalDistributedAmount))]})]})]})}):e.jsx(dt,{})]})]})},dt=()=>{const t=Ee(1300);return e.jsxs(is,{padding:"21px 15px",children:[e.jsx(c,{height:"12px",width:"135px",margin:"0 0 10px 0",background:"linear-gradient(to right,rgb(255 255 255 / 21%) 8%,rgb(221 221 221 / 15%) 18%,rgb(255 255 255 / 29%) 33%)"}),e.jsx(c,{height:"26px;",width:t?"175px":"189px",margin:"0 0 10px 0",background:"linear-gradient(to right,rgb(255 255 255 / 21%) 8%,rgb(221 221 221 / 15%) 18%,rgb(255 255 255 / 29%) 33%)"}),e.jsx(c,{height:"12px",width:"135px",margin:"0 0 10px 0",background:"linear-gradient(to right,rgb(255 255 255 / 21%) 8%,rgb(221 221 221 / 15%) 18%,rgb(255 255 255 / 29%) 33%)"})]})},ss=a(T)`
  column-gap: 12px;

  @media (max-width: 992px) {
    flex-direction: column;
    row-gap: 12px;
  }
`,ct=a(y)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
`,ht=a(y)`
  position: absolute;
  width: 170px;
  height: 170px;
  right: 5px;
  top: -35px;
  border-radius: 50%;

  box-shadow: 0px 30px 50px rgba(240, 86, 254, 0.5);
  filter: blur(2.5px);
`,gt=a(je)`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 141%;

  @media (max-width: 600px) {
    font-size: 16px;
  }

  @media (min-width: 992px) and (max-width: 1150px) {
    font-size: 14px;
  }

  @media (min-width: 1150px) and (max-width: 1300px) {
    font-size: 16px;
  }
`,ut=a(je)`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  line-height: 141%;

  @media (max-width: 992px) {
    font-size: 24px;
  }

  @media (min-width: 992px) and (max-width: 1150px) {
    font-size: 18px;
  }

  @media (min-width: 1150px) and (max-width: 1300px) {
    font-size: 24px;
  }
`,mt=a(y)`
  align-items: flex-start;
`,wt=a(mt)`
  padding: 20px 10px 20px 15px;
  // gap: 8px;
  justify-content: center;
`,is=a(Ce)`
  // width:150px;
  z-index: 1;
  align-items: baseline;
  justify-content: center;
  max-width: -webkit-fill-available;
  border-radius: 5px;
  gap: 5px;
`,Tt=({onClose:t,InnerComponentProps:s,toastObject:i})=>{const{title:p,getUserData:n,getPoolStats:o,setUnstakeErrorMessage:h,setWithdrawErrorMessage:x}=s,{account:d,provider:u,isWalletConnected:v,connect:E}=ke(),[W,B]=r.useState(0),[L,$]=r.useState(0),[G,O]=r.useState(!1),[X,U]=r.useState(!1),[ae,Y]=r.useState(!1);r.useState(null),r.useContext(Ls);const[H,P]=r.useState(0),V=()=>{h(null),x(null),t()},M=_e(),w=r.useRef(null);$s(w,()=>V());const R=async()=>{var m=u.getSigner(d);const g=p==="Uni-V2"?l.uniV2LPToken:l.pushToken,b=new C(g,k.uniV2LpToken,m);let j=Ws(await b.balanceOf(d));B(parseInt(j.toString().replace(/\D/,""))||0)},K=async()=>{U(!0);var m=u.getSigner(d);let g;p==="Uni-V2"?g=await new C(l.uniV2LPToken,k.uniV2LpToken,m).allowance(d,l.stakingV2):g=await new C(l.pushToken,k.uniV2LpToken,m).allowance(d,l.pushCoreV2),$(_(g)),U(!1)};r.useEffect(()=>{R(),K()},[]);const me=async()=>{if(!v){E();return}if(G||X)return;U(!0);var m=u.getSigner(d);let g;const b=Bs(H.toString(),18);p==="Uni-V2"?g=new C(l.uniV2LPToken,k.uniV2LpToken,m).approve(l.stakingV2,b):g=new C(l.pushToken,k.uniV2LpToken,m).approve(l.pushCoreV2,b),g.then(async j=>{i.showLoaderToast({loaderMessage:"Waiting for Confirmation..."});try{await u.waitForTransaction(j.hash),i.showMessageToast({toastTitle:"Success",toastMessage:`Successfully approved ${p} Tokens!`,toastType:"SUCCESS",getToastIcon:f=>e.jsx(xe,{size:f,color:"green"})}),U(!1),O(!0)}catch(f){console.error("Error",f),i.showMessageToast({toastTitle:"Error",toastMessage:"User denied message signature.",toastType:"ERROR",getToastIcon:A=>e.jsx(D,{size:A,color:"red"})}),U(!1)}}).catch(j=>{console.error("Error",j),i.showMessageToast({toastTitle:"Error",toastMessage:"User denied message signature",toastType:"ERROR",getToastIcon:f=>e.jsx(D,{size:f,color:"red"})}),U(!1)})},F=async()=>{if(!v){E();return}if(ae||!G)return;if(Y(!0),H==0){i.showMessageToast({toastTitle:"Error",toastMessage:`You need to deposit atleast 1 ${p} token `,toastType:"ERROR",getToastIcon:b=>e.jsx(D,{size:b,color:"red"})}),Y(!1);return}var m=u.getSigner(d);let g;p==="Uni-V2"?g=new C(l.stakingV2,k.stakingV2,m).deposit(l.uniV2LPToken,I.from(H).mul(I.from(10).pow(18))):g=new C(l.pushCoreV2,k.pushCoreV2,m).stake(I.from(H).mul(I.from(10).pow(18))),g.then(async b=>{i.showLoaderToast({loaderMessage:"Waiting for Confirmation..."});try{await u.waitForTransaction(b.hash),i.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!",toastType:"SUCCESS",getToastIcon:j=>e.jsx(xe,{size:j,color:"green"})}),o(),n(),Y(!1),V()}catch(j){console.error("Error",j),i.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Failed! (" +${j.name}+ ")`,toastType:"ERROR",getToastIcon:f=>e.jsx(D,{size:f,color:"red"})}),Y(!1)}}).catch(b=>{console.error("Error in depositing",b),b.reason=b.reason.slice(b.reason.indexOf("::")+1),i.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Cancelled! ${b.reason}`,toastType:"ERROR",getToastIcon:j=>e.jsx(D,{size:j,color:"red"})}),Y(!1)})},Z=m=>{m.preventDefault(),P(parseInt(m.target.value.replace(/\D/,""))||0),L>=parseInt(m.target.value.replace(/\D/,""))?O(!0):O(!1)},we=m=>{P(parseInt(m.toString().replace(/\D/,""))||0)},S=Ee(600);return e.jsxs(as,{children:[e.jsxs(T,{justifyContent:"space-between",children:[e.jsx(os,{children:p==="Uni-V2"?"Uniswap V2 Staking Pool":"Push Fee Staking Pool"}),e.jsx(it,{onClick:()=>V(),style:{cursor:"pointer"}})]}),e.jsxs(y,{children:[e.jsx(Vs,{weight:"500",size:"14px",self:"baseline",color:M.stakingSecondaryText,children:"You are Staking"}),e.jsxs(T,{width:"-webkit-fill-available",background:M.default.bg,height:"60px",padding:S?"8px":"14px",borderRadius:"12px",border:`1px solid ${M.modalBorderColor}`,children:[e.jsx(ns,{placeholder:"Enter Amount",flex:"2",radius:"4px",size:"32px",height:"32px",self:"auto",bg:"#FFF",color:M.stakingSecondaryText,value:H,onChange:m=>{m.preventDefault(),Z(m)},autoFocus:!0}),e.jsxs(rs,{onClick:()=>we(W),children:["Max: ",W]})]})]}),e.jsxs(T,{margin:"20px 0",gap:"12px",children:[e.jsxs(ie,{variant:"primary",size:"medium",onClick:me,disabled:!!G,children:[!G&&!X&&e.jsxs(Ge,{color:"#FFFFFF",weight:"400",cursor:"pointer",children:["Approve ",p]}),X&&!G&&e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:"#fff",title:"Approving",titleColor:"#FFF"}),G&&e.jsx(Ge,{color:M.emptyButtonText,weight:"600",cursor:"default",children:"Approved"})]}),e.jsxs(ie,{variant:"outline",size:"medium",disabled:!!(!G||ae),onClick:F,children:[!ae&&"Deposit",ae&&e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:"#FFFFFF",title:"Depositing",titleColor:"#FFF"})]})]})]})},as=a.div`
  padding: 16px 20px;
  width: 340px;
  font-family: 'FK Grotesk Neu';
  font-style: normal;
  font-weight: 500;
  line-height: 150%;

  @media (max-width: 500px) {
    width: 270px;
    padding: 16px 15px;
  }
`,os=a(N)`
  font-size: 16px;
  letter-spacing: normal;
  color: ${t=>t.theme.stakingPrimaryText};
`,ns=a(Ds)`
  background: transparent;
  width: 100%;
`,rs=a.p`
  font-size: 14px;
  text-align: right;
  text-decoration-line: underline;
  color: #657795;
  margin: 0px;
  cursor: pointer;
`,ls=({lpPoolStats:t,userDataLP:s,getLpPoolStats:i,getUserDataLP:p})=>{const{account:n,provider:o}=ke(),[h,x]=r.useState(!1),[d,u]=r.useState(!1),[v,E]=r.useState(null),[W,B]=r.useState(null),L=ze(),$=_e(),G=async()=>{if(h)return;x(!0);const V=_(s.epochStakeNext);if(V==0){B("Nothing to unstake. You need to stake first"),x(!1);return}var M=o.getSigner(n);let w=new C(l.stakingV2,k.stakingV2,M);await w.balanceOf(n,l.uniV2LPToken),w.withdraw(l.uniV2LPToken,I.from(V).mul(I.from(10).pow(18))).then(async R=>{L.showLoaderToast({loaderMessage:"Waiting for Confirmation..."});try{await o.waitForTransaction(R.hash),L.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!",toastType:"SUCCESS",getToastIcon:K=>e.jsx(xe,{size:K,color:"green"})}),x(!1),i(),p()}catch(K){console.error("Error",K),L.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Failed! (" +${K.name}+ ")`,toastType:"ERROR",getToastIcon:me=>e.jsx(D,{size:me,color:"red"})}),x(!1)}}).catch(R=>{L.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Cancelled!",toastType:"ERROR",getToastIcon:K=>e.jsx(D,{size:K,color:"red"})}),x(!1)})},O=async()=>{if(!d){if((s==null?void 0:s.totalAvailableReward)==0){E("No Rewards to Claim!");return}if(console.debug("Lp POOL stats",t),!t.currentEpochLP||t.currentEpochLP==1){L.showMessageToast({toastTitle:"Error",toastMessage:"Harvest unlocks from Epoch 2!)",toastType:"ERROR",getToastIcon:M=>e.jsx(D,{size:M,color:"red"})});return}u(!0);var V=o.getSigner(n);new C(l.yieldFarmLP,k.yieldFarming,V).massHarvest().then(async M=>{L.showLoaderToast({loaderMessage:"Waiting for Confirmation..."});try{await o.waitForTransaction(M.hash),L.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!",toastType:"SUCCESS",getToastIcon:w=>e.jsx(xe,{size:w,color:"green"})}),p(),u(!1)}catch(w){L.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Failed! (" +${w.name}+ ")`,toastType:"ERROR",getToastIcon:R=>e.jsx(D,{size:R,color:"red"})}),u(!1)}}).catch(M=>{L.showMessageToast({toastTitle:"Error",toastMessage:"Transaction Cancelled!",toastType:"ERROR",getToastIcon:w=>e.jsx(D,{size:w,color:"red"})}),u(!1)})}};r.useEffect(()=>{E(null),B(null)},[n]);const X=()=>{(t==null?void 0:t.currentEpochLP.toNumber())+1<=(t==null?void 0:t.totalEpochLP.toNumber())?ae():L.showMessageToast({toastTitle:"Error",toastMessage:"Epochs have ended!",toastType:"ERROR",getToastIcon:V=>e.jsx(D,{size:V,color:"red"})})},{isModalOpen:U,showModal:ae,ModalComponent:Y}=Je(),H=ze(),P=Ee(600);return e.jsxs(ps,{children:[e.jsx(Y,{InnerComponent:Tt,InnerComponentProps:{title:"Uni-V2",getUserData:p,getPoolStats:i,setUnstakeErrorMessage:B,setWithdrawErrorMessage:E},toastObject:H,modalPosition:Ke.ON_PARENT}),e.jsx(y,{margin:"0px 0px 20px 0px",children:t?e.jsx(e.Fragment,{children:e.jsx(xs,{children:"Uniswap V2 LP Staking Pool"})}):e.jsxs(Fe,{padding:"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:"234px",margin:"0 0 10px 0"}),e.jsx(c,{height:"12px",width:"112px"})]})}),e.jsxs(y,{flex:"5",children:[e.jsxs(ds,{border:`1px solid ${$.stakingBorder}`,borderRadius:"16px",children:[e.jsx(y,{padding:P?" 1px":"8px",children:t?e.jsxs(e.Fragment,{children:[e.jsx(ft,{children:"Current Reward"}),e.jsx(N,{fontSize:P?"18px":"24px",fontWeight:"600",color:"#D53A94",letterSpacing:"normal",children:"0 PUSH"})]}):e.jsxs(Fe,{padding:P?"0px":"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:P?"100px":"135px",margin:"0 0 8px 0"}),e.jsx(c,{height:"12px",width:P?"65px":"100px}"})]})}),e.jsx(cs,{width:"10px",height:"100%"}),e.jsx(y,{padding:P?" 1px":"8px",children:t?e.jsxs(e.Fragment,{children:[e.jsx(ft,{children:"Total Staked"}),e.jsxs(hs,{fontSize:P?"18px":"24px",fontWeight:"600",letterSpacing:"normal",children:[ee(_(t==null?void 0:t.poolBalance))," UNI-V2"]})]}):e.jsxs(Fe,{padding:P?"0px":"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:P?"100px":"135px",margin:"0 0 8px 0"}),e.jsx(c,{height:"12px",width:P?"65px":"100px}"})]})})]}),e.jsx(T,{alignSelf:"end",margin:"12px 13px 24px 0px",color:"#575D73",letterSpacing:"normal",children:t?e.jsxs(e.Fragment,{children:[e.jsx(jt,{children:"Current Epoch"}),e.jsxs(jt,{children:[Math.min(t==null?void 0:t.currentEpochLP,t==null?void 0:t.totalEpochLP).toString(),"/",t==null?void 0:t.totalEpochLP.toString()]})]}):e.jsx(Fe,{padding:"5px 0px 0 15px",children:e.jsx(c,{height:"12px",width:"124px"})})}),s?e.jsxs(y,{children:[e.jsxs(T,{justifyContent:"space-between",margin:P?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Le,{children:["User Deposit",e.jsx($e,{children:e.jsx(J,{ToolTipTitle:"User Deposited",ToolTipBody:"Amount of PUSH Token User Staked",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(Ve,{children:[_(s==null?void 0:s.epochStakeNext)," UNI-V2"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:P?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Le,{children:["Rewards Claimed",e.jsx($e,{children:e.jsx(J,{ToolTipTitle:"Rewards Claimed",ToolTipBody:"Amount of Push Claimed by User",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(Ve,{children:[" ",ee(((s==null?void 0:s.totalAccumulatedReward)-(s==null?void 0:s.totalAvailableReward)).toFixed(2))," ","PUSH"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:P?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Le,{children:["Current Epoch Reward",e.jsx($e,{children:e.jsx(J,{ToolTipTitle:"Current Epoch Reward",ToolTipBody:"Displays the approximate latest reward amount for current epoch",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(Ve,{children:[" ",ee(s==null?void 0:s.potentialUserReward)," PUSH"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:P?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Le,{children:["Available for Claiming",e.jsx($e,{children:e.jsx(J,{ToolTipTitle:"Available for Claiming",ToolTipBody:"Amount of Push Token Available to claim",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(Ve,{children:[" ",ee(s==null?void 0:s.totalAvailableReward)," PUSH"]})]})]}):e.jsxs(Ce,{padding:"0 15px 15px 15px",width:"100%",maxWidth:" -webkit-fill-available",borderRadius:"5px",children:[e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]})]})]}),e.jsx(y,{padding:P?"0px ":"0px 14px",margin:"24px 0px 24px 0px",children:s?e.jsxs(e.Fragment,{children:[e.jsx(T,{children:e.jsx(ie,{variant:"primary",size:"medium",disabled:!0,block:!0,onClick:()=>{X()},children:"Stake $UNI-V2 LP Tokens"})}),e.jsxs(gs,{children:[e.jsx(qe,{width:"50%",children:_(s==null?void 0:s.epochStakeNext)==="0"?e.jsx(J,{error:!0,ToolTipTitle:"Nothing to unstake! Stake First.",ToolTipWidth:"16rem",bottom:"-30px",children:e.jsx(ie,{disabled:!0,size:"medium",block:!0,children:h?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:"#D53A94"}):"Unstake $UNI-V2"})}):e.jsx(ie,{size:"medium",variant:"outline",block:!0,onClick:G,children:h?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:$.activeButtonText,title:"Unstaking",titleColor:$.activeButtonText}):"Unstake $UNI-V2"})}),e.jsx(qe,{width:"50%",children:(s==null?void 0:s.totalAvailableReward)==="0.00"?e.jsx(J,{bottom:"-30px",left:"40px",ToolTipTitle:"No Rewards to Claim!",error:!0,ToolTipWidth:"10rem",children:e.jsx(ie,{disabled:!0,size:"medium",block:!0,children:d?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:"#FFFFF"}):"Claim Rewards"})}):e.jsx(ie,{variant:"outline",size:"medium",block:!0,onClick:()=>O(),children:d?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:$.activeButtonText,title:"Claiming",titleColor:$.activeButtonText}):"Claim Rewards"})})]})]}):e.jsxs(Fe,{width:"100%",children:[e.jsx(c,{height:"49px",width:"100%",margin:"0 0 8px 0"}),e.jsx(c,{height:"49px",width:"100%"})]})})]})},ps=a(We)`
  border: 1px solid ${t=>t.theme.stakingBorder};
  border-radius: 24px;
  padding: 20px;

  font-family: 'FK Grotesk Neu';

  margin: 10px 0 10px 10px;

  font-style: normal;
  font-weight: 500;
  min-height: 587px;
  color: ${t=>t.theme.stakingPrimaryText};
  width: -webkit-fill-available;
  @media (max-width: 1300px) {
    margin: 0 0 10px 0;
  }
  @media (max-width: 600px) {
    padding: 16px;
  }
`,xs=a(N)`
  font-size: 24px;
  line-height: 141%;
  letter-spacing: normal;
  color: ${t=>t.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 22px;
  }
`,ft=a.div`
  margin: 0px;
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  // color: #333333;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,ds=a(T)`
  min-height: 110px;

  @media (min-width: 600px) and (max-width: 992px) {
    margin: 0px 13px;
  }
`,cs=a.div`
  width: 1px;
  height: 100%;
  background: ${t=>t.theme.stakingBorder};
`,Le=a.div`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  // color: rgba(87, 93, 115, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${t=>t.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,hs=a(N)`
  color: ${t=>t.theme.stakingSecondaryText};
`,jt=a(Ut)`
  font-weight: 600;
  text-align: right;
  letter-spacing: normal;
  font-size: 16px;
  line-height: 141%;
  margin-right: 5px;
  color: ${t=>t.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,$e=a(je)`
  margin: 0px 0px 0px 6px;
  cursor: pointer;
`,Ve=a(N)`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  color: ${t=>t.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,gs=a.div`
  display: flex;
  gap: 12px;
  margin: 15px 0px 0px 0px;
  width: 100%;
`,Fe=a(Ce)`
  // width:150px;
  max-width: -webkit-fill-available;
  border-radius: 5px;
  gap: 5px;
`,us=t=>r.createElement("svg",{width:29,height:28,viewBox:"0 0 29 28",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},r.createElement("path",{d:"M26.1673 14.0002C26.1673 20.4431 20.9436 25.6668 14.5007 25.6668C8.05773 25.6668 2.83398 20.4431 2.83398 14.0002C2.83398 7.55725 8.05773 2.3335 14.5007 2.3335C20.9436 2.3335 26.1673 7.55725 26.1673 14.0002Z",fill:"#30CC8B"}),r.createElement("path",{d:"M20.6751 8.5083L12.7593 16.4335L9.49146 13.175L7.8418 14.8246L12.7616 19.7328L22.3254 10.158L20.6751 8.5083Z",fill:"white"})),ms=({onClose:t,InnerComponentProps:s})=>{const{currentTransactionNo:i,totalTransactionNo:p,transactionSteps:n,transactionText:o,setCurrentTransactionNo:h,setTotalTransactionNo:x,setTransactionSteps:d,claimRewards:u,unstakeTokensPaginated:v}=s,E=()=>{d(0),t()},W=async()=>{d(0),x(0),h(0),o!=null&&o.includes("Unstaking")?v():u()};return e.jsx(ws,{children:p?e.jsxs(e.Fragment,{children:[e.jsx(T,{justifyContent:"end",children:e.jsx(it,{onClick:()=>E(),style:{cursor:"pointer"}})}),n===0&&e.jsxs(e.Fragment,{children:[e.jsx(Mt,{size:42,color:de.COLORS.PRIMARY_PINK,type:Ft.PROCESSING}),e.jsxs(y,{gap:"24px",margin:"16px 0 0 0",children:[e.jsxs(y,{children:[e.jsxs(N,{fontSize:"28px",fontWeight:"500",letterSpacing:"normal",children:["Please sign transaction ",i,"/",p]}),e.jsx(N,{fontSize:"18px",fontWeight:"400",color:"#657795",children:"Processing your request"})]}),e.jsx(N,{fontSize:"18px",fontWeight:"400",color:"#657795",children:o}),e.jsx(y,{padding:"16px",children:e.jsx(N,{fontSize:"16px",fontWeight:"400",color:"#D53A94",children:"Confirm the request in your wallet"})})]})]}),n===1&&e.jsxs(y,{gap:"24px",children:[e.jsx(y,{gap:"9px",children:e.jsx(N,{fontSize:"28px",fontWeight:"500",letterSpacing:"normal",children:"Transaction Error"})}),e.jsx(y,{children:e.jsx(ie,{variant:"primary",size:"medium",onClick:W,children:"Retry"})})]}),n===2&&e.jsxs(y,{gap:"24px",children:[e.jsxs(y,{children:[e.jsx(us,{height:"50px",width:"50px"}),e.jsxs(y,{gap:"9px",children:[e.jsx(N,{fontSize:"28px",fontWeight:"500",letterSpacing:"normal",children:"Transactions Successful"}),e.jsx(N,{fontSize:"18px",fontWeight:"400",color:"#657795",children:"You have claimed all the rewards."})]})]}),e.jsx(ie,{variant:"primary",size:"medium",onClick:E,children:"Close"})]})]}):e.jsx(Mt,{size:42,color:de.COLORS.PRIMARY_PINK,type:Ft.PROCESSING})})},ws=a(y)`
  min-width: 493px;
  padding: 32px 24px;
`,Ts=({userDataPush:t,getUserDataPush:s,PUSHPoolstats:i,getPUSHPoolStats:p})=>{const{account:n,provider:o}=ke(),[h,x]=r.useState(!1),[d,u]=r.useState(!1),[v,E]=r.useState(null),[W,B]=r.useState(null),[L,$]=r.useState(0),[G,O]=r.useState(0),[X,U]=r.useState(0),[ae,Y]=r.useState(""),H=ze(),P=_e(),V=async j=>{var f=o.getSigner(n);let A=new C(l.pushToken,k.pushToken,f);if(await A.holderDelegation(n,j.address))return!0;try{H.showLoaderToast({loaderMessage:"Delegating! Please wait.."});const z=await A.setHolderDelegation(j.address,"true");return await o.waitForTransaction(z.hash),H.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed! Address Delegated",toastType:"SUCCESS",getToastIcon:te=>e.jsx(xe,{size:te,color:"green"})}),!0}catch(z){return console.error("Error in delegating",z),H.showMessageToast({toastTitle:"Error",toastMessage:`Transaction failed! ${z.reason}`,toastType:"ERROR",getToastIcon:te=>e.jsx(D,{size:te,color:"red"})}),x(!1),!1}},M=async j=>{const f=(await j.userFeesInfo(n)).lastClaimedBlock;if(f.toNumber()!==0){const A=await j.genesisEpoch(),z=await j.epochDuration();return(f-A)/z}},w=async()=>{if(d)return;if(u(!0),(t==null?void 0:t.availableRewards)==0){B("No Rewards to Claim"),u(!1);return}var j=o.getSigner(n);let f=new C(l.pushCoreV2,k.pushCoreV2,j);const A=i==null?void 0:i.currentEpochNumber,z=14;if(!await V(f))return;let te=1;te=await M(f),g(),u(!1);let se=0;A-te<z,se=Math.ceil((A-te)/z),O(se),se!=0&&(await R(se,te,f,z),s(),U(2),$(0))},R=async(j,f,A,z)=>{const te=i==null?void 0:i.currentEpochNumber;let se=0;for(let Q=0;Q<j;Q++){let q=f;f+=z;let ce=Math.min(f,te-1);Y(`Claiming the rewards from Epoch ${q} to ${ce} `),await A.harvestPaginated(ce,{gasLimit:91e4}).then(async oe=>{try{H.showLoaderToast({loaderMessage:"Waiting for confirmation"}),await o.waitForTransaction(oe.hash),H.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!",toastType:"SUCCESS",getToastIcon:ne=>e.jsx(xe,{size:ne,color:"green"})}),se++,$(se)}catch{console.error("Error in the transaction",oe);return}}).catch(oe=>{throw console.error("Error in claiming the reward",oe),H.showMessageToast({toastTitle:"Error",toastMessage:`Transaction failed! ${oe.reason}`,toastType:"ERROR",getToastIcon:ne=>e.jsx(D,{size:ne,color:"red"})}),Y(""),x(!1),s(),U(1),$(0),oe})}},K=async()=>{if(h)return;if(x(!0),_(t==null?void 0:t.userStaked)==0){E("Nothing to unstake, You need to stake first"),x(!1);return}var j=o.getSigner(n);let f=new C(l.pushCoreV2,k.pushCoreV2,j);const A=await V(f);if(u(!1),!A)return;const z=i==null?void 0:i.currentEpochNumber,te=14;let se=0;if(se=await M(f),se>=z-1){x(!1),E("PUSH cannot be unstaked until current epoch is over."),H.showMessageToast({toastTitle:"Unstaking Error",toastMessage:"You cannot unstake until Current Epoch gets over.",toastType:"ERROR",getToastIcon:q=>e.jsx(D,{size:q,color:"red"})});return}g();const Q=Math.ceil((z-se)/te);O(Q),Q>1&&await R(Q-1,se,f,te),Y("Unstaking Your Push Tokens. Please wait..."),f.unstake().then(async q=>{H.showLoaderToast({loaderMessage:"Unstaking! Waiting for Confirmation..."});try{await o.waitForTransaction(q.hash),H.showMessageToast({toastTitle:"Success",toastMessage:"Transaction Completed!",toastType:"SUCCESS",getToastIcon:ce=>e.jsx(xe,{size:ce,color:"green"})}),p(),s(),x(!1),U(2),$(0)}catch(ce){console.error("Error",ce),H.showMessageToast({toastTitle:"Error",toastMessage:`Transaction Failed! (" +${ce.name}+ ")`,toastType:"ERROR",getToastIcon:oe=>e.jsx(D,{size:oe,color:"red"})}),Y(""),x(!1)}}).catch(q=>{console.error("Error: ",q);const ce=q.reason.includes("PushCoreV2::unstake:"),oe=q.reason.includes("PushCoreV2::harvestPaginated:");if(ce||oe)E("PUSH cannot be unstaked until current epoch is over.");else{let ne=q.reason.slice(q.reason.indexOf("::")+1);ne=ne.replace("unstake:",""),H.showMessageToast({toastTitle:"Error",toastMessage:`${ne}`,toastType:"ERROR",getToastIcon:Te=>e.jsx(D,{size:Te,color:"red"})})}x(!1),s(),U(1),$(0)})};r.useEffect(()=>{B(null),E(null)},[n]);const{isModalOpen:me,showModal:F,ModalComponent:Z}=Je(),we=ze(),S=Ee(600),{isModalOpen:m,showModal:g,ModalComponent:b}=Je();return e.jsxs(fs,{children:[e.jsx(Z,{InnerComponent:Tt,InnerComponentProps:{title:"PUSH",getUserData:s,getPoolStats:p,setUnstakeErrorMessage:E,setWithdrawErrorMessage:B},toastObject:we,modalPosition:Ke.ON_PARENT}),e.jsx(b,{InnerComponent:ms,InnerComponentProps:{currentTransactionNo:L,totalTransactionNo:G,transactionSteps:X,transactionText:ae,setCurrentTransactionNo:$,setTotalTransactionNo:O,setTransactionSteps:U,claimRewards:w,unstakeTokensPaginated:K},onConfirm:()=>{},modalPadding:"0px",modalPosition:Ke.ON_ROOT}),e.jsx(y,{margin:"0px 0px 20px 0px",children:i?e.jsx(e.Fragment,{children:e.jsx(js,{children:"PUSH Fee Staking Pool"})}):e.jsxs(Ae,{padding:"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:"234px",margin:"0 0 10px 0"}),e.jsx(c,{height:"12px",width:"112px"})]})}),e.jsxs(y,{flex:"5",children:[e.jsxs(Ss,{border:`1px solid ${P.stakingBorder}`,borderRadius:"16px",children:[e.jsx(y,{padding:S?" 1px":"8px",children:i?e.jsxs(e.Fragment,{children:[e.jsx(bt,{children:"Current Reward"}),e.jsxs(N,{fontSize:S?"18px":"24px",fontWeight:"600",color:"#D53A94",letterSpacing:"normal",children:[ee(_(i==null?void 0:i.currentReward))," PUSH"]})]}):e.jsxs(Ae,{padding:S?"0px":"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:S?"100px":"135px",margin:"0 0 8px 0"}),e.jsx(c,{height:"12px",width:S?"65px":"100px}"})]})}),e.jsx(bs,{width:"10px",height:"100%"}),e.jsx(y,{padding:S?" 1px":"8px",children:i?e.jsxs(e.Fragment,{children:[e.jsx(bt,{children:"Total Staked"}),e.jsxs(Cs,{fontSize:S?"18px":"24px",fontWeight:"600",letterSpacing:"normal",children:[ee(_(i==null?void 0:i.totalStakedAmount))," PUSH"]})]}):e.jsxs(Ae,{padding:S?"0px":"5px 15px 0 15px",children:[e.jsx(c,{height:"12px",width:S?"100px":"135px",margin:"0 0 8px 0"}),e.jsx(c,{height:"12px",width:S?"65px":"100px}"})]})})]}),e.jsx(T,{alignSelf:"end",margin:"12px 13px 24px 0px",color:"#575D73",letterSpacing:"normal",children:i?e.jsxs(e.Fragment,{children:[e.jsx(Ct,{children:"Current Epoch"}),e.jsx(Ct,{children:i==null?void 0:i.currentEpochNumber})]}):e.jsx(Ae,{padding:"5px 0px 0 15px",children:e.jsx(c,{height:"12px",width:"124px"})})}),t?e.jsxs(y,{children:[e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Be,{children:["User Deposit",e.jsx(Oe,{children:e.jsx(J,{ToolTipTitle:"User Deposited",ToolTipBody:"Amount of PUSH Token User Staked",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(He,{children:[" ",ee(_(t==null?void 0:t.userStaked))," PUSH"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Be,{children:["Rewards Claimed",e.jsx(Oe,{children:e.jsx(J,{ToolTipTitle:"Rewards Claimed",ToolTipBody:"Amount of Push Claimed by User",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(He,{children:[" ",ee((t==null?void 0:t.claimedReward).toFixed(2))," PUSH"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Be,{children:["Current Epoch Reward",e.jsx(Oe,{children:e.jsx(J,{ToolTipTitle:"Current Epoch Reward",ToolTipBody:"Displays the approximate latest reward amount for current epoch",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(He,{children:[" ",ee((t==null?void 0:t.potentialReward).toFixed(2))," PUSH"]})]}),e.jsxs(T,{justifyContent:"space-between",margin:S?"0px 0px 12px 0px":"0px 13px 12px 13px",children:[e.jsxs(Be,{children:["Available for Claiming",e.jsx(Oe,{children:e.jsx(J,{ToolTipTitle:"Available for Claiming",ToolTipBody:"Amount of Push Token Available to claim",children:e.jsx(re,{src:ge,alt:"Info-Logo",width:"16px",style:{cursor:"pointer"}})})})]}),e.jsxs(He,{children:[" ",ee((t==null?void 0:t.availableRewards).toFixed(2))," PUSH"]})]})]}):e.jsxs(Ce,{padding:"0 15px 15px 15px",width:"100%",maxWidth:" -webkit-fill-available",borderRadius:"5px",children:[e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",margin:"0 0 23px 0",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]}),e.jsxs(T,{justifyContent:"space-between",children:[e.jsx(c,{height:"12px",width:"164px"}),e.jsx(c,{height:"12px",width:"72px"})]})]})]}),e.jsx(y,{padding:S?"0px ":"0px 14px",margin:"24px 0px 24px 0px",children:t?e.jsxs(e.Fragment,{children:[e.jsx(T,{children:e.jsx(ie,{variant:"primary",size:"medium",block:!0,onClick:F,children:"Stake $PUSH"})}),e.jsxs(ks,{children:[e.jsx(qe,{width:"50%",children:(i==null?void 0:i.currentEpochNumber)<=2?e.jsx(St,{ToolTipTitle:"You can unstake once epoch 2 ends.",ButtonTitle:"Unstake PUSH"}):_(t==null?void 0:t.userStaked)==0||v!==null?e.jsx(St,{ToolTipTitle:v||"Nothing to unstake, Stake First",ButtonTitle:"Unstake PUSH"}):e.jsx(ie,{variant:"outline",size:"medium",block:!0,onClick:K,children:h?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:P.activeButtonText,title:"Unstaking",titleColor:P.activeButtonText}):"Unstake $PUSH"})}),e.jsx(qe,{width:"50%",children:(t==null?void 0:t.availableRewards)===0?e.jsx(J,{bottom:"-30px",ToolTipTitle:"No Rewards to Claim",error:!0,left:"40px",ToolTipWidth:"10rem",children:e.jsx(ie,{size:"medium",block:!0,disabled:!0,children:d?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:"#D53A94"}):"Claim Rewards"})}):e.jsx(ie,{variant:"outline",size:"medium",block:!0,onClick:w,children:d?e.jsx(le,{type:pe.SEAMLESS,spinnerSize:26,spinnerColor:P.activeButtonText,title:"Claiming",titleColor:P.activeButtonText}):"Claim Rewards"})})]})]}):e.jsxs(Ae,{width:"100%",children:[e.jsx(c,{height:"49px",width:"100%",margin:"0 0 8px 0"}),e.jsx(c,{height:"49px",width:"100%"})]})})]})},St=t=>e.jsx(J,{error:!0,ToolTipTitle:t.ToolTipTitle,ToolTipWidth:"16rem",bottom:"-30px",children:e.jsx(ie,{size:"medium",block:!0,disabled:!0,children:t.ButtonTitle})});a.div`
  width: 34%;
  width: 100%;
  min-width: none;
  max-width: none;
  display: flex;
  flex: 1;
  height: fit-content;
  position: relative;
  @media ${Qe.tablet} {
    width: 100%;
    max-width: 100%;
  }
`,a.div`
  position: absolute;
  border-radius: 17px;
  background: none;
  bottom: 25px;
  left: 5px;
  color: #fff;
  background: #131313;
  font-family: 'FK Grotesk Neu';
  font-style: normal;
  font-weight: 400;
  font-size: 0.9rem;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  line-height: 21px;
  z-index: 10;
  &::before {
    bottom: 100%;
    border-bottom-color: #131313;
  }
`;const fs=a(We)`
  border: 1px solid ${t=>t.theme.stakingBorder};
  border-radius: 24px;
  padding: 20px;
  margin: 10px 10px 10px 0;
  font-family: 'FK Grotesk Neu';
  font-style: normal;
  font-weight: 500;
  min-height: 587px;
  color: ${t=>t.theme.stakingPrimaryText};
  width: -webkit-fill-available;
  @media (max-width: 1300px) {
    margin: 10px 0;
  }
  @media (max-width: 600px) {
    padding: 20px;
  }
`,js=a(N)`
  font-size: 24px;
  line-height: 141%;
  letter-spacing: normal;
  color: ${t=>t.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;a.div`
  margin: 0px;
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;const bt=a.p`
  margin: 0px;
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`,Ss=a(T)`
  min-height: 110px;

  @media (min-width: 600px) and (max-width: 992px) {
    margin: 0px 13px;
  }
`,bs=a.div`
  width: 1px;
  height: 100%;
  background: ${t=>t.theme.stakingBorder};
`,Be=a.div`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${t=>t.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,Cs=a(N)`
  color: ${t=>t.theme.stakingSecondaryText};
`,Ct=a(Ut)`
  font-weight: 600;
  text-align: right;
  letter-spacing: normal;
  font-size: 16px;
  line-height: 141%;
  margin-right: 5px;
  color: ${t=>t.theme.stakingUserDetails};

  @media (max-width: 600px) {
    font-size: 14px;
  }
`,Oe=a(je)`
  margin: 0px 0px 0px 6px;
  cursor: pointer;
`,He=a(N)`
  font-size: 18px;
  line-height: 141%;
  letter-spacing: normal;
  color: ${t=>t.theme.stakingPrimaryText};

  @media (max-width: 600px) {
    font-size: 16px;
  }
`,ks=a.div`
  display: flex;
  margin: 15px 0px 0px 0px;
  gap: var(--s3);
  width: 100%;
`,Ae=a(Ce)`
  // width:150px;
  max-width: -webkit-fill-available;
  border-radius: 5px;
  gap: 5px;
`,ys=({setActiveTab:t})=>{const{provider:s,account:i,chainId:p}=ke(),[n,o]=r.useState(),[h,x]=r.useState(),[d,u]=r.useState(),[v,E]=r.useState(),[W,B]=r.useState(),[L,$]=r.useState(null),[G,O]=r.useState(null),[X,U]=r.useState(null),[ae,Y]=r.useState(null),[H,P]=r.useState(null),V=s==null?void 0:s.getSigner(i),M=r.useCallback(async()=>{const F=await Re.getInstance().getPoolStats(s);$({...F})},[h,n,v,d,W,s]),w=r.useCallback(async()=>{const F=await Re.getInstance().getPoolStats(s),Z=await Re.getInstance().getLPPoolStats(F);O({...Z})},[h,n,v,d,W,s]),R=r.useCallback(async()=>{},[]),K=r.useCallback(async()=>{const F=await Re.getInstance().getUserDataLP();U({...F})},[h,n,v,d,W]),me=r.useCallback(async()=>{const[F,Z]=await Re.getInstance().getUserDataPUSH(s);P({...F}),Y({...Z})},[h,n,v,d,W,s]);return r.useEffect(()=>{if(p!==he.coreContractChain&&p!==he.mainnetCoreContractChain)return;O(null),U(null),P(null),Y(null);let F=new C(l.stakingV2,k.stakingV2,V),Z=new C(l.pushToken,k.pushToken,V),we=new C(l.pushCoreV2,k.pushCoreV2,V),S=new C(l.yieldFarmLP,k.yieldFarming,V),m=new C(l.uniswapV2Router02,k.uniswapV2Router02,V);if(x(F),o(Z),E(we),u(S),B(m),V&&i){var g=s==null?void 0:s.getSigner(i);let b=new C(l.stakingV2,k.stakingV2,g),j=new C(l.pushToken,k.pushToken,g),f=new C(l.pushCoreV2,k.pushCoreV2,g),A=new C(l.yieldFarmLP,k.yieldFarming,g),z=new C(l.uniswapV2Router02,k.uniswapV2Router02,g);x(b),o(j),E(f),u(A),B(z)}Re.getInstance().init(i,F,Z,we,S,m),M(),K(),w(),me()},[i,p]),e.jsxs(e.Fragment,{children:[e.jsx(pt,{logo:"announcement",title:"Staking Program has now ended.",body:"Note: While UNI-V2 LP staking pool has ended, the Push Fee Staking Pool is designed to continue its staking mechanism. However, rewards for stakers will solely come from Core smart contract fee earnings.",setActiveTab:t}),e.jsx(ts,{getLpPoolStats:w,poolStats:L,setPoolStats:$}),e.jsx(Zt,{poolStats:L}),e.jsxs(Es,{children:[e.jsx(Ts,{userDataPush:ae,getUserDataPush:me,PUSHPoolstats:H,getPUSHPoolStats:R}),e.jsx(ls,{lpPoolStats:G,userDataLP:X,getLpPoolStats:w,getUserDataLP:K})]})]})},Es=a(T)`
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`,Ps=({onClose:t})=>{const{chainId:s,switchChain:i}=ke(),p=()=>{const n=he.allowedNetworks[0];s!==1&&s!==11155111&&(console.info("Current Chain ID ",s),console.info("Chain Id to pass",n),i(he.coreContractChain))};return r.useEffect(()=>{(s===he.coreContractChain||s===he.mainnetCoreContractChain)&&t()},[s]),e.jsxs(vs,{children:[e.jsx(it,{style:{cursor:"pointer",alignSelf:"end"}}),e.jsxs(Rs,{children:[e.jsx(Us,{children:"Unsupported Network"}),e.jsxs(Ms,{children:["Push Yield Farm V2 is only live on Ethereum Chain.",e.jsx("br",{}),"Kindly switch to Ethereum"]})]}),e.jsx(Fs,{children:e.jsx(ie,{onClick:p,variant:"primary",size:"large",children:"Switch Network"})})]})},vs=a(y)`
  padding: 32px 36px;
  width: 445px;
`,Rs=a(y)`
  font-family: FK Grotesk Neu;
  font-style: normal;
  line-height: 141%; /* 39.48px */
  letter-spacing: normal;
`,Us=a.div`
  font-size: 28px;
  font-weight: 500;
  color: ${t=>t.theme.stakingSecondaryText};
`,Ms=a.div`
  color: ${t=>t.theme.activeButtonText};
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0 24px 0;
`,Fs=a.div``;he.coreContractChain;let kt,yt,Et,et,Pt;kt=()=>{Os.pageview("/yield");const[t,s]=r.useState(0),[i,p]=r.useState(!1),{account:n,chainId:o,switchChain:h}=ke(),x=()=>{const E=he.allowedNetworks[0];o!==1&&o!==5&&h(E)};r.useEffect(()=>{o!==1&&o!==11155111&&(u(),x())},[o]);const{isModalOpen:d,showModal:u,ModalComponent:v}=Je();return e.jsxs(yt,{children:[e.jsx(v,{InnerComponent:Ps,onConfirm:()=>{},modalPadding:"0px",modalPosition:Ke.ON_PARENT}),e.jsxs(Et,{children:[e.jsx(et,{isActive:!t,onClick:()=>{p(!0),s(0)},children:"Yield Farming V2"}),e.jsxs(et,{isActive:t,onClick:()=>{p(!1),s(1)},children:["Yield Farming V1 ",e.jsx(Pt,{children:"Deprecated"})]})]}),t===0&&e.jsx(ys,{setActiveTab:s}),t===1&&e.jsx(qt,{setActiveTab:s})]})},yt=a(We)`
	align-items: stretch;
	align-self: center;
  flex: 1;
	background: ${t=>t.theme.default.bg};
	border-radius: ${de.ADJUSTMENTS.RADIUS.LARGE};
	box-shadow: ${de.ADJUSTMENTS.MODULE_BOX_SHADOW};
	display: flex;
	flex-direction: column;
	flex: initial;
	justify-content: center;
	position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: calc(
    100% - ${Ze.MINI_MODULES.DESKTOP.RIGHT} - ${Ze.MINI_MODULES.DESKTOP.LEFT} -
      ${de.ADJUSTMENTS.PADDING.BIG} - ${de.ADJUSTMENTS.PADDING.BIG}
  );
  gap: 16px;
  padding: 24px;

  margin: ${de.ADJUSTMENTS.MARGIN.MINI_MODULES.DESKTOP};
  
  @media ${Qe.laptop} {
    margin: ${de.ADJUSTMENTS.MARGIN.MINI_MODULES.TABLET};
  }

  @media ${Qe.tablet} {
    width: calc(
      100% - ${Ze.MINI_MODULES.TABLET.RIGHT} - ${Ze.MINI_MODULES.TABLET.LEFT} -
        ${de.ADJUSTMENTS.PADDING.DEFAULT} - ${de.ADJUSTMENTS.PADDING.DEFAULT}
    );
    margin: ${de.ADJUSTMENTS.MARGIN.MINI_MODULES.MOBILE};
    padding:16px;
  }

  @media ${Qe.mobileL} {
    margin: ${de.ADJUSTMENTS.MARGIN.MINI_MODULES.MOBILE};
    border: ${de.ADJUSTMENTS.RADIUS.LARGE};
    width: 100%;
    padding: ${de.ADJUSTMENTS.PADDING.DEFAULT};
`,Et=a(T)`
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 51px;
  position: relative;

  :after {
    position: absolute;
    height: 2px;
    left: 0;
    bottom: 0px;
    width: 100%;
    content: '';
    background-color: ${t=>t.theme.default.border};
  }
`,et=a.div`
  cursor: pointer;
  // padding: 0 25px;
  width: 250px;
  justify-content: center;
  display: flex;
  height: 25px;
  line-height: 141%;
  text-align: center;
  position: relative;
  color: ${t=>t.isActive?"#CF1C84":t.theme.color};

  @media (max-width: 638px) {
    width: 150px;
    flex: 1;
    flex-direction: column;
    align-items: baseline;
  }

  ${t=>t.isActive&&`&:after{
        position: absolute;
        height: 2px;
        left: 0;
        bottom: -13px;
        width: 100%;
        content: '';
        background-color: #CF1C84;
        z-index: 1;
        
    }`}
`,Pt=a(je)`
  font-weight: 600;
  font-size: 12px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #d53a94;
  margin-left: 10px;
  padding: 2px 6px;
  background: #f3d7fa;
  border-radius: 6px;
  height: 17px;
  width: fit-content;
`,At=()=>e.jsx(Gs,{children:e.jsx(kt,{})})});export{Js as __tla,At as default};
