//Extracts the audio files and assigns a hotkey
const folder = "camilla";
const drums = [
  { fileName: "drums-1.mp3", hotKey: "q" },
  { fileName: "drums-2.mp3", hotKey: "w" },
  { fileName: "drums-3.mp3", hotKey: "e" },
  { fileName: "drums-4.mp3", hotKey: "r" },
  { fileName: "drums-5.mp3", hotKey: "t" },
  { fileName: "drums-6.mp3", hotKey: "y" },
  { fileName: "drums-7.mp3", hotKey: "u" },
  { fileName: "drums-8.mp3", hotKey: "i" },
  { fileName: "drums-9.mp3", hotKey: "o" },
  { fileName: "drums-10.mp3", hotKey: "a" },
  { fileName: "drums-11.mp3", hotKey: "s" },
  { fileName: "drums-12.mp3", hotKey: "d" },
  { fileName: "drums-13.mp3", hotKey: "f" },
  { fileName: "drums-14.mp3", hotKey: "g" },
  { fileName: "drums-15.mp3", hotKey: "h" },
  { fileName: "drums-16.mp3", hotKey: "j" },
  { fileName: "drums-17.mp3", hotKey: "k" },
  { fileName: "drums-18.mp3", hotKey: "l" },
  { fileName: "drums-19.mp3", hotKey: "z" },
  { fileName: "drums-20.mp3", hotKey: "x" },
  { fileName: "drums-21.mp3", hotKey: "c" },
  { fileName: "drums-22.mp3", hotKey: "v" },
  { fileName: "drums-23.mp3", hotKey: "b" },
  { fileName: "drums-24.mp3", hotKey: "n" },
];

const drumkitElement = document.getElementById("drumkit");

//create the drumkit by creating buttons
const drum = (drumFile, buttonId) => {
  const buttonElement = document.createElement("button");
  buttonElement.id = buttonId;
  //assign each button with button text displaying which hotkey to use
  const hotkeyText = document.createElement("span");
  hotkeyText.textContent = "Hotkey: " + drumFile.hotKey.toUpperCase();
  buttonElement.append(hotkeyText);

  //Assign each button with an audio file based on the array above
  const audioElement = document.createElement("audio");
  audioElement.src = `${folder}/${drumFile.fileName}`;

  drumFile.audioElement = audioElement;
  drumFile.buttonElement = buttonElement;

  //Add play/pause events to the buttons
  buttonElement.addEventListener("pointerdown", () => {
    buttonElement.classList.add("btn-down");
    audioElement.play();
  });

  buttonElement.addEventListener("pointerup", () => {
    buttonElement.classList.remove("btn-down");
    audioElement.pause();
    audioElement.currentTime = 0;
  });

  return buttonElement;
};

//create a random drumroll button This code also
//assigns each button with an ID to easier style them
const randomDrumroll = document.getElementById("drumkit-random");
randomDrumroll.textContent = "Click me for a random drumroll";
drums.forEach((sound, index) => {
  const buttonId = `drumBtn-${index + 1}`;
  drumkitElement.append(drum(sound, buttonId));
});

//This code creates a random drumroll from the drum array. It picks a random number between
//5 and 20 and runs the files one after another.
randomDrumroll.addEventListener("click", () => {
  const numberOfDrums = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
  const randomDrumroll = Array.from({ length: numberOfDrums }, () => {
    const index = Math.floor(Math.random() * drums.length);
    return drums[index];
  });
  playRandomDrumroll(randomDrumroll);
});
function playRandomDrumroll(randomDrumroll) {
  let currentIndex = 0;

  function playNext() {
    if (currentIndex < randomDrumroll.length) {
      const drumFile = randomDrumroll[currentIndex];
      drumFile.buttonElement.classList.add("button-down");
      drumFile.audioElement.play();

      drumFile.audioElement.addEventListener("ended", () => {
        drumFile.buttonElement.classList.remove("button-down");
        currentIndex++;
        playNext();
      });
    }
  }
  playNext();
}

//Assigns both a mouse click as well as keyboard key click event for the buttons.
window.addEventListener("keydown", (event) => {
  const buttonPush = event.key.toLowerCase();
  const makeNoise = drums.find((drum) => drum.hotKey === buttonPush);
  if (!makeNoise) return;

  makeNoise.buttonElement.classList.add("btn-down");
  makeNoise.audioElement.play();
});

window.addEventListener("keyup", (event) => {
  const buttonPush = event.key.toLowerCase();
  const makeNoise = drums.find((drum) => drum.hotKey === buttonPush);
  if (!makeNoise) return;

  makeNoise.buttonElement.classList.remove("btn-down");
  makeNoise.audioElement.pause();
  makeNoise.audioElement.currentTime = 0;
});
