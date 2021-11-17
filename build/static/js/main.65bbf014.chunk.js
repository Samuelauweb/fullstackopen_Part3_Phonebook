(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var a=t(17),c=t.n(a),r=t(8),o=t(3),u=t(1),i=t(0),s=function(e){var n=e.person,t=e.handleDeleteChange;return Object(i.jsxs)("div",{children:[n.name," ",n.number," ",Object(i.jsx)("button",{onClick:t,children:"delete"})]})},l=function(e){var n=e.filteredPerson,t=e.handleDeleteChange;return Object(i.jsx)("ul",{children:n.map((function(e){return Object(i.jsx)(s,{person:e,handleDeleteChange:t(e.name,e.id)},e.id)}))})},d=function(e){var n=e.search,t=e.handleSearchChange;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},h=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,c=e.newNumber,r=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:a})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:c,onChange:r})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},j=t(4),f=t.n(j),b="http://localhost:3001/api/persons",m={getAll:function(){return f.a.get(b)},create:function(e){return f.a.post(b,e)},update:function(e,n){return f.a.put("".concat(b,"/").concat(e),n)},deletePerson:function(e){return f.a.delete("".concat(b,"/").concat(e))}},O=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{className:"notification notification-".concat(n.type),children:n.text})},p=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],a=n[1],c=Object(u.useState)(""),s=Object(o.a)(c,2),j=s[0],f=s[1],b=Object(u.useState)(""),p=Object(o.a)(b,2),g=p[0],x=p[1],v=Object(u.useState)(""),w=Object(o.a)(v,2),C=w[0],y=w[1],N=Object(u.useState)("some message..."),S=Object(o.a)(N,2),P=S[0],D=S[1];Object(u.useEffect)((function(){console.log("GET request"),m.getAll().then((function(e){console.log(e.data),a(e.data)}))}),[]);var T=t.filter((function(e){return e.name.toLowerCase().includes(C)}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(O,{message:P}),Object(i.jsx)(d,{search:C,handleSearchChange:function(e){console.log(e.target.value),y(e.target.value)}}),Object(i.jsx)("h2",{children:"add a new person"}),Object(i.jsx)(h,{addPerson:function(e){e.preventDefault();var n={name:j,number:g,id:Math.floor(101*Math.random())};if(t.filter((function(e){return e.name===n.name})).length>0){if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var c=t.find((function(e){return e.name===j})),o=Object(r.a)(Object(r.a)({},c),{},{number:g});m.update(c.id,o).then((function(e){a(t.map((function(n){return n.id!==c.id?n:e.data}))),D({text:"Updated ".concat(o.name),type:"success"}),f(""),x(""),setTimeout((function(){D(null)}),3e3)})).catch((function(e){D({text:"Information of ".concat(o.name," has already been removed from server"),type:"error"}),console.log(e)}))}}else m.create(n).then((function(e){console.log("POST request"),a(t.concat(e.data)),D({text:"Added ".concat(n.name),type:"success"}),f(""),x(""),setTimeout((function(){D(null)}),3e3)}))},newName:j,handleNameChange:function(e){f(e.target.value)},newNumber:g,handleNumberChange:function(e){x(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(l,{filteredPerson:T,handleDeleteChange:function(e,n){return function(){window.confirm("Delete ".concat(e," ?"))&&m.deletePerson(n).then((function(){a(t.filter((function(e){return e.id!==n}))),D({text:"Deleted ".concat(e),type:"success"}),setTimeout((function(){D(null)}),3e3)})).catch((function(n){D({text:"The person '".concat(e,"' was already deleted from server"),type:"error"})}))}}})]})};t(41);c.a.render(Object(i.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.65bbf014.chunk.js.map