(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{22:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),o=t.n(c),r=t(17),a=t.n(r),u=(t(22),t(8)),i=t(3),s=t(0),l=function(e){var n=e.onChange,t=Object(c.useState)(""),o=Object(i.a)(t,2),r=o[0],a=o[1];return Object(s.jsxs)("div",{children:["filter shown with:",Object(s.jsx)("input",{value:r,onChange:function(e){a(e.target.value),n(e.target.value)}})]})},d=function(e){var n=e.type,t=e.message;return null===t?null:Object(s.jsx)("div",{className:n,children:t})},j=function(e){var n=e.onSubmit,t=Object(c.useState)(""),o=Object(i.a)(t,2),r=o[0],a=o[1],u=Object(c.useState)(""),l=Object(i.a)(u,2),d=l[0],j=l[1];return Object(s.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n(r,d)&&(a(""),j(""))},children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{placeholder:"Add Name",value:r,onChange:function(e){a(e.target.value)},required:!0})]}),Object(s.jsxs)("div",{children:["number: ",Object(s.jsx)("input",{placeholder:"Add Phonenumber",value:d,onChange:function(e){j(e.target.value)},required:!0})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.persons,t=e.onDelete;return Object(s.jsx)("div",{children:n.map((function(e){return Object(s.jsxs)("div",{children:[Object(s.jsxs)("p",{style:{display:"inline"},children:[e.name," ",e.number]}),Object(s.jsx)("button",{onClick:function(){return t(e.id)},children:"Delete"})]},e.id)}))})},f=t(4),h=t.n(f),O="/api/persons",m={getAll:function(){return h.a.get(O).then((function(e){return e.data}))},create:function(e){return h.a.post(O,e).then((function(e){return e.data}))},update:function(e,n){return h.a.put("".concat(O,"/").concat(e),n).then((function(e){return e.data}))},deletePerson:function(e){return h.a.delete("".concat(O,"/").concat(e))}},p=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],r=Object(c.useState)(null),a=Object(i.a)(r,2),f=a[0],h=a[1],O=Object(c.useState)(""),p=Object(i.a)(O,2),v=p[0],x=p[1],g=Object(c.useState)(null),w=Object(i.a)(g,2),y=w[0],C=w[1];Object(c.useEffect)((function(){m.getAll().then((function(e){o(e)}))}),[]);return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(d,{type:v,message:y}),Object(s.jsx)(l,{onChange:function(e){var n=e?t.filter((function(n){return n.name.toLowerCase().includes(e.toLowerCase())})):null;h(n)}}),Object(s.jsx)("h3",{children:"Add a New Contact"}),Object(s.jsx)(j,{onSubmit:function(e,n){var c=t.find((function(n){return n.name.toLowerCase()===e.toLowerCase()}));if(!c){var r={name:e,number:n};return m.create(r).then((function(n){x("success"),C("Added ".concat(e)),setTimeout((function(){x(""),C(null)}),5e3),o(t.concat(n))})).catch((function(e){console.log(e.response.data),x("error"),C(e.response.data.error),setTimeout((function(){x(""),C(null)}),5e3)})),1}if(window.confirm("".concat(e," is already added to phonebook, replace the old number with the new one?"))){var a=Object(u.a)(Object(u.a)({},c),{},{number:n});return m.update(c.id,a).then((function(n){x("success"),C("".concat(e,"'s information has been successfully changed")),setTimeout((function(){x(""),C(null)}),5e3),o(t.map((function(e){return e.id!==c.id?e:n})))})).catch((function(e){console.log(e.response.data),x("error"),C(e.response.data.error),setTimeout((function(){x(""),C(null)}),5e3)})),1}}}),Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)(b,{persons:f||t,onDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Do you really want to delete ".concat(n.name,"?"))&&(m.deletePerson(e).then((function(){x("success"),C("".concat(n.name,"'s information has been deleted"))})).catch((function(e){x("error"),C("Information of ".concat(n.name," has already been removed from server"))})),setTimeout((function(){x(""),C(null)}),5e3),o(t.filter((function(n){return n.id!==e}))))}})]})};a.a.render(Object(s.jsx)(o.a.StrictMode,{children:Object(s.jsx)(p,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.795c503e.chunk.js.map