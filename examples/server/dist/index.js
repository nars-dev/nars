parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"yvO7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.offWhite="rgb(245,248,249)",exports.dark="#283336",exports.darkGreen="#169099",exports.green="#24B7B2",exports.lightGreen="#99D8B7",exports.yellow="#E5BA39",exports.orange="#E57A2D";
},{}],"uKfT":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("react")),n=require("./Colors"),r=require("nars"),a=r.StyleSheet.create({container:{paddingHorizontal:20},textInput:{paddingHorizontal:15,paddingVertical:10,borderRadius:3,fontSize:16,fontFamily:"Fira Code",color:n.offWhite,backgroundColor:"#369DA5"},isCompany:{fontSize:16,fontFamily:"Fira Code",color:n.offWhite},submitText:{borderRadius:3,fontSize:16,fontFamily:"Fira Code",color:n.offWhite,textAlign:"center",paddingVertical:15,paddingHorizontal:28,backgroundColor:n.yellow},elementContainer:{paddingTop:20},companySwitchContainer:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},centeredContents:{alignItems:"center"}});var o;!function(e){e[e.Bool=0]="Bool",e[e.String=1]="String",e[e.Submit=2]="Submit"}(o||(o={}));const i=e=>({key:e,fieldType:o.String,name:e}),l=e=>({general:["name","surname","email","role"].map(i),userSpecific:e?["Tax#","Number of employees"].map(i):["ID number","birthdate"].map(i)}),c=({item:e})=>{switch(e.fieldType){case o.String:return t.createElement(r.View,{style:a.elementContainer},t.createElement(r.TextInput,{placeholderTextColor:"#7AC7CC",style:a.textInput,placeholder:e.name,value:""}));case o.Bool:return t.createElement(r.View,{style:a.elementContainer},t.createElement(r.View,{style:a.companySwitchContainer},t.createElement(r.Text,{style:a.isCompany},"Are you a company"),t.createElement(r.Switch,{onValueChange:e.onSet,value:e.value})));case o.Submit:return t.createElement(r.TouchableOpacity,null,t.createElement(r.View,{style:[a.elementContainer,a.centeredContents]},t.createElement(r.Text,{style:a.submitText},"Submit")));default:throw"Unreachable"}};function u(e){const[n,a]=t.useState(!1),i=l(n);return t.createElement(r.FlatList,{data:[...i.general,{fieldType:o.Bool,onSet:a,value:n,key:"Is Company"},...i.userSpecific,{fieldType:o.Submit,key:"Submit"}],keyExtractor:({item:{key:e}})=>e,renderItem:c})}exports.default=u;
},{"./Colors":"yvO7"}],"QrU2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.config={Form:{props:{},localProps:{}},Feed:{props:{},localProps:{}}};
},{}],"Ziky":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("faker"));var r;!function(e){e[e.Text=0]="Text",e[e.Image=1]="Image",e[e.Loading=2]="Loading"}(r=exports.PostType||(exports.PostType={})),exports.generatePosts=(()=>{const e=[()=>({type:r.Text,text:t.lorem.sentence(),id:t.random.uuid()}),()=>({type:r.Image,src:t.image.imageUrl(),text:t.lorem.sentence(),id:t.random.uuid()})];return Array.from({length:7}).map(()=>Object.assign({},e[Math.floor(Math.random()*e.length)]()))});
},{}],"xFzC":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("react")),r=require("nars"),l=()=>t.createElement(r.View,{style:a.elementContainer},t.createElement(r.View,{style:a.contentContainer},t.createElement(r.View,{style:a.fakeImage}),t.createElement(r.View,{style:a.textPlaceholdersContainer},t.createElement(r.View,{style:a.titlePlaceholder}),t.createElement(r.View,{style:a.subtitlePlaceholder})))),a=r.StyleSheet.create({contentContainer:{flexDirection:"row"},elementContainer:{paddingTop:20},fakeImage:{width:43,height:43,borderRadius:3,backgroundColor:"#EAEDEE"},textPlaceholdersContainer:{flex:1,justifyContent:"space-between",marginLeft:8},titlePlaceholder:{width:"30%",height:22,borderRadius:3,backgroundColor:"#EAEDEE",marginBottom:8},subtitlePlaceholder:{width:"60%",height:22,borderRadius:3,backgroundColor:"#EAEDEE"}});exports.default=l;
},{}],"abbY":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("react")),r=require("nars"),o=require("../Colors"),a=({text:e})=>t.createElement(r.View,{style:n.elementContainer},t.createElement(r.Text,{style:i.text},e)),n=r.StyleSheet.create({container:{paddingHorizontal:20},elementContainer:{paddingTop:20}}),i=r.StyleSheet.create({text:{fontSize:16,fontFamily:"Fira Code",color:o.dark,padding:16,backgroundColor:o.offWhite,borderRadius:3}});exports.default=a;
},{"../Colors":"yvO7"}],"VzrA":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("react")),r=require("nars"),a=require("../Colors"),n=({imageSrc:e,caption:a})=>t.createElement(r.View,{style:i.elementContainer},t.createElement(r.View,{style:i.contentContainer},t.createElement(r.Image,{style:i.image,source:e}),t.createElement(r.Text,{style:i.text},a))),i=r.StyleSheet.create({text:{fontSize:16,fontFamily:"Fira Code",color:a.dark,paddingTop:16},image:{width:"100%",height:void 0,aspectRatio:29/18},elementContainer:{paddingTop:20},contentContainer:{padding:16,backgroundColor:a.offWhite,borderRadius:3}});exports.default=n;
},{"../Colors":"yvO7"}],"aeVl":[function(require,module,exports) {
"use strict";var e=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const r=e(require("react")),n=require("nars"),a=require("./postGenerator"),o=t(require("./components/Loading")),s=t(require("./components/TextPost")),i=t(require("./components/ImagePost")),u=({item:e})=>{switch(e.type){case a.PostType.Text:return r.createElement(s.default,{text:e.text});case a.PostType.Image:return r.createElement(i.default,{imageSrc:e.src,caption:e.text});case a.PostType.Loading:return r.createElement(o.default,null)}};function c(e){const[t,o]=r.useState(a.generatePosts);return r.useEffect(()=>{setTimeout(()=>{o([...t,...a.generatePosts()])},1e3)},[]),r.createElement(n.FlatList,{onEndReached:()=>{o([...t,...a.generatePosts()])},onEndReachedThreshold:.3,data:[...t,{id:"loading",type:a.PostType.Loading}],keyExtractor:e=>e.item.id,renderItem:u})}exports.default=c;
},{"./postGenerator":"Ziky","./components/Loading":"xFzC","./components/TextPost":"abbY","./components/ImagePost":"VzrA"}],"zo2T":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const r=require("nars"),t=require("ws"),u=e(require("./Form")),i=require("../common"),o=e(require("./Feed")),a={Form:u.default,Feed:o.default},s=r.Static.createRouter(i.config,a),c=new t.Server({port:9e3});r.Static.attatchListener(c,s);
},{"./Form":"uKfT","../common":"QrU2","./Feed":"aeVl"}]},{},["zo2T"], null)
//# sourceMappingURL=/index.js.map