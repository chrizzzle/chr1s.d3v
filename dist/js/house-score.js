"use strict";for(var resultField,range,ranges=document.querySelectorAll(".form__range"),scoreField=document.querySelector(".form__score-number"),radios=document.querySelectorAll(".form__radio"),maxPriceField=document.getElementById("max-price"),idealSpaceField=document.getElementById("ideal-space-house"),idealSpacePropertyField=document.getElementById("ideal-space-property"),priceField=document.getElementById("price"),spaceField=document.getElementById("space-house"),spacePropertyField=document.getElementById("space-property"),form=document.querySelector(".form"),savedResultField=document.querySelector(".results"),savedResultNameField=document.querySelector(".form__result-name"),calcScore=function(){for(var e,r,t,n,s=0,a=0,o=0;o<ranges.length;o++)e=parseInt(ranges[o].getAttribute("max"),10),t=!!ranges[o].dataset.inverse,n=getGrading(ranges[o]),r=parseInt(ranges[o].value,10),a+=n,t=t?1-r/e:r/e,s+=t*=n;return s/a},getColorClass=function(e,r,t,n){t=t?1-e/r:e/r,e={1:{green:.5,orange:.25},2:{green:2/3,orange:1/3},3:{green:.75,orange:.5}};return t>e[n].green?"form__result--green":t>e[n].orange?"form__result--orange":"form__result--red"},getGrading=function(e){return parseInt(e.closest(".form__group").querySelector(".form__radio:checked").value,10)},setScore=function(){var e=calcScore(),e=getColorClass(e,1,!1,2);scoreField.innerHTML=Math.ceil(100*calcScore())+"/100",scoreField.classList.add(e)},setResult=function(e){(resultField=e.closest(".form__group").querySelector(".form__result")).innerHTML=e.value,resultField.classList.remove("form__result--red"),resultField.classList.remove("form__result--green"),resultField.classList.remove("form__result--orange");var r=getGrading(e),e=getColorClass(parseInt(e.value),parseInt(e.getAttribute("max")),!!e.dataset.inverse,r);resultField.classList.add(e)},onRangeInput=function(e){return function(){setResult(e),setScore()}},setMax=function(e,r){e.setAttribute("max",r)},saveResult=function(){var e,r;window.localStorage&&(e=JSON.parse(window.localStorage.getItem("house-score-results")||"[]"),r=savedResultNameField.value||"House-".concat(e.length),e.push({name:r,score:calcScore(),scoreText:scoreField.innerHTML}),window.localStorage.setItem("house-score-results",JSON.stringify(e)))},removeResult=function(r){var e;window.localStorage&&(e=JSON.parse(window.localStorage.getItem("house-score-results")||"[]").filter(function(e){return e.name!==r}),window.localStorage.setItem("house-score-results",JSON.stringify(e)))},onRemoveResult=function(e){return function(){removeResult(e),renderResults()}},renderResults=function(){if(window.localStorage){var e=JSON.parse(window.localStorage.getItem("house-score-results")||"[]");if(savedResultField.innerHTML="",e.length<=0)savedResultField.innerHTML="No saved scores.";else for(var r=0;r<e.length;r++){var t=document.createElement("div"),n=document.createElement("button"),s=document.createElement("i");s.classList.add("material-icons"),s.innerHTML="close",n.classList.add("result__delete"),n.setAttribute("type","button"),n.appendChild(s),t.classList.add("result__item"),s=getColorClass(e[r].score,1,!1,2),t.classList.add(s),t.innerHTML=e[r].name+" - "+e[r].scoreText,t.appendChild(n),savedResultField.appendChild(t),n.addEventListener("click",onRemoveResult(e[r].name))}}},i=0;i<ranges.length;i++)ranges[i].addEventListener("input",onRangeInput(ranges[i])),ranges[i].addEventListener("change",onRangeInput(ranges[i])),setResult(ranges[i]);for(var _i=0;_i<radios.length;_i++)range=radios[_i].closest(".form__group").querySelector(".form__range"),radios[_i].addEventListener("input",onRangeInput(range)),radios[_i].addEventListener("change",onRangeInput(range));maxPriceField.addEventListener("change",function(){setMax(priceField,maxPriceField.value)}),idealSpaceField.addEventListener("change",function(){setMax(spaceField,idealSpaceField.value)}),idealSpacePropertyField.addEventListener("change",function(){setMax(spacePropertyField,idealSpacePropertyField.value)}),form.addEventListener("submit",function(e){e.preventDefault(),e.stopPropagation(),saveResult(),renderResults()}),setScore(),renderResults();
//# sourceMappingURL=house-score.js.map
