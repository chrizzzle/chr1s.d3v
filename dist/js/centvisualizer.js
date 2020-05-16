"use strict";var dashboardAdd=document.querySelector(".dashboard__add"),dashboardEntries=document.querySelector(".dashboard__entries"),dashboardTotal=document.querySelector(".dashboard__total"),form=document.querySelector(".form"),dashboardAddForm=document.querySelector(".dashboard__add-entry"),dashboardAddClose=document.querySelector(".dashboard__add-entry-close"),storageKey="chr1s.d3v:centVisualizer",readEntries=function(){return window.localStorage?JSON.parse(window.localStorage.getItem(storageKey)||"[]"):(console.error("localStorage not found."),[])},deleteEntry=function(e){if(window.localStorage){var r=e.currentTarget.dataset.expense,n=readEntries().filter(function(e){return e.expense!==r});window.localStorage.setItem(storageKey,JSON.stringify(n)),renderEntries(),renderTotal()}else console.error("localStorage not found.")},createEntry=function(e){if(window.localStorage){var r=e.currentTarget,n=new FormData(r),t=parseInt(n.get("amountPerMonth"),10),a=calcAnimationDuration(t),d=100*calcEuroPerSecond(t),o={expense:n.get("expense"),amountPerMonth:t,centsPerSecond:d.toFixed(4),animationDuration:a},s=readEntries();s.push(o),window.localStorage.setItem(storageKey,JSON.stringify(s)),renderEntries(),renderTotal()}else console.error("localStorage not found.")},calcEuroPerSecond=function(e){return e/30/24/60/60},calcAnimationDuration=function(e){var r=100*calcEuroPerSecond(e);return"".concat(Math.round(1/r*1e3),"ms")},calcTotalItem=function(){var e=readEntries().reduce(function(e,r){return e.amountPerMonth+=parseInt(r.amountPerMonth,10),e.centsPerSecond+=parseFloat(r.centsPerSecond),e},{amountPerMonth:0,centsPerSecond:0,expense:"Total"});return e.animationDuration=calcAnimationDuration(e.amountPerMonth),e},renderItem=function(e,r){var n=document.createElement("div"),t=document.createElement("div"),a=document.createElement("div"),d=document.createElement("div"),o=document.createElement("button");return n.classList.add("dashboard__entry"),t.classList.add("dashboard__entry-inner"),t.style.animationDuration=e.animationDuration,d.classList.add("dashboard__entry-amount"),d.innerHTML="".concat(e.amountPerMonth,"€ / mo. = ").concat(e.centsPerSecond,"¢ / s"),a.classList.add("dashboard__entry-text"),a.innerHTML=e.expense,n.appendChild(t),n.appendChild(a),n.appendChild(d),r||(o.classList.add("dashboard__entry-del"),o.dataset.expense=e.expense,o.classList.add("material-icons"),o.innerHTML="close",o.addEventListener("click",deleteEntry),n.appendChild(o)),n},renderTotal=function(){dashboardTotal.innerHTML="";var e=calcTotalItem();if(0!==e.centsPerSecond){var r=renderItem(e,!0);dashboardTotal.appendChild(r)}},renderEntries=function(){var r,e=readEntries();dashboardEntries.innerHTML="",e.forEach(function(e){r=renderItem(e),dashboardEntries.appendChild(r)})},init=function(){0<readEntries().length&&(renderEntries(),renderTotal())};form.addEventListener("submit",createEntry),dashboardAdd.addEventListener("click",function(){dashboardAddForm.classList.remove("dashboard__add-entry--hidden"),dashboardAdd.classList.add("dashboard__add--hidden")}),dashboardAddClose.addEventListener("click",function(){dashboardAddForm.classList.add("dashboard__add-entry--hidden"),dashboardAdd.classList.remove("dashboard__add--hidden")}),init();