"use strict";(self["webpackChunkoffender"]=self["webpackChunkoffender"]||[]).push([[481],{1481:function(e,t,s){s.r(t),s.d(t,{default:function(){return q}});s(7658);var l=s(6252),a=s(3577),i=s(2262),d=s(9530),n=s(3560),o=s(2244),c=s(2201),p=s(3530);const r=e=>((0,l.dD)("data-v-730bb378"),e=e(),(0,l.Cn)(),e),m={class:"bg-gray-900"},u={class:"mx-auto members"},w={class:"bg-gray-900 py-20"},f={class:""},x=r((()=>(0,l._)("div",{class:"sm:flex-auto"},[(0,l._)("h1",{class:"text-2xl font-semibold leading-6 text-white"},"Plans"),(0,l._)("p",{class:"mt-2 text-sm text-gray-300"},"List of all the plans")],-1))),_={class:"mt-8 flow-root"},v={class:"-my-2 overflow-x-auto"},y={class:"inline-block min-w-full py-2 align-middle"},h={class:"min-w-full divide-y divide-gray-700"},b=r((()=>(0,l._)("thead",null,[(0,l._)("tr",null,[(0,l._)("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"},"Name"),(0,l._)("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"},"Rows"),(0,l._)("th",{scope:"col",class:"py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"},"Frequency")])],-1))),g={class:"divide-y divide-gray-800"},k={class:"whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"},C={class:"whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"},D={class:"whitespace-nowrap px-3 py-4 text-sm text-gray-300 capitalize"};var P=(0,l.aZ)({__name:"Plans",setup(e){const t=(0,n.L)(),s=(0,d.W)(),r=(0,c.tv)(),P=(0,p.d)("add-plan"),z=(0,i.iH)([]),L=(0,i.iH)(!1);(0,l.bv)((()=>{q()})),(0,l.YP)((()=>t.isLoading),(()=>{t.isLoading||t.user?.role===o.u.ADMIN||r.push("/detect")}));const q=async()=>{L.value=!1,z.value=await s.fetchPlans(),L.value=!0},H=()=>{P.show({refresh:q})};return(e,t)=>((0,l.wg)(),(0,l.iD)("div",m,[(0,l._)("div",u,[(0,l._)("div",w,[(0,l._)("div",f,[(0,l._)("div",{class:"sm:flex sm:items-center"},[x,(0,l._)("button",{onClick:H,class:"text-white border border-gray-400 px-2 py-1 rounded"}," Create New Plan ")]),(0,l._)("div",_,[(0,l._)("div",v,[(0,l._)("div",y,[(0,l._)("table",h,[b,(0,l._)("tbody",g,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(z.value,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e._id},[(0,l._)("td",k,(0,a.zw)(e.name),1),(0,l._)("td",C,(0,a.zw)(e.requests),1),(0,l._)("td",D,(0,a.zw)(e.frequency),1)])))),128))])])])])])])])])]))}}),z=s(3744);const L=(0,z.Z)(P,[["__scopeId","data-v-730bb378"]]);var q=L}}]);