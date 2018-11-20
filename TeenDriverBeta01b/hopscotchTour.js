var scrollTime = 250;
var tourWidth = 240;

var tour = {
  id: "beginTour",
  steps: [
    {
      title: "Video Area",
      content: "Here is the video area. The videos of all the courses will be shown here. You can directly click on the videos when you are asked to do so.",
      target: "video_div",
      placement: "bottom",
      xOffset: videoWidth * 0.5,
      yOffset: videoHeight * -0.5,
      width: tourWidth - 10,
      delay: 30
    },
    {
      title: "Chat Window",
      content: "The chat window let you talk with the agent, select your answers and make the course continue",
      target: "dialog",
      placement: "bottom",
      xOffset: videoWidth * 0.5,
      yOffset: videoHeight * -0.5,
      showPrevButton: true,
      width: tourWidth,
      delay: scrollTime
    },
    {
      title: "Starting Here",
      content: "Set your starting level by the slider for <b>Level</b>. Then Click on <b>Begin</b> to start the course. You can also set the hint's transparent level by the slider for the <b>Hint Level</b>",
      target: "sliderLevel",
      placement: "top",
      showPrevButton: true,
      yOffset: -10,
      arrowOffset: "left",
      width: tourWidth,
      delay: scrollTime
    },
    {
      title: "Login Here",
      content: "You can regester and login here to save your training progress",
      target: "login",
      placement: "top",
      showPrevButton: true,
      width: tourWidth,
      delay: scrollTime
    },
  ]
};

// hopscotchTour();   // Start the tour

function hopscotchTour() {
  hopscotch.startTour(tour);
}