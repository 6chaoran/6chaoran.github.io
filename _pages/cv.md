---
permalink: /cv/
title: "Chaoran <ins>Liu</ins>"
layout: single
classes: wide
last_modified_at: 2021-03-27T14:28:13-05:00
author_profile: true
---

<div class="contact">

<i class="fas fa-envelope"></i> <a href="mailto:chaoran.liu@icloud.com"> chaoran.liu@icloud.com</a><br>

<a href="https://www.linkedin.com/in/liuchaoran"><i class="fab fa-linkedin"></i>  https://www.linkedin.com/in/liuchaoran</a><br>

</div>

<hr>

<iframe class="webcv" src="https://onedrive.live.com/embed?resid=C970FE22291517CB%2158169&authkey=!APZGeo3DEPBsWvw&em=2" width="100%" height="600" frameborder="0" scrolling="no"></iframe>


<script type="module">
  // If absolute URL from the remote server is provided, configure the CORS
  // header on that server.
  // var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
  const url = '/assets/cv/LIU_CHAOARAN_CV_PUBLIC.pdf'

  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  // var { pdfjsLib } = globalThis;
  import pdfjsDist from 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/+esm'

  // The workerSrc property shall be specified.
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.mjs';

  // Asynchronous download of PDF
  var loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');

      // var scale = 1.5;
      // var scale = 'page-fit';
      const desiredWidth = 390;
      var viewport = page.getViewport({scale: 1});
      var scale = desiredWidth / viewport.width;
      viewport = page.getViewport({scale: scale});
      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('the-canvas');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      // Render PDF page into canvas context

      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.promise.then(function () {
        console.log('Page rendered');
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
</script>

<canvas id="the-canvas" class="mobilecv"></canvas>

<style>
@media all and (min-width: 480px) {
  .mobilecv {
    display: none;
  }
  .webcv {
    display: block;
  }
}
@media all and (max-width: 479px) {
    .webcv {display:none;}
    .mobilecv {display:block;}
}

</style>