// Array holding image data (src, isCorrect, feedback, caption/label)
const imageSets = [
  [
    ['img/01.jpg', false, "<b>Try again.</b><br> While this image shows gender diversity, there is little representation of other types of diversity. Consider a different option.", "Option A", "A group of five people gathered around a table, examining a tablet together, engaged in discussion."], // First image (incorrect)
    ['img/02.jpg', false, "<b>Try again.</b><br> While this image shows gender diversity, there is little representation of other diversities. This image <b>does</b> fit the context of a business environment. Consider a different option.", "Option B", "Team of business individuals seated at a table in an office"],  // Second image (correct)
    ['img/03.jpg', false, "<b>Try again.</b><br> While this image shows cultural diversity, there is little representation of other diversities. This image <b>does not</b> fit the context of a business environment. Consider a different option.", "Option C", "For female co workers stand together smiling by a wall. One is holding a laptop, another is holding a takeaway coffee and another is holding a notepad."], // Third image (incorrect)
    ['img/04.jpg', true, "<b>Well done.</b><br> This image shows cultural and gender diversity. This image <b>does</b> fit the context of a business environment. ", "Option D", "A diverse group of business professionals collaborating in a modern office setting."],  // Fourth image (correct)
  ],
  [
    ['img/07.jpg', false, "<b>Try again.</b><br> This image <b>does not</b> challenge gender stereotypes.", "Option A", "A group of men in safety vests and hard hats gathered around scaffolding at a construction site."],
    ['img/08.jpg', true, "<b>Well done.</b><br> This image is diverse and challenges gender stereotypes. It could be improved by including other diversities.", "Option B", "A group of individuals in orange safety vests stands beside a road sign"],
    ['img/09.jpg', false, "<b>Try again.</b><br> This image <b>does not</b> challenge gender stereotypes and represents little diversity.", "Option C", "Three men in hard hats stand in front of a construction site"],
    ['img/10.jpg', false, "<b>Try again.</b><br> This image challenges gender stereotypes but could be improved by balancing genders and including other diversities.", "Option D", "Four individuals in hard hats examine a laptop together, discussing their work on a construction site."],
  ],
  [
    ['img/16.jpg', true, "<b>Well done.</b><br> This image lacks diversity and <b>does not</b> represent an inclusive work environment.", "Option A", "Three business professionals collaborating on a laptop in a modern office setting."],
    ['img/12.jpg', false, "<b>Try again.</b><br> This image represents multiple aspects of diversity, including disability and gender. Find the image that lacks diversity.’", "Option B", " Three people in an office, one in a wheelchair, collaborating around a laptop on a desk."],
    ['img/13.jpg', false, "<b>Try again.</b><br> This image includes gender diversity and people from different backgrounds. Find the image that lacks diversity.", "Option C", "Several doctors in scrubs and white coats gathered in a hospital corridor."],
    ['img/15.jpg', false, "<b>Try again.</b><br> This image effectively represents diversity, including disability and people from different backgrounds. Find the image that lacks diversity.", "Option D", "A diverse group of people sitting around a table in a yellow room."],
  ],
  [
    ['img/17.jpg', false, "<b>Try again.</b><br> This image lacks aspects of diversity, including age and gender diversity.", "Option A", "Three men wearing hard hats stand in front of a building, discussing construction plans."],
    ['img/18.jpg', false, "<b>Try again.</b><br> This image lacks aspects of diversity, including age, racial and cultural diversity.", "Option B", "A group of construction workers poses in front of a building under construction, wearing hard hats and safety vests."],
    ['img/19.jpg', true, "<b>Well done.</b><br> This image shows age, gender, and racial diversity in the construction industry.", "Option C", "Two men and a woman in hard hats and vests, gathered around a construction site, reviewing a large safety plan together."],
  ],
  [
    ['img/20.jpg', false, "<b>Try again.</b><br>This image lacks diversity and <b>does not</b> represent an inclusive education environment.", "Option A", "A diverse group of people engaged in a discussion in a classroom setting, seated at desks with learning materials."],
    ['img/21.jpg', false, "<b>Try again.</b><br>This image lacks diversity and <b>does not</b> represent an inclusive education environment.", "Option B", "A woman stands in front of a classroom, with some students seated at desks behind her."],
    ['img/24.jpg', true, "<b>Well done.</b><br>This image represents multiple aspects of diversity, including age, gender and race.", "Option C", "A female teacher stands in front of a classroom, with some students seated at desks behind her."],
    ['img/23.jpg', false, "<b>Try again.</b><br> While this image shows gender diversity, there is little representation of other diversities.", "Option D", "A diverse group of individuals sitting at desks in a classroom."],
  ],
];

const instructTexts = [
  "Out of these four images, select the image that best represents diversity in a business environment.",
  "You're teaching a course in a construction industry field where women are underrepresented. Which image would best challenge gender stereotypes?",
  "Which of these images would you <b>avoid</b> using from a diversity perspective?",
  "Out of these three images, select the image that best represents diversity in the construction industry.",
  "The four following images were generated using AI, with the prompt 'A teacher standing in a classroom full of students'. Select the image that best represents diversity in a learning environment."];

const overallCorrectness = []; // populated based on selections for each set { id: "img_set_1_img_3", isCorrect: false, feedback: "..." }

let currentSetIndex = 0; // Start on the first set of images

// Variables
const container = document.getElementById('image_container');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');
const correctness = document.querySelector('.correct_or_incorrect');
const feedbackText = document.querySelector('.extra_feedback');
const feedbackPane = document.querySelector(".feedback_pane");
const feedbackContainer = document.querySelector(".feedback_container");
const closePopup = document.querySelector('.close_popup');
const instructText = document.querySelector('.instruction_text');
const overlay = document.getElementById('overlay');
const popupImage = document.querySelector('.popup');

function loadImageSet(setIndex) {
  const images = imageSets[setIndex];
  console.log("Loading set:", currentSetIndex);

  // Clear container
  container.innerHTML = '';

  images.forEach((imageData, index) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');

    instructText.innerHTML = instructTexts[setIndex];

    const img = document.createElement('img');
    img.src = imageData[0];
    img.alt = `Image ${index + 1}`;
    img.title = `Image ${index + 1}`;
    img.classList.add('image-box');
    img.id = `img_set_${setIndex + 1}_img_${index + 1}`;
    img.setAttribute('tabindex', '0');

    // Click / keyboard handlers
    img.addEventListener('click', () => checkAnswer(imageData[1], img, imageData[2]));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') checkAnswer(imageData[1], img, imageData[2]);
    });

    // Caption
    const captionDiv = document.createElement('div');
    captionDiv.classList.add('caption');
    const p = document.createElement('p');
    p.textContent = imageData[3];

    // Enlarge icon
    const enlargeIcon = document.createElement('img');
    enlargeIcon.src = 'img/enlarge-icon-64px-1.png';
    enlargeIcon.alt = 'Enlarge Image';
    enlargeIcon.classList.add('img_enlarge');
    enlargeIcon.setAttribute('tabindex', '0');
    enlargeIcon.title = "Enlarge image";

    captionDiv.appendChild(p);
    captionDiv.appendChild(enlargeIcon);
    imageWrapper.appendChild(img);
    imageWrapper.appendChild(captionDiv);
    container.appendChild(imageWrapper);

    // Enlarge handlers
    function handleImageEnlarge(event) {
      if (event.type === 'click' || event.key === 'Enter' || event.key === ' ') {
        const imgToEnlarge = event.currentTarget.closest('.image-wrapper').querySelector('img').src;
        overlay.style.display = 'block';
        popupImage.src = imgToEnlarge;
        popupImage.alt = `Image ${index + 1}`;
        popupImage.title = `Image ${index + 1}`;
        img.setAttribute('tabindex', '-1');
        enlargeIcon.setAttribute('tabindex', '-1');
        popupImage.focus();
      }
    }

    enlargeIcon.addEventListener('click', handleImageEnlarge);
    enlargeIcon.addEventListener('keydown', handleImageEnlarge);

    closePopup.addEventListener('click', function () {
      overlay.style.display = 'none';
      img.setAttribute('tabindex', '0');
      enlargeIcon.setAttribute('tabindex', '0');
    });
  });

  // Back button visibility
  backButton.disabled = currentSetIndex === 0 ? true : false;

  // Next button visibility
  nextButton.disabled = currentSetIndex === imageSets.length - 1 ? true : false;

  // Restore previous selection if exists
  if (overallCorrectness[currentSetIndex]) {
    const saved = overallCorrectness[currentSetIndex];
    const thisQ = document.querySelector(`#${saved.id}`);
    if (thisQ) thisQ.classList.add("selected");

    feedbackText.innerHTML = saved.feedback;
    correctness.innerHTML = saved.isCorrect
      ? '<img src="img/trophy_icon.png" class="correctness_icon" alt="trophy icon">'
      : '<img src="img/question_mark_icon.png" class="correctness_icon" alt="question mark icon">';
  } else {
    feedbackText.innerHTML = "";
    correctness.innerHTML = "";
  }
}

// Check answer function with correctess, selected img and feedback message as parameters 
function checkAnswer(isCorrect, selectedImg, feedbackMessage) {
    console.log(overallCorrectness)
  const imgs = document.querySelectorAll('.image-box');
  imgs.forEach(img => img.classList.remove('selected'));

  // Save selection wether correct or not 
  overallCorrectness[currentSetIndex] = {
    id: selectedImg.id,
    isCorrect: isCorrect,
    feedback: feedbackMessage
  };

  selectedImg.classList.add('selected');

  // Feedback
  feedbackPane.classList.remove("fade");
  setTimeout(() => {
    correctness.innerHTML = isCorrect
      ? '<img src="img/trophy_icon.png" class="correctness_icon" alt="trophy icon">'
      : '<img src="img/question_mark_icon.png" class="correctness_icon" alt="question mark icon">';

    feedbackText.innerHTML = feedbackMessage;
    feedbackPane.classList.add("fade");

    if (!feedbackContainer.classList.contains("fade")) {
      feedbackContainer.classList.add("fade");
    }
  }, 200);
}

// Navigation
nextButton.addEventListener('click', () => {
  feedbackContainer.classList.remove("fade");
  currentSetIndex++;
  if (currentSetIndex < imageSets.length) loadImageSet(currentSetIndex);
});

backButton.addEventListener('click', () => {
  currentSetIndex--;
  if (currentSetIndex >= 0) loadImageSet(currentSetIndex);
});

// Overlay close
overlay.addEventListener('click', function (event) {
  if (event.target === overlay) overlay.style.display = 'none';
});

//Load first set of images initially
loadImageSet(currentSetIndex);
