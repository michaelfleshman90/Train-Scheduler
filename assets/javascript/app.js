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
 


database.ref().on("value", addTrain);
 // Capture Button Click
 $("button").on("click", function(event) {
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

  var trainRef = firebase.database().ref(trainname);
  trainRef.set ({
    trainname: {
      destination: destination,
      firsttraintime: firsttraintime,
      frequency: frequency
    }
  });
  
  } catch (error) {
    console.error(error);
  }
 });
 function addTrain(event) {
  var trainTimeConvert = moment(event.firsttraintime.val(), "H HH").subtract(1, "years");
    console.log(trainTimeConvert);
  var tFrequency = event.frequency.val();
    console.log(tFrequency);
  var timeDifference = moment().diff(moment(trainTimeConvert), "minutes");
    console.log(timeDifference);
  var tRemain = timeDifference % tFrequency;
    console.log(tRemain);
  var minsTilTrain = tFrequency - tRemain;
    console.log(minsTilTrain);
  var trainArrival = moment().add(minsTilTrain, "minutes");
    console.log(moment(trainArrival).format("H HH")); 
 }
 //I still need to print the information from the database to the html page.
 //I still need to make tables for the information printed on the html page.
 //I need to fix the error on the addTrain event.
