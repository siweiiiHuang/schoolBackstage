/* empty css             *//* empty css                  *//* empty css                  *//* empty css                 */import{u as b,r as u,a as g,E as V,b as x,c as E,d as k,e as v,o as y,f as C,g as o,w as l,h as F,l as B,t as p}from"./index.4822f342.js";const I={class:"w-full min-h-screen flex justify-center items-center"},R=F("\u767B\u5F55"),z={__name:"index",setup(U){const d=b(),e=u({phone:"",password:"",remeber:!1}),c=()=>{console.log(e.phone)},i=u({phone:[{required:!0,message:"\u8D26\u53F7\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],password:[{required:!0,message:"\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}]}),n=g(null),_=()=>{n.value.validate(a=>{if(!a)return console.log("error submit!!"),!1;B(e.phone,e.password,e.remeber).then(t=>{t.data.code===10?(p("\u767B\u5F55\u6210\u529F"),d.push("/")):p("\u767B\u5F55\u5931\u8D25","error")})})};return(a,t)=>{const m=V,r=x,f=E,h=k,w=v;return y(),C("div",I,[o(w,{model:e,class:"w-[250px]",rules:i,ref_key:"formRef",ref:n},{default:l(()=>[o(r,{label:"\u8D26\u53F7",prop:"phone"},{default:l(()=>[o(m,{modelValue:e.phone,"onUpdate:modelValue":t[0]||(t[0]=s=>e.phone=s),onChange:c},null,8,["modelValue"])]),_:1}),o(r,{label:"\u5BC6\u7801",prop:"password"},{default:l(()=>[o(m,{modelValue:e.password,"onUpdate:modelValue":t[1]||(t[1]=s=>e.password=s),"show-password":""},null,8,["modelValue"])]),_:1}),o(r,null,{default:l(()=>[o(r,{label:"\u8BB0\u4F4F\u6211"},{default:l(()=>[o(f,{modelValue:e.remeber,"onUpdate:modelValue":t[2]||(t[2]=s=>e.remeber=s)},null,8,["modelValue"])]),_:1}),o(h,{type:"primary",onClick:_,class:"w-[250px]"},{default:l(()=>[R]),_:1})]),_:1})]),_:1},8,["model","rules"])])}}};export{z as default};
