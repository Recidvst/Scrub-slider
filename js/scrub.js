/* Scrubber Slider */
  /* vanillaJS */

function Scrub(el) {
try{
    function utilityFn(callback) {
      // get chosen slider container
      var scrubSlider;
      scrubSlider = document.querySelectorAll(el)[0];
      
      // avoid non-specific classes..
      if ( el.indexOf('.') > -1 && document.querySelectorAll(el).length > 1 ) {
        console.warn('%cScrubber Slider works best if you use an %cID%c or a %cunique%c class... ','color:cornflowerblue;','color:indianred;','color:cornflowerblue;','color:indianred;','color:cornflowerblue;');
      }

        if ( scrubSlider != undefined ) {
          scrubSlider.className += " scrub-slider";

            // get chosen slider's images
            var scrubChildren = scrubSlider.children;

            function createScrubImages(el,type,index) {
                if ( type == 'DIV' ) {
                   // clone div
                   let scrubImage = el.cloneNode(true);
                   el.parentNode.removeChild(el);
                   // inject scrub container
                   let scrubCont = document.createElement('div');
                   scrubCont.className = ( index == 0 ) ? "scrub-content scrub-left" : "scrub-content scrub-right";
                   scrubSlider.insertBefore(scrubCont,scrubSlider.firstChild);
                   // re-attach div
                   scrubCont.append(scrubImage);
                   // need a background image..
                   if ( el.style.backgroundImage == '' ) {
                    console.warn('%cScrubber Slider divs must have a %cbackground image%c >:[','color:cornflowerblue;','color:indianred;','color:cornflowerblue;');
                   }
                }
                else if ( type == 'IMG' ) {
                   // clone div
                   let scrubImage = document.createElement('div');
                   let imgSrc = el.getAttribute('src');
                   el.parentNode.removeChild(el);
                   // inject scrub container
                   let scrubCont = document.createElement('div');
                   scrubCont.className = ( index == 0 ) ? "scrub-content scrub-left" : "scrub-content scrub-right";
                   scrubSlider.insertBefore(scrubCont,scrubSlider.firstChild);
                   // re-attach div
                   scrubImage.style.backgroundImage = 'url(' + imgSrc + ')';
                   scrubCont.append(scrubImage);
                }
            }
            for(let i=0; i < 2; i++) {
              let child = scrubChildren[i];
              if ( scrubChildren[i] && child.tagName ) {
                createScrubImages( scrubChildren[i], child.tagName, i );
              }
            }

        callback(scrubSlider);
        }
    }

        utilityFn(function(scrubSlider) {
            // add scrubber control/handle
            const scrubberHandle = document.createElement('div');
            scrubberHandle.className= "sliding";
            scrubberHandle.innerHTML = '<span class="sliding-left"></span><span class="sliding-right"></span>';
            scrubSlider.appendChild(scrubberHandle);

            // scrubber slider main action fn
            function mover(pos,full,slider) {
                if ( scrubberHandle ) {
                    let shrink = full - pos;
                    let sliding = slider.querySelectorAll('.sliding');
                       sliding[0].style.left = ((pos > 0) ? pos : 0) + "px";
                    let contentLeft = slider.querySelectorAll('.scrub-left');
                       contentLeft[0].style.width = ((pos > 0) ? pos : 0) + "px";
                    let contentRight = slider.querySelectorAll('.scrub-right');
                       contentRight[0].style.width = ((shrink > 0) ? shrink : 0) + "px";
                }
            }
            // add mousemove listener
            scrubSlider.addEventListener('mousemove', function(e) {
              let mousePosition = e.clientX;
              let fullWidth = scrubSlider.offsetWidth;
              mover(mousePosition,fullWidth,scrubSlider);
            });
        });
}catch(e){
    console.error('uh-oh: ' + e);
}
}