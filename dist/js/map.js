"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}var Map=function(){function t(e){_classCallCheck(this,t),this._size=e,this._fields=[],this._fieldTypes={field:"1",apple:"2",blocked:"3"},this.generateMap()}return _createClass(t,[{key:"getFields",value:function(){return this._fields}},{key:"generateMap",value:function(){for(var e=0;e<this._size;e++)for(var t=0;t<this._size;t++)this._fields[e]||(this._fields[e]=[]),this._fields[e][t]=this._fieldTypes.field}},{key:"placeApple",value:function(e){var t,i;e=e||[];for(var s=0;s<e.length;s++)i=e[s][0],t=e[s][1],this._fields[i][t]=this._fieldTypes.blocked;for(var l=[],a=0;a<this._fields.length;a++)for(var n=0;n<this._fields[a].length;n++)this._fields[a][n]!==this._fieldTypes.blocked&&l.push([a,n]);var r=l[Math.round(Math.random()*(l.length-1))];this.generateMap(),this._fields[r[0]][r[1]]=this._fieldTypes.apple,this.renderApple(r[0],r[1])}},{key:"renderApple",value:function(e,t){var i=document.querySelector(".apple");i&&i.remove();var s=document.createElement("img");s.setAttribute("src","img/mario/apple.svg"),s.classList.add("apple"),document.querySelector(".field-".concat(e,"-").concat(t)).appendChild(s)}},{key:"render",value:function(e){for(var t,i,s,l=0;l<this._fields.length;l++){(i=document.createElement("div")).classList.add("row");for(var a=0;a<this._fields[l].length;a++)(s=document.createElement("div")).classList.add("field__inner"),(t=document.createElement("div")).classList.add("field"),t.classList.add("field-".concat(l,"-").concat(a)),t.appendChild(s),i.appendChild(t);e.appendChild(i)}}}]),t}();