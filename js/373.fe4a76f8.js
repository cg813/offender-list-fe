"use strict";(self["webpackChunkoffender"]=self["webpackChunkoffender"]||[]).push([[373],{8373:function(e,s,t){t.r(s),t.d(s,{default:function(){return we}});var i=t(6252),n=t(3577),a=t(2262),l=t(5076);function r(e,s){return(0,i.wg)(),(0,i.j4)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[(0,i.Wm)("path",{"fill-rule":"evenodd",d:"M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z","clip-rule":"evenodd"})])}function o(e,s){return(0,i.wg)(),(0,i.j4)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[(0,i.Wm)("path",{"fill-rule":"evenodd",d:"M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z","clip-rule":"evenodd"})])}var d=t(3560),c=t(9530);const u={key:0,class:"w-full max-w-lg py-20 text-white text-lg"},m={class:"flex"},w=(0,i._)("div",{class:"w-32 mr-4"},"User Name:",-1),g={class:"text-gray-400"},p={class:"flex mt-4"},f=(0,i._)("div",{class:"w-32 mr-4"},"Email:",-1),b={class:"text-gray-400"},v={class:"flex mt-4"},x=(0,i._)("div",{class:"w-32 mr-4"},"Plan:",-1),h={class:"text-gray-400 capitalize"};var _=(0,i.aZ)({__name:"Account",setup(e){const s=(0,d.L)(),t=(0,c.W)();(0,i.bv)((async()=>{t.plans.length||await t.fetchPlans()}));const l=(0,i.Fl)((()=>t.plans)),r=e=>l.value.find((s=>s._id===e))||null;return(e,t)=>(0,a.SU)(s).user?((0,i.wg)(),(0,i.iD)("div",u,[(0,i._)("div",m,[w,(0,i._)("div",g,(0,n.zw)((0,a.SU)(s).user.userName),1)]),(0,i._)("div",p,[f,(0,i._)("div",b,(0,n.zw)((0,a.SU)(s).user.email),1)]),(0,i._)("div",v,[x,(0,i._)("div",h,(0,n.zw)(r((0,a.SU)(s).user.plan)?.requests||0)+" / "+(0,n.zw)(r((0,a.SU)(s).user.plan)?.frequency||"Year"),1)])])):(0,i.kq)("",!0)}});const y=_;var k=y,P=t(9963),S=t(3002);const C={class:"w-full max-w-lg py-20"},j=(0,i._)("div",{class:""},[(0,i._)("h2",{class:"text-2xl font-bold leading-9 tracking-tight text-white text-center"},"Change Your Password")],-1),q={class:"mt-10"},z=["onSubmit"],N=(0,i._)("label",{for:"email",class:"block text-sm font-medium leading-6 text-white"},"User Name",-1),U={class:"mt-2"},D=(0,i._)("div",{class:"flex items-center justify-between"},[(0,i._)("label",{for:"password",class:"block text-sm font-medium leading-6 text-white"},"Current Password")],-1),T={class:"mt-2"},V=(0,i._)("div",{class:"flex items-center justify-between"},[(0,i._)("label",{for:"password",class:"block text-sm font-medium leading-6 text-white"},"New Password")],-1),H={class:"mt-2"},L=["disabled"];var Z=(0,i.aZ)({__name:"ChangePassword",setup(e){const s=(0,d.L)(),t=(0,S.pm)(),n=(0,a.qj)({userName:"",password:"",newPassword:""}),l=(0,i.Fl)((()=>!!(n.userName&&n.password&&n.newPassword))),r=async()=>{const e=await s.changePassword(n.userName,n.password,n.newPassword);e?(n.userName="",n.password="",n.newPassword="",t.success("Password is updated successfully!")):t.error("Something went wrong!")};return(e,s)=>((0,i.wg)(),(0,i.iD)("div",C,[j,(0,i._)("div",q,[(0,i._)("form",{class:"space-y-6",onSubmit:(0,P.iM)(r,["prevent"])},[(0,i._)("div",null,[N,(0,i._)("div",U,[(0,i.wy)((0,i._)("input",{id:"userName",name:"userName","onUpdate:modelValue":s[0]||(s[0]=e=>n.userName=e),type:"text",required:!0,class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[P.nr,n.userName]])])]),(0,i._)("div",null,[D,(0,i._)("div",T,[(0,i.wy)((0,i._)("input",{id:"password",name:"password","onUpdate:modelValue":s[1]||(s[1]=e=>n.password=e),type:"password",autocomplete:"current-password",required:!0,class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[P.nr,n.password]])])]),(0,i._)("div",null,[V,(0,i._)("div",H,[(0,i.wy)((0,i._)("input",{id:"new_password",name:"new_password","onUpdate:modelValue":s[2]||(s[2]=e=>n.newPassword=e),type:"password",autocomplete:"new-password",required:!0,class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[P.nr,n.newPassword]])])]),(0,i._)("div",null,[(0,i._)("button",{type:"submit",class:"flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 mt-10",disabled:!l.value}," Confirm ",8,L)])],40,z)])]))}});const E=Z;var M=E,A=t(7148);const Y={class:"w-full max-w-lg py-20"},F=(0,i._)("div",{class:""},[(0,i._)("h2",{class:"text-2xl font-bold leading-9 tracking-tight text-white text-center"},"Send Email to Admin")],-1),W={class:"mt-10"},B=["onSubmit"],K=(0,i._)("label",{for:"email",class:"block text-sm font-medium leading-6 text-white"},"Email",-1),$={class:"mt-2"},I=(0,i._)("label",{for:"comment",class:"block text-sm font-medium leading-6 text-white"},"Comment",-1),G={class:"mt-2"},J=["disabled"];var O=(0,i.aZ)({__name:"Support",setup(e){const s=(0,d.L)(),t=(0,S.pm)(),n=(0,a.qj)({email:"",comment:""}),l=(0,i.Fl)((()=>!(!n.email||!n.comment))),r=async()=>{const e={to:A.g2,subject:"Support",text:`Hi,\r\n\n A user with email: ${n.email} want your support. \r\n${n.comment}`},i=await s.sendEmail(e);i?(t.success("Email sent successfully!"),n.email="",n.comment=""):t.error("Something went wrong")};return(e,s)=>((0,i.wg)(),(0,i.iD)("div",Y,[F,(0,i._)("div",W,[(0,i._)("form",{class:"space-y-6",onSubmit:(0,P.iM)(r,["prevent"])},[(0,i._)("div",null,[K,(0,i._)("div",$,[(0,i.wy)((0,i._)("input",{id:"email",name:"email","onUpdate:modelValue":s[0]||(s[0]=e=>n.email=e),type:"text",required:!0,class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[P.nr,n.email]])])]),(0,i._)("div",null,[I,(0,i._)("div",G,[(0,i.wy)((0,i._)("textarea",{id:"comment",name:"comment","onUpdate:modelValue":s[1]||(s[1]=e=>n.comment=e),rows:"4",class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[P.nr,n.comment]])])]),(0,i._)("div",null,[(0,i._)("button",{type:"submit",class:"flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 mt-10",disabled:!l.value}," Send ",8,J)])],40,B)])]))}});const Q=O;var R=Q;const X=e=>((0,i.dD)("data-v-7c20a132"),e=e(),(0,i.Cn)(),e),ee={class:"dashboard mx-auto mt-12"},se={class:"sm:hidden"},te=X((()=>(0,i._)("label",{for:"tabs",class:"sr-only"},"Select a tab",-1))),ie={id:"tabs",name:"tabs",class:"block w-full rounded-md border-none bg-white bg-opacity-5 py-2 pl-3 pr-10 text-base text-white shadow-sm ring-1 ring-inset ring-white ring-opacity-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"},ne=["selected"],ae={class:"hidden sm:block"},le={class:"flex border-b border-white border-opacity-10"},re={role:"list",class:"flex min-w-full flex-none gap-x-6 text-sm font-semibold leading-6 text-gray-400"},oe=["onClick"],de={class:"flex justify-center"};var ce=(0,i.aZ)({__name:"Profile",setup(e){const s=(0,a.qj)({tabs:[{name:"Profile",id:"profile",icon:l.Z},{name:"Change Password",id:"change-password",icon:r},{name:"Support",id:"support",icon:o}],currentTab:"profile"}),t=e=>{s.currentTab=e};return(e,a)=>((0,i.wg)(),(0,i.iD)("div",ee,[(0,i._)("div",se,[te,(0,i._)("select",ie,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.tabs,(e=>((0,i.wg)(),(0,i.iD)("option",{key:e.name,selected:e.id===s.currentTab},(0,n.zw)(e.name),9,ne)))),128))])]),(0,i._)("div",ae,[(0,i._)("nav",le,[(0,i._)("ul",re,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.tabs,(e=>((0,i.wg)(),(0,i.iD)("li",{key:e.id,class:(0,n.C_)([[e.id===s.currentTab?"border-indigo-500 text-indigo-600":"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700","group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"],"flex cursor-pointer"]),onClick:s=>t(e.id)},[((0,i.wg)(),(0,i.j4)((0,i.LL)(e.icon),{class:(0,n.C_)([e.id===s.currentTab?"text-indigo-500":"text-gray-400 group-hover:text-gray-500","-ml-0.5 mr-2 h-5 w-5"]),"aria-hidden":"true"},null,8,["class"])),(0,i._)("span",{class:(0,n.C_)(e.id===s.currentTab?"text-indigo-400":"")},(0,n.zw)(e.name),3)],10,oe)))),128))])])]),(0,i._)("div",de,["profile"===s.currentTab?((0,i.wg)(),(0,i.j4)(k,{key:0})):(0,i.kq)("",!0),"change-password"===s.currentTab?((0,i.wg)(),(0,i.j4)(M,{key:1})):(0,i.kq)("",!0),"support"===s.currentTab?((0,i.wg)(),(0,i.j4)(R,{key:2})):(0,i.kq)("",!0)])]))}}),ue=t(3744);const me=(0,ue.Z)(ce,[["__scopeId","data-v-7c20a132"]]);var we=me}}]);