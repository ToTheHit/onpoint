(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{25:function(t,e,n){},26:function(t,e,n){},55:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r);n(25),n(26);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var s=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(f,t);var e,n,r,i=a(f);function f(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),(e=i.call(this,t)).containerRef=o.a.createRef(),e.state={N:3,NF:30,i:0,x0:null,locked:!1,w:null,ini:null,fin:null,rID:null,anf:null},e}return e=f,(n=[{key:"stopAni",value:function(){cancelAnimationFrame(this.state.rID),this.setState({rID:null})}},{key:"ani",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.state,n=e.ini,r=e.fin,o=e.anf;this.containerRef.current.style.setProperty("--i",n+(r-n)*t/o),t!==o?this.setState({rID:requestAnimationFrame(this.ani.bind(this,++t))}):this.stopAni()}},{key:"unify",value:function(t){return t.changedTouches?t.changedTouches[0]:t}},{key:"lock",value:function(t){this.setState({x0:this.unify(t).clientX,locked:!0})}},{key:"drag",value:function(t){t.preventDefault();var e=this.state,n=e.locked,r=e.x0,o=e.w,i=e.i;if(n){var u=+((this.unify(t).clientX-r)/o).toFixed(2);this.containerRef.current.style.setProperty("--i",i-u)}}},{key:"move",value:function(t){var e=this.state,n=e.locked,r=e.x0,o=e.w,i=e.i,u=e.NF,c=e.N;if(n){var a=i,f=this.unify(t).clientX-r,l=Math.sign(f),s=+(l*f/o).toFixed(2);(a>0||l<0)&&(a<c-1||l>0)&&s>.2&&(a-=l,s=1-s),this.ani(),this.setState({i:a,ini:a-l*s,fin:i,anf:Math.round(s*u),x0:null,locked:!1})}}},{key:"render",value:function(){return function(t){if(null==t)throw new TypeError("Cannot destructure undefined")}(this.state),o.a.createElement("div",{className:"App",ref:this.containerRef},o.a.createElement("div",{style:{background:"#00bcd4"}},"1"),o.a.createElement("div",{style:{background:"#6dc5a3"}},"2"),o.a.createElement("div",{style:{background:"#91E59A"}},"3"))}}])&&u(e.prototype,n),r&&u(e,r),f}(r.Component);e.default=s}}]);