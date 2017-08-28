<?php

include 'functions.php';

if (!empty($_POST)){

  $data['success'] = true;
  $_POST  = multiDimensionalArrayMap('cleanEvilTags', $_POST);
  $_POST  = multiDimensionalArrayMap('cleanData', $_POST);

  //your email adress
  $emailTo ="info@aimib7.com"; //"yourmail@yoursite.com";

  //from email adress
  $emailFrom = $_POST["serviceFormEmail"]; //"contact@yoursite.com";

  //email subject
  $emailSubject = $_POST["serviceFormName"];

  $name = $_POST["serviceFormName"];
  $email = $_POST["serviceFormEmail"];
  $contact = $_POST["servicePhoneNumber"];
  $city = $_POST["serviceSelectCity"];
  $choice = $_POST["serviceFormChoice"];

  $choiceValue = implode(", ", $choice);

  if($name == "")
   $data['success'] = false;

 if (!preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email))
   $data['success'] = false;

 if (!preg_match("/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i", $contact))
   $data['success'] = false;

 if($city == "")
   $data['success'] = false;

 if($choice == "")
   $data['success'] = false;

 if($data['success'] == true){

  $message = "NAME: $name<br>
  EMAIL: $email<br>
  CONTACT: $contact<br>
  CITY: $city<br>
  INTERESTED IN: $choiceValue";


  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html; charset=utf-8" . "\r\n";
  $headers .= "From: <$emailFrom>" . "\r\n";
  mail($emailTo, $emailSubject, $message, $headers);

  $data['success'] = true;
  echo json_encode($data);
}
}
