// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
// const canvas = document.getElementById('animation');
var divRoot = $("#affdex_elements")[0];
var width = 0;
var height = 0;
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();

//Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener("onInitializeSuccess", function() {
  log('#logs', "The detector reports initialized");
  $("#face_video").css("display", "none");
  document.getElementById("face_video").innerText = "Your Face Here";
});

function log(node_name, msg) {
  $(node_name).append("<span>" + msg + "</span><br />")
}

//function executes when Start button is pushed.
function onStart() {
  if (detector && !detector.isRunning) {
    $("#logs").html("");
    detector.start();
  }
  log('#logs', "Clicked the start button");
}

//function executes when the Stop button is pushed.
function onStop() {
  log('#logs', "Clicked the stop button");
  if (detector && detector.isRunning) {
    detector.removeEventListener();
    detector.stop();
  }

};

//function executes when the Reset button is pushed.
function onReset() {
  log('#logs', "Clicked the reset button");
  if (detector && detector.isRunning) {
    detector.reset();
  }
};

//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function() {
  log('#logs', "Webcam access allowed");
});

//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function() {
  log('#logs', "webcam denied");
  console.log("Webcam access denied");
});

//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function() {
  log('#logs', "The detector reports stopped");
  emotionTarget = '';
  stopAll(circles);
});

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp) {
  if (faces.length > 0) {
    let emotionArray = [];
    emotionArray.push(
      {
        emotion: 'joy',
        val: faces[0].emotions.joy
      });
    emotionArray.push(
      {
        emotion:'sad',
        val:  faces[0].emotions.sadness
      }
    );
    emotionArray.push(
      {
        emotion: 'disgust',
        val: faces[0].emotions.disgust
      });
    emotionArray.push(
      {
        emotion: 'fear',
        val: faces[0].emotions.fear
      });
    emotionArray.push(
      {
        emotion:'surprise',
        val: faces[0].emotions.surprise
      });
    emotionArray.push(
      {
        emotion:'anger',
        val: faces[0].emotions.anger
      });

    max = 0;
    for(let i = 1; i < 6;i++){
      if(emotionArray[i].val> emotionArray[max].val){
        max = i;
      }
    }
    emotionTarget = emotionArray[max].emotion;

  }
});
