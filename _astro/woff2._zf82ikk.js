var e={};function t(t){if(e[t])return e[t];let n=new URL(`${`/etabli-site`.replace(/\/$/,``)}/vendor/wawoff2/${t}_binding.js`,location.href).href,r=`
    var ready = new Promise(function (r) { self.Module = { onRuntimeInitialized: r }; });
    importScripts(${JSON.stringify(n)});
    onmessage = function (e) {
      ready.then(function () {
        try {
          var out = Module.${t}(e.data);
          if (out === false) postMessage({ error: 'échec' });
          else { var copy = new Uint8Array(out); postMessage({ out: copy }, [copy.buffer]); }
        } catch (err) { postMessage({ error: String(err) }); }
      });
    };`;return e[t]=new Worker(URL.createObjectURL(new Blob([r],{type:`text/javascript`}))),e[t]}function n(e,n){return new Promise((r,i)=>{let a=t(e);a.onmessage=t=>t.data.error?i(Error(e===`compress`?`Conversion en WOFF2 impossible.`:`Ce fichier WOFF2 est illisible.`)):r(t.data.out),a.onerror=()=>i(Error(`Moteur WOFF2 introuvable.`)),a.postMessage(n.slice())})}var r=e=>n(`compress`,e),i=e=>n(`decompress`,e);export{r as compress,i as decompress};