(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),r=t(15),u=t.n(r),i=(t(20),t(6)),o=t(3),l=t(0);function d(e){var n=e.handleFilterChange,t=e.filterValue;return Object(l.jsx)("div",{children:Object(l.jsxs)("div",{children:["filter shown with"," ",Object(l.jsx)("input",{onChange:n,value:t})]})})}function s(e){var n=e.name,t=e.number,c=e.submitHandler,a=e.nameChangeHandler,r=e.numberChangleHandler;return Object(l.jsx)("div",{children:Object(l.jsxs)("form",{onSubmit:c,children:[Object(l.jsxs)("div",{children:["name: ",Object(l.jsx)("input",{onChange:a,value:n})]}),Object(l.jsxs)("div",{children:["number: ",Object(l.jsx)("input",{onChange:r,value:t})]}),Object(l.jsx)("div",{children:Object(l.jsx)("button",{type:"submit",children:"add"})})]})})}function b(e){var n=e.person,t=e.handleNumberDelete,c=""===n.name?"unnamed":n.name;return Object(l.jsxs)("div",{children:[n.name," ",n.number," ",Object(l.jsx)("button",{onClick:function(){return t(c,n.id)},children:"delete"})]})}function j(e){var n=e.persons,t=e.filterValue,c=e.handleNumberDelete;return Object(l.jsx)("div",{children:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(l.jsx)(b,{person:e,handleNumberDelete:c},e.id)}))})}function f(e){var n=e.message,t={color:e.success?"green":"red",background:"lightgrey",fontSize:16,padding:10,marginBottom:10,borderRadius:5,borderStyle:"solid"};return Object(l.jsx)("div",{style:t,children:n})}var h=t(4),m=t.n(h),O="/api/persons",v={getAll:function(){return m.a.get(O).then((function(e){return e.data}))},create:function(e){return m.a.post(O,e).then((function(e){return e.data}))},update:function(e,n){return m.a.put("".concat(O,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return m.a.delete("".concat(O,"/").concat(e)).then((function(e){return e.data}))}},p=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),u=Object(o.a)(r,2),b=u[0],h=u[1],m=Object(c.useState)(""),O=Object(o.a)(m,2),p=O[0],g=O[1],x=Object(c.useState)(""),w=Object(o.a)(x,2),C=w[0],y=w[1],S=Object(c.useState)(null),D=Object(o.a)(S,2),k=D[0],H=D[1],N=Object(c.useState)(!0),T=Object(o.a)(N,2),A=T[0],F=T[1];Object(c.useEffect)((function(){v.getAll().then((function(e){a(e)})).catch((function(){H("There was an error fetching data"),F(!1)})).finally((function(){setTimeout((function(){H(null)}),5e3)}))}),[]);return Object(l.jsx)(l.Fragment,{children:Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Phonebook"}),null===k?null:Object(l.jsx)(f,{message:k,success:A}),Object(l.jsx)(d,{handleFilterChange:function(e){y(e.target.value)},value:C}),Object(l.jsx)("h2",{children:"add a new"}),Object(l.jsx)(s,{name:b,number:p,submitHandler:function(e){if(e.preventDefault(),t.some((function(e){return e.name===b}))){if(window.confirm("".concat(b," is already added to the phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===b})),c=Object(i.a)(Object(i.a)({},n),{},{number:p});v.update(c.id,c).then((function(e){a(t.map((function(n){return n.id!==c.id?n:e}))),H("Updated ".concat(e.name)),F(!0)})).catch((function(){H("Updating was not successful"),F(!1)})).finally((function(){h(""),g(""),setTimeout((function(){H(null)}),5e3)}))}}else v.create({name:b,number:p}).then((function(e){a(t.concat(e)),H("Added ".concat(e.name)),F(!0)})).catch((function(){H("".concat(b," couldn't be added")),F(!1)})).finally((function(){h(""),g(""),setTimeout((function(){H(null)}),5e3)}))},nameChangeHandler:function(e){h(e.target.value)},numberChangleHandler:function(e){g(e.target.value)}}),Object(l.jsx)("h2",{children:"Numbers"}),Object(l.jsx)(j,{persons:t,filterValue:C,handleNumberDelete:function(e,n){window.confirm("Delete ".concat(e,"?"))&&v.remove(n).then((function(){H("Deleted ".concat(e)),F(!0)})).catch((function(){H("".concat(e," has already been removed from server")),F(!1)})).finally((function(){a(t.filter((function(e){return e.id!==n}))),h(""),g(""),setTimeout((function(){H(null)}),5e3)}))}})]})})};u.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(p,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.be2cb10d.chunk.js.map