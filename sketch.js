let facemesh;
let video;
let predictions = [];
const pointsToConnect = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
  76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184
];

function setup() {
  let startButton = createButton('Start');
  startButton.position(10, 10);
  startButton.mousePressed(() => {
    getAudioContext().resume(); // 啟動 AudioContext
    startButton.remove(); // 移除按鈕
  });

  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 255, 0); // Yellow color
    strokeWeight(5); // Line thickness

    for (let i = 0; i < pointsToConnect.length - 1; i++) {
      const startIdx = pointsToConnect[i];
      const endIdx = pointsToConnect[i + 1];

      if (keypoints[startIdx] && keypoints[endIdx]) {
        const [x1, y1] = keypoints[startIdx];
        const [x2, y2] = keypoints[endIdx];
        line(x1, y1, x2, y2);
      }
    }
  }
}
