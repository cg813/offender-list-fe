"use strict";(self["webpackChunkoffender"]=self["webpackChunkoffender"]||[]).push([[18],{6018:function(e,s,i){i.r(s),i.d(s,{default:function(){return R}});i(7658);var t=i(6252),l=i(9963),a=i(2262),n=i(3577),o=i(3560),r=i(3002),d=i(2244),u=i(2201),m=i(7148);const c={class:"flex flex-1 flex-col justify-center px-6 py-20"},g=(0,t._)("div",{class:"sm:mx-auto sm:w-full sm:max-w-sm"},[(0,t._)("h2",{class:"mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white"},"Register a new user")],-1),w={class:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm"},p=["onSubmit"],f=(0,t._)("label",{for:"userName",class:"block text-sm font-medium leading-6 text-white"},"User Name",-1),b={class:"mt-2"},x=(0,t._)("label",{for:"email",class:"block text-sm font-medium leading-6 text-white"},"Email",-1),h={class:"mt-2"},v=(0,t._)("div",{class:""},[(0,t._)("label",{for:"password",class:"block text-sm font-medium leading-6 text-white"},"Password")],-1),y={class:"mt-2"},_=(0,t._)("label",{for:"role",class:"block text-sm font-medium leading-6 text-white"},"Role",-1),k=["value"],U=["value"],N=(0,t._)("label",{for:"plan",class:"block text-sm font-medium leading-6 text-white"},"Plan",-1),S=["value"],z=["disabled"];var q=(0,t.aZ)({__name:"Signup",setup(e){const s=(0,o.L)(),i=(0,u.tv)(),q=(0,r.pm)(),A=(0,a.qj)({userName:"",email:"",password:"",role:d.uA.USER,plan:m.z5[0].id}),R=(0,t.Fl)((()=>!!(A.userName&&A.email&&A.password)));(0,t.YP)((()=>s.isLoading),(()=>{s.isLoading||s.user?.role===d.uA.ADMIN||i.push("/detect")}));const D=async()=>{const e=m.z5.find((e=>e.id===A.plan));if(!e)return void q.error("Incorrect Plan!");const i={userName:A.userName,email:A.email,password:A.password,role:A.role,plan:A.plan,availableRequests:e.requests},t=await s.register(i);t?(q.success("User added successfully!"),A.userName="",A.password="",A.email=""):q.error("Something went wrong!")};return(e,s)=>((0,t.wg)(),(0,t.iD)("div",c,[g,(0,t._)("div",w,[(0,t._)("form",{class:"space-y-6",onSubmit:(0,l.iM)(D,["prevent"])},[(0,t._)("div",null,[f,(0,t._)("div",b,[(0,t.wy)((0,t._)("input",{id:"userName",name:"userName","onUpdate:modelValue":s[0]||(s[0]=e=>A.userName=e),type:"text",required:!0,class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[l.nr,A.userName]])])]),(0,t._)("div",null,[x,(0,t._)("div",h,[(0,t.wy)((0,t._)("input",{id:"email",name:"email","onUpdate:modelValue":s[1]||(s[1]=e=>A.email=e),type:"email",required:!0,class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[l.nr,A.email]])])]),(0,t._)("div",null,[v,(0,t._)("div",y,[(0,t.wy)((0,t._)("input",{id:"password",name:"password","onUpdate:modelValue":s[2]||(s[2]=e=>A.password=e),type:"password",autocomplete:"current-password",required:!0,class:"block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},null,512),[[l.nr,A.password]])])]),(0,t._)("div",null,[_,(0,t.wy)((0,t._)("select",{id:"role",name:"role","onUpdate:modelValue":s[3]||(s[3]=e=>A.role=e),class:"capitalize block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},[(0,t._)("option",{value:(0,a.SU)(d.uA).USER,class:"capitalize text-black"},(0,n.zw)((0,a.SU)(d.uA).USER),9,k),(0,t._)("option",{value:(0,a.SU)(d.uA).ADMIN,class:"capitalize text-black"},(0,n.zw)((0,a.SU)(d.uA).ADMIN),9,U)],512),[[l.bM,A.role]])]),(0,t._)("div",null,[N,(0,t.wy)((0,t._)("select",{id:"plan",name:"plan","onUpdate:modelValue":s[4]||(s[4]=e=>A.plan=e),class:"capitalize block w-full rounded-md border-0 bg-white bg-opacity-5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"},[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,a.SU)(m.z5),(e=>((0,t.wg)(),(0,t.iD)("option",{key:e.id,value:e.id,class:"capitalize text-black"},(0,n.zw)(`${e.id}: ${e.requests} requests per ${e.frequency} `),9,S)))),128))],512),[[l.bM,A.plan]])]),(0,t._)("div",null,[(0,t._)("button",{type:"submit",class:"flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 mt-10",disabled:!R.value}," Register ",8,z)])],40,p)])]))}});const A=q;var R=A}}]);