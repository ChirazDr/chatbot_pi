$(document).ready(function() {
    // Initialisation du bouton micro
    var microphone = new AudioRecorder();
    microphone.addEventListener("onAudioStart", function() {
      console.log("Microphone démarré");
    });
    microphone.addEventListener("onAudioStop", function() {
      console.log("Microphone arrêté");
    });
    microphone.addEventListener("onAudioData", function(data) {
      // Conversion du signal audio en texte
      var text = new SpeechRecognition().recognize(data);
      // Affichage du texte dans la zone de texte
      $("#requete").val(text);
    });
    $("#bouton-micro").click(function() {
      microphone.start();
    });
  
    // Initialisation du bouton envoyer
    $("#bouton-envoyer").click(function() {
      // Récupération de la requête
      var requete = $("#requete").val();
      // Envoi de la requête au backend
      $.ajax({
        url: "/recette",
        method: "POST",
        data: {
          requete: requete
        },
        success: function(data) {
          // Affichage de la réponse
          $("#reponse").html(data);
        },
        error: function(error) {
          console.log(error);
        }
      });
    });
  });  