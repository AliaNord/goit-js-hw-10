import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as o}from"./assets/vendor-77e16229.js";document.querySelector(".form").addEventListener("submit",function(e){e.preventDefault();const i=parseInt(e.target.delay.value),s=e.target.state.value;r(i,s).then(t=>{o.success({position:"topRight",title:"Success",message:`Fulfilled promise in ${t}ms`})}).catch(t=>{o.error({position:"topRight",title:"Error",message:`Rejected promise in ${t}ms`})})});function r(e,i){return new Promise((s,t)=>{setTimeout(()=>{i==="fulfilled"?s(e):t(e)},e)})}
//# sourceMappingURL=commonHelpers2.js.map