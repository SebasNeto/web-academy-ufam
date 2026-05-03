const customName = document.getElementById('custom-name');
const randomize = document.querySelector('.generate');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = [
  "Estava fazendo 94 fahrenheit lá fora, então :insertx: decidiu dar um passeio. Quando chegaram em :inserty:, ficaram paralisados por alguns momentos, então :insertz:. Bob viu tudo, mas não ficou surpreso — :insertx: pesa 300 pounds, e era um dia muito quente.",
  "Dizem que em :inserty: a temperatura chega a 94 fahrenheit. :insertx: foi verificar se era verdade e acabou que :insertz:. Bob estava por perto e registrou que :insertx: pesa 300 pounds.",
  "Em um dia de 94 fahrenheit, :insertx: viajou até :inserty:. O que ninguém esperava é que :insertx: :insertz:. Bob observou que mesmo com 300 pounds, a agilidade foi impressionante."
];

const insertX = ["Shrek", "Elsa", "Naruto"];
const insertY = ["a Fenda do Biquíni", "Tão Tão Distante", "a Terra do Nunca", "o Castelo Animado"];
const insertZ = ["começou a cantar uma música tema", "derreteu como o Olaf no verão", "virou um mestre Pokémon e sumiu", "usou um jutsu multiclones"];

randomize.addEventListener('click', result);

function result() {
  let newStory = randomValueFromArray(storyText);

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replace(':inserty:', yItem);
  newStory = newStory.replace(':insertz:', zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 * 0.0714286) + ' stone';
    const temperature =  Math.round((94 - 32) * 5 / 9) + ' centigrade';
    
    newStory = newStory.replace('300 pounds', weight);
    newStory = newStory.replace('94 fahrenheit', temperature);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}