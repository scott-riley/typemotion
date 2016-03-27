window.onload = () => {
  var output = document.getElementById('output');
  var p = document.querySelector('.js-editable');

  const baseFontSize = "18px";
  const baseLineHeight = 1.3;

  p.style.fontSize = baseFontSize;
  p.style.lineHeight = baseLineHeight;

  const fsMod = .04;
  const lhMod = .0025

  // Making a fist modifies style control
  let isPinching = false;

  // Track some motion yo
  Leap.loop( (frame) => {

    // GESTURES
    if(frame.valid && frame.gestures.length > 0){
      frame.gestures.forEach( (gesture) => {

        switch (gesture.type){
          // Spinning left/right increases font size
          case "circle":
              let clockwise = false;
              const pointableID = gesture.pointableIds[0];
              const direction = frame.pointable(pointableID).direction;
              const dotProduct = Leap.vec3.dot(direction, gesture.normal);

              if (dotProduct  >  0) clockwise = true;

              const intSize = parseFloat(p.style.fontSize);

              if(gesture.stop) {
                console.log("Finished a circle");
              }
              if(clockwise) {
                if(isFist) {
                  p.style.lineHeight = parseFloat(p.style.lineHeight) + lhMod;
                }
                else {
                  p.style.fontSize = `${intSize + fsMod}px`;
                }
              }
              else {
                if(isFist) {
                  p.style.lineHeight = parseFloat(p.style.lineHeight) - lhMod;
                }
                else {
                  p.style.fontSize = `${intSize - fsMod}px`;
                }
              }
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
              console.log("Swipe Gesture");
              break;
        }

      });

    }

    // HANDS
    if(frame.valid && frame.hands.length > 0) {
      isFist = frame.hands.some( (hand) => {
        if(hand.grabStrength > .8) {
          return true;
        }
        else {
          return false;
        }
      });
    }

  });
}
