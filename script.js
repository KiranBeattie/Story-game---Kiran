
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "prologue";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "prologue" for the first example
  prologue: {
    title: "Prologue",
    image: "Picture of person at a desk",
    text: "You're sitting, trying to start your (add favorite subject) assignment, but you can't focus. You feel like your brain is foggy and you start to feel faint. Next thing you know, your head is hitting your desk.",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Open your eyes",
        nextScene: "frontalLobe"
      }
    ]
  },

  frontalLobe: {
    title: "Frontal Lobe",
    image: "image of brain",
    text: "You open your eyes and find yourself in a strange, gloomy hub of your brain. A molecule floats by and you reach out to tap it. Suddenly, you feel your attention focus in and a synapse next to you fires. You remember your assignment and feel an newfound drive to finish it. The dopamine molecule beings to float away.",
    choices: [
      {
        text: "Follow the dopamine",
        action: function() {
         if(stress > 0) {       
          updateStress(-10);
        }
         pickUpItem("Dopamine");
      },
        nextScene: "temporalLobe"
      },
         {
        text: "Follow the firing synapses",
        action: function() {
          updateStress(+10);
        },
        nextScene: "occipitalLobe"
      }
    ]
  },

  temporalLobe: {
    title: "Temporal Lobe",
    image: "image of brain",
    text: "Pushing through the fog with your ears ringing and jumping at every background noise, you discover a new hub, which is responsable for audio processing. In front of you, there's a cluster of Acetylcholine molecules, but to the side there's a thick, mysterious fog. The Acetylcholine molecules swirl by and you feel your hearing sharpen.",
    choices: [
      {
        text: "Follow the Acetylcholine",        
        action: function() {
        if(stress > 0) {        
          updateStress(-10);
        }
        pickUpItem("Acetylcholine");
        },
        nextScene: "parietalLobe"
      },
      {
        text: "Explore the fog",
        action: function() {
          updateStress(+10);
          if(stress>20){
         updateScene("gameOver");
        }
        },
        nextScene: "occipitalLobe"
      }
    ]
  },

   occipitalLobe: {
    title: "Occipital Lobe",
    image: "image of brain",
    text: "Pushing through the fog, you find a new hub, responsable for processing visual information. Your eyes flick around without much focus. In front of you, there's a cluster of Acetylcholine molecules, but to the side there's a thick, mysterious fog. The Acetylcholine molecules swirl by and you feel your vision clear.",
    choices: [
      {
        text: "Follow the Acetylcholine",
        action: function() {
        if(stress > 0) {
          updateStress(-10);
        }
          pickUpItem("Acetylcholine");
        },
        nextScene: "parietalLobe"
      },
      {
        text: "Explore the fog",
        action: function() {
          updateStress(+10);
          if(stress>20){
         updateScene("gameOver");
        }
        },
        nextScene: "temporalLobe"
      }
    ]
  },

  parietalLobe: {
    title: "Parietal Lobe",
    image: "image of brain",
    text: "You've become more aware of your surroundings, but you still feel a great disconnect from your body and you being to stress. In your exploration you find a hub with a norepinephrine molecule on the ground. As you pick it up it begins to glow and you start to feel your body on the desk. The Norepinephrine molecule floats up and joins the other two molecules, flowing away.",
    choices: [
      {
        text: "Follow the molecules",
        action: function() {
          if(stress > 0) {
            updateStress(-10);
          }
         pickUpItem("Norepinephrine"); 
        },
        nextScene: "spinalCord"
      },
      {
        text: "Wander the brain",
        nextScene: "gameOver"
      }
    ]
  },
  gameOver: {
    title: "Game Over",
    text: "You gotten lost in the fog of the brain, and you can't find your way out. The stress begins to overtake you.",
    choices: [
      {
        text: "Retry and properly explore the brain",
        nextScene: "prologue"
      }
    ]
  },

   spinalCord: {
    title: "Spinal Cord",
    text: "You reach the hub where the molecules flow to the body and you join them in the Spinal Cord. You return to your body feeling less stressed and focused. You finish your assignment and feel accomplished.",
    
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  characterName.textContent = scene.character;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let stress = 10;

// Display current stress
const stressDisplay = document.getElementById("stress-display");

// Create a function to update stress 
function updateStress(amount) {
  stress += amount;
  stressDisplay.textContent = stress;
}

// This refreshes the stress display
updateStress(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function escape() {
  if (inventory.includes("Dopamine") && inventory.includes("Acetylcholine") && inventory.includes("Norepinephrine")) {
    updateScene("solution");
  }
}

