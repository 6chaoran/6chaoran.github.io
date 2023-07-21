(function(t){function e(e){for(var r,i,o=e[0],c=e[1],u=e[2],d=0,h=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&h.push(n[i][0]),n[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(h.length)h.shift()();return s.push.apply(s,u||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],r=!0,o=1;o<a.length;o++){var c=a[o];0!==n[c]&&(r=!1)}r&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var r={},n={app:0},s=[];function i(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=r,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;s.push([1,"chunk-vendors"]),a()})({0:function(t,e){},"034f":function(t,e,a){"use strict";a("85ec")},1:function(t,e,a){t.exports=a("56d7")},10:function(t,e){},11:function(t,e){},2:function(t,e){},3:function(t,e){},4:function(t,e){},5:function(t,e){},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-main",[a("TFModels")],1)],1)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("div",[a("b",[t._v(" This is a camera-based remote PPG monitoring app, which also measures BMI and skin age. ")]),a("p",{staticStyle:{color:"red"}},[t._v(" Place your face in the red box and keep stationary for "+t._s(t.maxCount)+" seconds ")])]),a("div",{staticClass:"my-3 d-flex justify-center"},[a("v-btn",{directives:[{name:"show",rawName:"v-show",value:!t.isCamStarted,expression:"!isCamStarted"}],staticClass:"mx-3",attrs:{rounded:"",disabled:!t.isModelReady},on:{click:t.startCam}},[t._v("start Camera")]),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.isCamStarted,expression:"isCamStarted"}],staticClass:"mx-3",attrs:{rounded:""},on:{click:t.stopCam}},[t._v("stop Camera")]),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.isCamStarted&&t.isModelReady&&!t.isRecordStarted,expression:"isCamStarted && isModelReady && !isRecordStarted"}],staticClass:"mx-3",attrs:{rounded:""},on:{click:t.startRecording}},[t._v("Start recording")])],1),a("div",{staticClass:"d-flex justify-center mt-3"},[t.loadingMsg?a("p",[t._v(t._s(t.loadingMsg))]):t._e(),a("p",{directives:[{name:"show",rawName:"v-show",value:t.isCamStarted,expression:"isCamStarted"}]},[t._v("recording stops in "+t._s(t.curCount)+" seconds")])]),a("div",{staticClass:"d-flex justify-center mb-3"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isCamStarted,expression:"isCamStarted"}],attrs:{id:"overlay"}},[a("video",{attrs:{src:"",muted:"",playsinline:"",id:"webcam"},domProps:{muted:!0}}),a("canvas",{attrs:{id:"mask"}})])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isResultsReady,expression:"isResultsReady"}],attrs:{id:"results"}},[a("v-divider",{staticClass:"my-6"}),a("b",[t._v("Your Estimated Pulse & Respiratory")]),a("div",{staticClass:"chart"},[a("canvas",{attrs:{id:"chartHR"}})]),a("div",{staticClass:"chart"},[a("canvas",{attrs:{id:"chartRR"}})]),a("v-divider",{staticClass:"my-6"}),a("b",[t._v("Your Estimated Vital Measurements")]),a("ul",[a("li",[t._v("AGE: "+t._s(t.AGE))]),a("li",[t._v("BMI: "+t._s(t.BMI))]),a("li",[t._v("HR : "+t._s(t.HR)+" bpm")]),a("li",[t._v("RR : "+t._s(t.RR)+" rpm")])])],1)])},o=[],c=a("3835"),u=(a("99af"),a("b680"),60),l=a("1da1"),d=a("d4ec"),h=a("bee2"),f=(a("96cf"),a("d81d"),a("4c53"),a("ce1a"));function p(t){var e=t.reduce((function(t,e){return t+e}),0);return e/t.length}function v(t){var e=p(t),a=t.map((function(t){return Math.abs(t-e)}));return p(a)}var m=function(){function t(){Object(d["a"])(this,t),this.model=null,this.BMIPool=[],this.AGEPool=[],this.SEXPool=[]}return Object(h["a"])(t,[{key:"loadModel",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var a,r,n=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:null,t.next=3,f["j"](e);case 3:this.model=t.sent,r=f["u"]([1,224,224,3]),this.model.predict(r),r.dispose(),console.log("BMI model is loaded!"),a&&a();case 9:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"cropImage",value:function(t,e,a){var r=f["h"].cropAndResize(t,e,[0],a,"bilinear");return r}},{key:"predict",value:function(t,e,a){var r=this;if(null!=t.srcObject){var n=f["t"]((function(){var n=f["b"].fromPixels(t).expandDims(0);return n=r.cropImage(n,e,a),n=n.div(f["n"](127.5)).sub(f["n"](1)),n})),s=this.model.predict(n),i=Object(c["a"])(s,3),o=i[0],u=i[1],l=i[2],d=o.dataSync()[0],h=u.dataSync()[0],p=l.dataSync()[0];return o.dispose(),u.dispose(),l.dispose(),this.BMIPool.push(d),this.AGEPool.push(h),this.SEXPool.push(p),[d,h,p]}}},{key:"output",value:function(){return{BMI:[p(this.BMIPool),v(this.BMIPool)],AGE:[p(this.AGEPool),v(this.AGEPool)],SEX:[p(this.SEXPool),v(this.SEXPool)]}}}]),t}(),b=new m,j=(a("fb6a"),a("a630"),a("3ca3"),a("d3b7"),a("ddb0"),a("25f0"),a("90d7"),a("2909")),O=a("ade3"),g=(a("159b"),function t(){var e=this;Object(d["a"])(this,t),Object(O["a"])(this,"reset",(function(){e.rawFrames.forEach((function(t){Object(f["f"])(t)})),e.rawFrames=[],e.hrPltData=[],e.rrPltData=[],e.initialWait=!0})),Object(O["a"])(this,"getRawTensor",(function(){if(e.rawFrames){var t=e.rawFrames.shift()||null;return t}return null})),Object(O["a"])(this,"addHRPltData",(function(t){e.hrPltData=[].concat(Object(j["a"])(e.hrPltData),Object(j["a"])(t))})),Object(O["a"])(this,"addRRPltData",(function(t){e.rrPltData=[].concat(Object(j["a"])(e.rrPltData),Object(j["a"])(t))})),Object(O["a"])(this,"addRawTensor",(function(t){e.rawFrames.push(t)})),this.rawFrames=[],this.hrPltData=[],this.rrPltData=[],this.initialWait=!0}),y=new g,w=10,R=function t(){var e=this;Object(d["a"])(this,t),Object(O["a"])(this,"reset",(function(){e.sum=0,e.movingAvg=0,e.dataSet=[]})),Object(O["a"])(this,"getSum",(function(){return e.sum})),Object(O["a"])(this,"getMovingAvg",(function(){return e.movingAvg})),Object(O["a"])(this,"addData",(function(t){e.dataSet.length===w&&(e.sum-=e.dataSet.shift()||0),e.sum+=t,e.dataSet.push(t),e.movingAvg=e.sum/e.dataSet.length})),this.sum=0,this.movingAvg=0,this.dataSet=[]},S=R,M=a("45eb"),P=a("7e84"),B=a("262e"),C=a("2caf"),x=function(t){Object(B["a"])(a,t);var e=Object(C["a"])(a);function a(){return Object(d["a"])(this,a),e.apply(this,arguments)}return Object(h["a"])(a,[{key:"call",value:function(t){return Object(f["t"])((function(){var e,a,r,n,s,i=t[0],o=i.shape[0],u=i.shape[1],l=i.shape[2],d=i.shape[3],h=3,p=Math.floor(d/h),v=d-(h-1)*p;i=Object(f["m"])(i,[-1,o,u,l,d]);var m=Object(f["p"])(i,[p,p,v],-1),b=Object(c["a"])(m,3);e=b[0],a=b[1],r=b[2];var j=Object(f["u"])([e.shape[0],1,e.shape[2],e.shape[3],p]),O=Object(f["p"])(e,[1,o-1],1),g=Object(c["a"])(O,2);n=g[0],e=g[1],e=Object(f["d"])([e,j],1);var y=Object(f["u"])([a.shape[0],1,a.shape[2],a.shape[3],p]),w=Object(f["p"])(a,[o-1,1],1),R=Object(c["a"])(w,2);return a=R[0],n=R[1],a=Object(f["d"])([y,a],1),s=Object(f["d"])([e,a,r],-1),s=Object(f["m"])(s,[-1,u,l,d]),r=n,s}))}},{key:"getConfig",value:function(){var t=Object(M["a"])(Object(P["a"])(a.prototype),"getConfig",this).call(this);return t}}],[{key:"getClassName",value:function(){return"TSM"}}]),a}(f["i"].Layer);Object(O["a"])(x,"className","TSM");var k=x,I=function(t){Object(B["a"])(a,t);var e=Object(C["a"])(a);function a(){return Object(d["a"])(this,a),e.apply(this,arguments)}return Object(h["a"])(a,[{key:"computeOutputShape",value:function(t){return[t[0],t[1],t[2],t[3]]}},{key:"call",value:function(t){return f["t"]((function(){var e=t[0],a=f["r"](e,1,!0);a=f["r"](a,2,!0);var r=e.div(a).mul(e.shape[1]).mul(e.shape[2]).mul(.5);return r}))}},{key:"getConfig",value:function(){var t=Object(M["a"])(Object(P["a"])(a.prototype),"getConfig",this).call(this);return t}}],[{key:"getClassName",value:function(){return"AttentionMask"}}]),a}(f["i"].Layer);Object(O["a"])(I,"className","AttentionMask");var z=I,_=function t(e){var a=this;Object(d["a"])(this,t),Object(O["a"])(this,"reset",(function(){a.rppgAvgProcessor.reset(),a.respAvgProcessor.reset()})),Object(O["a"])(this,"loadModel",function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(null!==a.model){t.next=6;break}return f["o"].registerClass(k),f["o"].registerClass(z),t.next=5,Object(f["j"])(e);case 5:a.model=t.sent;case 6:return t.abrupt("return",!0);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),Object(O["a"])(this,"compute",(function(t,e){if(a.model){var r=a.model.predict([t,e]),n=Object(c["a"])(r,2),s=n[0],i=n[1];a.tensorStore.addHRPltData(s.dataSync()),a.tensorStore.addRRPltData(i.dataSync())}})),this.tensorStore=e,this.rppgAvgProcessor=new S,this.respAvgProcessor=new S,this.model=null},A=_,E=function t(e,a){var r=this;Object(d["a"])(this,t),Object(O["a"])(this,"reset",(function(){Object(f["f"])(r.rawBatch),Object(f["f"])(r.normalizedBatch),r.previousFrame&&Object(f["f"])(r.previousFrame),r.previousFrame=null,r.isProcessing=!1,r.rawBatch=Object(f["s"])([]),r.normalizedBatch=Object(f["s"])([])})),Object(O["a"])(this,"startProcess",(function(){r.isProcessing=!0,r.process()})),Object(O["a"])(this,"stopProcess",(function(){r.isProcessing=!1,r.reset()})),Object(O["a"])(this,"process",(function(){if(r.isProcessing){var t=r.tensorStore.getRawTensor();t?(r.compute(r.previousFrame,t),Object(f["f"])(t),r.process()):setTimeout((function(){r.process()}),30)}})),Object(O["a"])(this,"compute",(function(t,e){var a=Object(f["t"])((function(){var a=e.asType("float32").div(Object(f["n"])(255)).clipByValue(1/255,1).expandDims(0);if(t){var r=Object(f["g"])(Object(f["q"])(a,t),Object(f["a"])(a,t)),n=Object(f["g"])(r,Object(f["l"])(r).variance.sqrt()),s=Object(f["q"])(a,Object(f["k"])(a)),i=Object(f["g"])(s,Object(f["l"])(s).variance.sqrt());return Object(f["f"])(t),[a,n,i]}return[a]})),n=Object(c["a"])(a,3),s=n[0],i=n[1],o=n[2];if(r.rawBatch.shape[0]&&o&&i){var u=Object(f["t"])((function(){return Object(f["d"])([r.rawBatch,o])}));Object(f["f"])(r.rawBatch),r.rawBatch=u;var l=Object(f["t"])((function(){return Object(f["d"])([r.normalizedBatch,i])}));Object(f["f"])(r.normalizedBatch),r.normalizedBatch=l}else if(i&&o){var d=Object(f["t"])((function(){return Object(f["c"])(o,"float32")}));Object(f["f"])(r.rawBatch),r.rawBatch=d;var h=Object(f["t"])((function(){return Object(f["c"])(i,"float32")}));Object(f["f"])(r.normalizedBatch),r.normalizedBatch=h}r.rawBatch.shape[0]===w&&(r.posprocessor.compute(r.normalizedBatch,r.rawBatch),Object(f["f"])(r.rawBatch),Object(f["f"])(r.normalizedBatch),r.rawBatch=Object(f["s"])([]),r.normalizedBatch=Object(f["s"])([])),Object(f["f"])(i),Object(f["f"])(o),r.previousFrame=s})),this.tensorStore=e,this.posprocessor=a,this.previousFrame=null,this.isProcessing=!1,this.rawBatch=Object(f["s"])([]),this.normalizedBatch=Object(f["s"])([])},F=E,D=a("51db"),T=a.n(D),G=a("deee"),H=function(){function t(){Object(d["a"])(this,t),this.tensorStore=y,this.postprocessor=new A(this.tensorStore),this.preprocessor=new F(this.tensorStore,this.postprocessor)}return Object(h["a"])(t,[{key:"loadModel",value:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(e){var a,r,n,s,i,o,u=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=u.length>1&&void 0!==u[1]?u[1]:null,t.next=3,this.postprocessor.loadModel(e);case 3:r=Object(f["u"])([1,36,36,3]),n=this.postprocessor.model.predict([r,r]),s=Object(c["a"])(n,2),i=s[0],o=s[1],i.dispose(),o.dispose(),r.dispose(),console.log("Pulse model is loaded!"),a&&a();case 10:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}()},{key:"capture",value:function(t,e,a){var r=Object(f["t"])((function(){var r=f["b"].fromPixels(t).expandDims(0),n=f["h"].cropAndResize(r,e,[0],a,"bilinear"),s=n.gather(0);return s}));this.tensorStore.addRawTensor(r)}},{key:"start",value:function(){this.preprocessor.startProcess()}},{key:"stop",value:function(){this.preprocessor.stopProcess(),this.tensorStore.reset()}},{key:"output_i",value:function(t,e){if(t){var a=Object(f["e"])(Object(f["m"])(t,[-1,1]),0).dataSync(),r=e.filtfilt(a).slice(0,a.length-60),n=Array.from(t.keys()).map((function(t){return t.toString()})).slice(0,a.length-60);return{x:n,y:r}}}},{key:"getFrequency",value:function(t,e,a){for(var r=30,n=4*u*r,s=Math.pow(2,Math.ceil(Math.log2(n))),i=G["a"].periodogram(t,r,{fttSize:s}),o=i.frequencies,c=i.estimates,l=[],d=[],h=0;h<o.length;h++)o[h]>=e&&o[h]<=a&&(l.push(o[h]),d.push(c[h]));return 60*l[d.indexOf(Math.max.apply(Math,d))]}},{key:"output",value:function(){var t=new T.a.CalcCascades,e=t.bandpass({order:1,characteristic:"butterworth",Fs:30,Fc:1.375,BW:1.25,gain:0,preGain:!1}),a=new T.a.IirFilter(e),r=this.output_i(y.hrPltData,a),n=this.output_i(y.rrPltData,a),s=this.getFrequency(r["y"],.75,2.5),i=this.getFrequency(n["y"],.08,.5);return[r,n,s,i]}}]),t}(),N=new H,q=function(){function t(){Object(d["a"])(this,t)}return Object(h["a"])(t,[{key:"start",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a={video:{width:t.width,height:t.height,facingMode:"user"},audio:!1};navigator.mediaDevices.getUserMedia(a).then((function(a){t.srcObject=a,t.play(),e&&e()}))}},{key:"stop",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;t.srcObject.getTracks().forEach((function(t){t.stop()})),t.srcObject=null,e&&e()}}]),t}(),V=new q,X=a("d549");function W(t,e,a,r,n){var s={labels:e,datasets:[{label:r,backgroundColor:n,borderColor:n,data:a}]},i={type:"line",data:s,options:{maintainAspectRatio:!1,elements:{point:{radius:0}},plugins:{legend:{align:"start"}}}},o=new X["a"](t,i);return o}var $={name:"TFModels",data:function(){return{camSize:[480,480],imageSize:[224,224],box:null,isCamStarted:!0,isRecordStarted:!1,isBMIModelReady:!1,isPulseModelReady:!1,isResultsReady:!0,maxCount:u,curCount:u,BMI:null,AGE:null,HR:null,RR:null,intvBMI:null,intvPulse:null,invtCountDown:null,chartHR:null,chartRR:null}},computed:{isModelReady:function(){return this.isBMIModelReady&&this.isPulseModelReady},loadingMsg:function(){return this.isBMIModelReady&&this.isPulseModelReady?null:this.isBMIModelReady?"loading Pulse model ...":"loading BMI model ..."}},mounted:function(){var t="/data-story/assets/vital-signs-predict-60s";this.loadModels(t),this.webcam=document.getElementById("webcam"),this.mask=document.getElementById("mask"),this.overlay=document.getElementById("overlay"),this.adjustSize(),this.drawBox(),this.isCamStarted=!1,this.isResultsReady=!1},methods:{loadModels:function(t){var e=this;b.loadModel(t+"/models/BMI/model.json",(function(){e.isBMIModelReady=!0})),N.loadModel(t+"/models/Pulse/model.json",(function(){e.isPulseModelReady=!0}))},reset:function(){this.curCount=this.maxCount,this.stopCam()},destoryCharts:function(){this.chartHR&&this.chartHR.destroy(),this.chartRR&&this.chartRR.destroy()},startCam:function(){var t=this,e=function(){t.isCamStarted=!0,t.isResultsReady=!1,t.destoryCharts()};V.start(this.webcam,e)},stopCam:function(){var t=this,e=function(){t.isCamStarted=!1,t.isRecordStarted=!1};V.stop(this.webcam,e)},startRecording:function(){this.isRecordStarted=!0,this.predictBMI(),this.predictPulse(),this.countDown()},output:function(){this.isResultsReady=!0;var t=b.output();this.BMI="".concat(t.BMI[0].toFixed(1)," +/- ").concat(t.BMI[1].toFixed(1)),this.AGE="".concat(t.AGE[0].toFixed(0)," +/- ").concat(t.AGE[1].toFixed(0));var e=N.output(),a=Object(c["a"])(e,4),r=a[0],n=a[1],s=a[2],i=a[3];this.RR=i.toFixed(1),this.HR=s.toFixed(1);var o=document.getElementById("chartHR"),u=document.getElementById("chartRR");this.chartHR=W(o,r.x,r.y,"HR","red"),this.chartRR=W(u,n.x,n.y,"RR","green")},predictBMI:function(){var t=this;this.intvBMI=setInterval((function(){b.predict(t.webcam,t.box,[224,224])}),1e3)},predictPulse:function(){var t=this;this.intvPulse=setInterval((function(){N.capture(t.webcam,t.box,[36,36])}),30),N.start()},countDown:function(){var t=this;this.invtCountDown=setInterval((function(){t.curCount<=0?(clearInterval(t.intvBMI),clearInterval(t.intvPulse),clearInterval(t.invtCountDown),t.output(),N.stop(),t.reset()):t.curCount--}),1e3)},drawBox:function(){var t=parseInt((this.camSize[0]-this.imageSize[0])/2),e=parseInt(.3*(this.camSize[1]-this.imageSize[1])),a=e/this.camSize[1],r=t/this.camSize[0],n=a+this.imageSize[1]/this.camSize[1],s=r+this.imageSize[0]/this.camSize[0];this.box=[[a,r,n,s]];var i=this.mask.getContext("2d");i.beginPath(),i.lineWidth=4,i.strokeStyle="red",i.rect(t,e,this.imageSize[0],this.imageSize[1]),i.stroke()},adjustSize:function(){this.camSize[0]>window.screen.width-24&&(this.camSize=[window.screen.width-24,window.screen.width-24]);var t=Object(c["a"])(this.camSize,2);this.mask.width=t[0],this.mask.height=t[1];var e=Object(c["a"])(this.camSize,2);this.webcam.width=e[0],this.webcam.height=e[1],this.overlay.setAttribute("style","width : ".concat(this.camSize[0],"px; height : ").concat(this.camSize[1],"px; "))}}},J=$,L=(a("921d"),a("2877")),Y=a("6544"),U=a.n(Y),K=a("8336"),Q=a("a523"),Z=a("ce7e"),tt=Object(L["a"])(J,i,o,!1,null,"a96c9ec0",null),et=tt.exports;U()(tt,{VBtn:K["a"],VContainer:Q["a"],VDivider:Z["a"]});var at={name:"App",components:{TFModels:et},data:function(){return{}}},rt=at,nt=(a("034f"),a("7496")),st=a("f6c4"),it=Object(L["a"])(rt,n,s,!1,null,null,null),ot=it.exports;U()(it,{VApp:nt["a"],VMain:st["a"]});var ct=a("f309");r["a"].use(ct["a"]);var ut=new ct["a"]({});r["a"].config.productionTip=!1,new r["a"]({vuetify:ut,render:function(t){return t(ot)}}).$mount("#app")},6:function(t,e){},7:function(t,e){},8:function(t,e){},"85ec":function(t,e,a){},9:function(t,e){},"921d":function(t,e,a){"use strict";a("f123")},f123:function(t,e,a){}});
//# sourceMappingURL=app.25e9ae7a.js.map