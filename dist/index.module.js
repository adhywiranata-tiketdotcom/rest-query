import{createContext as t,useEffect as e,useState as r,createElement as n,useContext as o,useCallback as i}from"react";function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}).apply(this,arguments)}var c=t({store:null}),s=function(t){try{return Promise.resolve(window.fetch(t)).then(function(t){return Promise.resolve(t.json())})}catch(t){return Promise.reject(t)}},u=function(t,e){try{return Promise.resolve(window.fetch(t,{method:"POST",body:JSON.stringify(e)})).then(function(t){return Promise.resolve(t.json())})}catch(t){return Promise.reject(t)}};function h(t){e(t,[])}var l="[TIX REST QUERY WARNING]",f="[TIX REST QUERY ERROR]",d=function(){var t;(t=console).warn.apply(t,[l].concat([].slice.call(arguments)))},m=function(){var t;(t=console).error.apply(t,[f].concat([].slice.call(arguments)))},v=window.localStorage,y=function(){function t(){}return t.save=function(e,r){var n=t.getStore();n[e]=r,t.setStore(n)},t.getStore=function(){return JSON.parse(v.getItem("tix_rest_query_persisted_cache")||"{}")},t.setStore=function(t){v.setItem("tix_rest_query_persisted_cache",JSON.stringify(t))},t.removeStore=function(){v.removeItem("tix_rest_query_persisted_cache")},t}();function p(t){var e=t.children,o=y.getStore(),i=r(o),s=i[0],u=i[1];return n(c.Provider,{value:{store:s,getCachedData:function(t){if(!s[t])return null;try{var e;return JSON.parse(null==(e=s[t])?void 0:e.data)}catch(t){return m("something went wrong when deserializing data ",t),null}},setCacheData:function(t,e,r){var n,o={data:JSON.stringify(e),cacheStoredAt:null,cacheExpiredAt:null};r.shouldPersist&&y.save(t,o),u(a({},s,((n={})[t]=o,n)))}}},e)}var P={isLoading:!1,error:null,data:null},E={CACHE_FIRST:"cache-first",NETWORK_ONLY:"network-only",CACHE_ONLY:"cache-only"},O={key:null,cachePolicy:E.CACHE_FIRST,shouldPersist:!1};function g(t,e){void 0===e&&(e=O);var n,u,l=(n=e,u=a({},O),Object.keys(n).forEach(function(t){Object.prototype.hasOwnProperty.call(O,t)?u[t]=n[t]:d(function(t){return"Option ["+t+"] is not part of the API. While this is not an error, ensure the options matches the API."}(t))}),u),f=o(c),m=l.key||btoa(t),v=f.getCachedData(m),y=Boolean(v),p=l.cachePolicy!==E.NETWORK_ONLY,g=[E.CACHE_FIRST,E.NETWORK_ONLY].includes(l.cachePolicy),S=y&&p,w=a({},P,{data:v}),j=r(S?w:P),T=j[0],F=j[1],R=i(function(){try{return y||!g?Promise.resolve():(F(a({},T,{isLoading:!0})),Promise.resolve(s(t)).then(function(t){F(a({},T,{data:t})),p&&f.setCacheData(m,t,l)}))}catch(t){return Promise.reject(t)}},[y,g,T,t,p,f,m,l]);return h(function(){R()}),T}var S={isLoading:!1,error:null,data:null,refetch:function(){}},w={key:null,httpFetchMethod:"GET",httpFetchBody:null};function j(t,e){void 0===e&&(e=w);var n,o,c=(n=e,o=a({},w),Object.keys(n).forEach(function(t){Object.prototype.hasOwnProperty.call(w,t)?o[t]=n[t]:d(function(t){return"Option ["+t+"] is not part of the API. While this is not an error, ensure the options matches the API."}(t))}),o),l=r(S),f=l[0],m=l[1],v=i(function(){try{var e,r=function(){function r(){function r(){function r(){function r(){m(a({},f,{data:e}))}var n=function(){if("PATCH"===c.httpFetchMethod)return Promise.resolve(function(t,e){try{return Promise.resolve(window.fetch(t,{method:"PATCH",body:JSON.stringify(e)})).then(function(t){return Promise.resolve(t.json())})}catch(t){return Promise.reject(t)}}(t,c.httpFetchBody)).then(function(t){e=t})}();return n&&n.then?n.then(r):r()}var n=function(){if("DELETE"===c.httpFetchMethod)return Promise.resolve(function(t){try{return Promise.resolve(window.fetch(t,{method:"DELETE"})).then(function(t){return Promise.resolve(t.json())})}catch(t){return Promise.reject(t)}}(t)).then(function(t){e=t})}();return n&&n.then?n.then(r):r()}var n=function(){if("PUT"===c.httpFetchMethod)return Promise.resolve(function(t,e){try{return Promise.resolve(window.fetch(t,{method:"PUT",body:JSON.stringify(e)})).then(function(t){return Promise.resolve(t.json())})}catch(t){return Promise.reject(t)}}(t,c.httpFetchBody)).then(function(t){e=t})}();return n&&n.then?n.then(r):r()}var n=function(){if("POST"===c.httpFetchMethod)return Promise.resolve(u(t,c.httpFetchBody)).then(function(t){e=t})}();return n&&n.then?n.then(r):r()};m(a({},f,{isLoading:!0}));var n=function(){if("GET"===c.httpFetchMethod)return Promise.resolve(s(t)).then(function(t){e=t})}();return Promise.resolve(n&&n.then?n.then(r):r())}catch(t){return Promise.reject(t)}},[f,c.httpFetchBody,c.httpFetchMethod,t]);return h(function(){v()}),a({},f,{refetch:v})}var T=function(){},F={isStreaming:!1,isStreamingDone:!1,error:null,data:null},R={streamEndFlag:"isStreamEnded",reqBodyParamsKey:"requestKeys",initialRequestBodyParams:null,responseReqBodyExtractorKey:"requestKeys",stopStreamOnError:!1,stackDataMapper:function(t){return t},stackDataReducer:function(){return{}},onStreamEnd:T,onNextTick:T,onStreamError:T,streamDataFlow:"stack"};function _(t,e){void 0===e&&(e=R);var n,o,c=(n=e,o=a({},R),Object.keys(n).forEach(function(t){Object.prototype.hasOwnProperty.call(R,t)?o[t]=n[t]:d(function(t){return"Option ["+t+"] is not part of the API. While this is not an error, ensure the options matches the API."}(t))}),o),s=r(F),l=s[0],f=s[1],v=i(function(e,r){void 0===e&&(e={}),void 0===r&&(r=[]);try{return Promise.resolve(function(n,o){try{var i=Promise.resolve(u(t,e)).then(function(t){if(c.onNextTick(),!1!==t[c.streamEndFlag]){if(!0===t[c.streamEndFlag]){if(c.onStreamEnd(),"stack"===c.streamDataFlow)return void f(a({},l,{data:[].concat(r,[a({},t)]).map(c.stackDataMapper)}));if("object"===c.streamDataFlow)return void f(a({},l,{data:[].concat(r,[a({},t)]).map(c.stackDataMapper).reduce(c.stackDataReducer)}))}d("Stream ended due to stream ending flag is not found or not a proper boolean value")}else{var e;v(((e={})[c.reqBodyParamsKey]=t[c.responseReqBodyExtractorKey],e),[].concat(r,[a({},t)]))}})}catch(t){return o(t)}return i&&i.then?i.then(void 0,o):i}(0,function(t){m("something went wrong ",t)}))}catch(t){return Promise.reject(t)}},[t,c,l]);return h(function(){var t;v(((t={})[c.reqBodyParamsKey]=c.initialRequestBodyParams,t))}),l}export{p as RestQueryProvider,g as useCacheable,j as useFetchable,_ as useStreamable};
//# sourceMappingURL=index.module.js.map
