import{createContext as e,useState as t,createElement as r,useEffect as n,useContext as o,useCallback as a}from"react";function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var i=e({store:null});function s(e){var n=e.children,o=t({}),a=o[0],s=o[1];return r(i.Provider,{value:{store:a,getCachedData:function(e){if(!a[e])return null;try{var t;return JSON.parse(null==(t=a[e])?void 0:t.data)}catch(e){return console.log("[RESTICACHE ERROR]",e),null}},setCacheData:function(e,t){var r,n=JSON.stringify(t);s(c({},a,((r={})[e]={data:n,cacheStoredAt:null,cacheExpiredAt:null},r)))}}},n)}function u(e){n(e,[])}var l={isLoading:!1,error:null,data:null},d={CACHE_FIRST:"cache-first",NETWORK_ONLY:"network-only",CACHE_ONLY:"cache-only"},h={key:null,cachePolicy:d.CACHE_FIRST};function f(e,r){void 0===r&&(r=h);var n,s,f=(n=r,s=c({},h),Object.keys(n).forEach(function(e){Object.prototype.hasOwnProperty.call(h,e)?s[e]=n[e]:console.warn("[RESTICACHE WARNING]",function(e){return"Option ["+e+"] is not part of the API. While this is not an error, ensure the options matches the API."}(e))}),s),m=o(i),y=f.key||btoa(e),p=m.getCachedData(y),v=Boolean(p),P=f.cachePolicy!==d.NETWORK_ONLY,E=[d.CACHE_FIRST,d.NETWORK_ONLY].includes(f.cachePolicy),O=v&&P,R=c({},l,{data:p}),g=t(O?R:l),S=g[0],C=g[1],w=a(function(){try{return v||!E?Promise.resolve():(C(c({},S,{isLoading:!0})),Promise.resolve(function(e){try{return Promise.resolve(window.fetch(e)).then(function(e){return Promise.resolve(e.json())})}catch(e){return Promise.reject(e)}}(e)).then(function(e){C(c({},S,{data:e})),P&&m.setCacheData(y,e)}))}catch(e){return Promise.reject(e)}},[v,E,S,e,P,m,y]);return u(function(){w()}),S}var m=function(){},y={isStreaming:!1,isStreamingDone:!1,error:null,data:null},p={streamEndFlag:"isStreamEnded",reqBodyParamsKey:"requestKeys",initialRequestBodyParams:null,responseReqBodyExtractorKey:"requestKeys",stopStreamOnError:!1,stackDataMapper:function(e){return e},stackDataReducer:function(){return{}},onStreamEnd:m,onNextTick:m,onStreamError:m,streamDataFlow:"stack"};function v(e,r){void 0===r&&(r=p);var n,o,i=(n=r,o=c({},p),Object.keys(n).forEach(function(e){Object.prototype.hasOwnProperty.call(p,e)?o[e]=n[e]:console.warn("[RESTICACHE WARNING]",function(e){return"Option ["+e+"] is not part of the API. While this is not an error, ensure the options matches the API."}(e))}),o),s=t(y),l=s[0],d=s[1],h=a(function(t,r){void 0===t&&(t={}),void 0===r&&(r=[]);try{return Promise.resolve(function(n,o){try{var a=Promise.resolve(function(e,t){try{return Promise.resolve(window.fetch(e,{method:"POST",body:JSON.stringify(t)})).then(function(e){return Promise.resolve(e.json())})}catch(e){return Promise.reject(e)}}(e,t)).then(function(e){if(i.onNextTick(),!1!==e[i.streamEndFlag]){if(!0===e[i.streamEndFlag]){if(i.onStreamEnd(),"stack"===i.streamDataFlow)return void d(c({},l,{data:[].concat(r,[c({},e)]).map(i.stackDataMapper)}));if("object"===i.streamDataFlow)return void d(c({},l,{data:[].concat(r,[c({},e)]).map(i.stackDataMapper).reduce(i.stackDataReducer)}))}console.warn("Stream ended due to stream ending flag is not found or not a proper boolean value")}else{var t;h(((t={})[i.reqBodyParamsKey]=e[i.responseReqBodyExtractorKey],t),[].concat(r,[c({},e)]))}})}catch(e){return o(e)}return a&&a.then?a.then(void 0,o):a}(0,function(e){console.log("something went wrong ",e)}))}catch(e){return Promise.reject(e)}},[e,i,l]);return u(function(){var e;h(((e={})[i.reqBodyParamsKey]=i.initialRequestBodyParams,e))}),l}export{s as RestQueryProvider,f as useCacheable,v as useStreamable};
//# sourceMappingURL=index.module.js.map
