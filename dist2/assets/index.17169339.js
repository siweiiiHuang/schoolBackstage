/* empty css                  *//* empty css                     *//* empty css                  *//* empty css                 */import{u as b,r as m,a as g,E as V,b as x,c as E,d as k,e as v,o as y,f as C,g as o,w as t,h as B,l as R,t as p}from"./index.616ddf34.js";const U={class:"w-full min-h-screen flex justify-center items-center"},q=B("\u767B\u5F55"),z={__name:"index",setup(F){const d=b(),e=m({phone:"",password:"",remeber:!1}),i=()=>{console.log(e.phone)},c=m({phone:[{required:!0,message:"\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],password:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]}),n=g(null),_=()=>{n.value.validate(a=>{if(!a)return console.log("error submit!!"),!1;R(e.phone,e.password,e.remeber).then(l=>{l.data.code===10?(p("\u767B\u5F55\u6210\u529F"),d.push("/")):p("\u767B\u5F55\u5931\u8D25","error")})})};return(a,l)=>{const u=V,r=x,f=E,h=k,w=v;return y(),C("div",U,[o(w,{model:e,class:"w-[250px]",rules:c,ref_key:"formRef",ref:n},{default:t(()=>[o(r,{label:"\u8D26\u53F7",prop:"phone"},{default:t(()=>[o(u,{modelValue:e.phone,"onUpdate:modelValue":l[0]||(l[0]=s=>e.phone=s),onChange:i},null,8,["modelValue"])]),_:1}),o(r,{label:"\u5BC6\u7801",prop:"password"},{default:t(()=>[o(u,{modelValue:e.password,"onUpdate:modelValue":l[1]||(l[1]=s=>e.password=s),"show-password":""},null,8,["modelValue"])]),_:1}),o(r,null,{default:t(()=>[o(r,{label:"\u8BB0\u4F4F\u6211"},{default:t(()=>[o(f,{modelValue:e.remeber,"onUpdate:modelValue":l[2]||(l[2]=s=>e.remeber=s)},null,8,["modelValue"])]),_:1}),o(h,{type:"primary",onClick:_,class:"w-[250px]"},{default:t(()=>[q]),_:1})]),_:1})]),_:1},8,["model","rules"])])}}};export{z as default};
