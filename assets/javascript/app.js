// Initialize Firebase
var config = {
apiKey: "AIzaSyApCfu1UleXFOrSO4_kTYjKPH3Mj-EV2ng",
authDomain: "train-scheduler-35d89.firebaseapp.com",
databaseURL: "https://train-scheduler-35d89.firebaseio.com",
projectId: "train-scheduler-35d89",
storageBucket: "train-scheduler-35d89.appspot.com",
messagingSenderId: "226663595819"
};
firebase.initializeApp(config);
var database = firebase.database();

// Initial Values
 var trainname = "";
 var destination = "";
 var firsttraintime = 0;
 var frequency = 0;

var trainRef = firebase.database().ref(trainname);
  trainRef.set ({
    trainname: {
      destination: destination,
      firsttraintime: firsttraintime,
      frequency: frequency
    }
  });
  
database.ref().on("value", addTrain);
 // Capture Button Click
 $("button").on("click", function(event) {
   //event.preventDefault();
  try {
  
   // Grabbed values from text boxes
   trainname = $("#trainName").val();
   destination = $("#destination").val();
   firsttraintime = $("#firstTrainTime").val();
   frequency = $("#frequency").val();
   // Code for handling the push
  
   database.ref(trainname).update({
     Destination: destination,
     First_Train_Time: firsttraintime,
     Frequency: frequency,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   });
  
  } catch (error) {
    console.error(error);
  }
 });
 function addTrain(event) {
  var firstTrainTimeConvert = moment(event.firsttraintime.val(), "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConvert);
   event.destination.val();
   event.firsttraintime.val();
   event.frequency.val();
 }
 //read on moment.js on parseing time
 //