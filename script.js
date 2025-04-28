$(() => {
  $(".results-slide-row").each((switcher_index, switcher) => {
    const $switcher = $(switcher);

    $switcher.children().each((switcher_child_index, child) => {
      const $child = $(child);
      const $input = $("<button>", {
        class: "thumbnail-btn",
        id: $child.data("id"),
        "data-type": $child.data("type"),
        "data-section": $child.data("section")
      });
      const $img = $("<img>", {
        class: "thumbnails",
        alt: "paper",
        src: $child.data("img-src"),
      });
      $input.append($img);
      const $label = $("<label>", {
        text: $child.data("label"),
        class: "thumbnail_label",
      });
      $input.append($label);
      $switcher.append($input);
    });
  });
});
// Array of iframe IDs
const iframeIds = ['nov22', 'nov27', 'dec07','dec12','dec17','dec22','dec28','jan02','jan07', 'jan12', 'feb13', 'feb16', 'feb22', 'feb26', 'mar01', 'mar05', 'mar09'];
const quinoaImageIds = ['nov22_marvin', 'nov27_marvin', 'dec07_marvin','dec12_marvin','dec17_marvin','dec22_marvin','dec28_marvin','jan02_marvin','jan07_marvin', 'jan12_marvin'];
const sequoiaImageIds = ['feb13_marvin', 'feb16_marvin', 'feb22_marvin', 'feb26_marvin', 'mar01_marvin', 'mar05_marvin', 'mar09_marvin'];
const videoIds = ['bear_video', 'nerfgun_video', 'redbox_video', 'scissors_video', 'sunglasses_video', 'ledlight_video', 'stapler_video', 'wirecutters_video', 'usbplug_video'];

// Function to show the selected iframe and hide others
function showIframe(iframeId) {
  iframeIds.forEach(id => {
    const iframe = document.getElementById(id);
    // console.log(iframe);
    if (iframe) {
      if (id === iframeId) {
        iframe.classList.add('show');
        iframe.src = $(iframe).data('src');
      } else {
        iframe.classList.remove('show');
        iframe.src = "";
      }
    }
  });
}
// Function to show the selected video and hide others
function showVideo(videoId) {
  videoIds.forEach(id => {
    const video = document.getElementById(id);
    if (video) {
      if (id === videoId) {
        video.classList.add('show');
        video.querySelector('video').play(); // Play the selected video
      } else {
        video.classList.remove('show');
        video.querySelector('video').pause(); // Pause other videos
        video.querySelector('video').currentTime = 0; //Also restart all others
      }
    }
  });
}
// Function to show the selected Quinoa image and hide others
function showQuinoaImage(imageId) {
  quinoaImageIds.forEach(id => {
    const image = document.getElementById(id);
    if (image) {
      if (id === imageId) {
        image.classList.add('show');
      } else {
        image.classList.remove('show');
      }
    }
  });
}

// Function to show the selected Sequoia image and hide others
function showSequoiaImage(imageId) {
  sequoiaImageIds.forEach(id => {
    const image = document.getElementById(id);
    if (image) {
      if (id === imageId) {
        image.classList.add('show');
      } else {
        image.classList.remove('show');
      }
    }
  });
}

let currentThumbnail = 0;
let thumbnailFromIndex = {}
let thumbnailCount = 0;

// Function to set up thumbnail click events
function setupThumbnailClickEvents() {
  $('.thumbnail-btn').each((index, thumbnail) => {
    thumbnailCount += 1;
    thumbnailFromIndex[index] = thumbnail;
    $(thumbnail).click(function() {
      const buttonId = $(thumbnail).attr('id');
      if (buttonId === undefined) return;


      const iframeId = buttonId.replace('-thumb', '');
      const type = $(thumbnail).data('type');
      const section = $(thumbnail).data('section');

      currentThumbnail = index;
      $('.thumbnail-btn').css('opacity', '');
      $(thumbnail).css('opacity', '1.0');
      
      showIframe(iframeId);
      

      if (type === 'video') {
        showVideo(iframeId + '_video');
      } else if (type === 'image') {
        if (section === 'quinoa') {
          showQuinoaImage(iframeId + '_marvin');
        } else if (section === 'sequoia') {
          showSequoiaImage(iframeId + '_marvin');
        }
      }
      

      // Make sure the new thumbnail is visible.
      const slider_window = document.getElementById('results-objs-scroll');
      slider_window.scrollLeft = thumbnail.offsetLeft - slider_window.offsetWidth / 2;
    });
  });

  $(thumbnailFromIndex[0]).click();
}

// For main results object carousel -- left/right arrow clicks to navigate
function results_slide_left() {
  const newIndex = ((currentThumbnail - 1 + thumbnailCount) % thumbnailCount);
  const newThumbnail = thumbnailFromIndex[newIndex];
  $(newThumbnail).click();
}
function results_slide_right() {
  const newIndex = (currentThumbnail + 1) % thumbnailCount;
  const newThumbnail = thumbnailFromIndex[newIndex];
  $(newThumbnail).click();
}



// Initialize the page
function initializePage() {
  setupThumbnailClickEvents();

  // Show the first iframe by default
  if (iframeIds.length > 0) {
    showIframe(iframeIds[0]);
  }
  if (videoIds.length > 0) {
    showVideo(videoIds[0]);
  }

  if (quinoaImageIds.length > 0) {
    showQuinoaImage(quinoaImageIds[0]);
  }
  if (sequoiaImageIds.length > 0) {
    showSequoiaImage(sequoiaImageIds[0]);
  }
}
// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);

// // Get event listener for when window resized
// window.addEventListener('resize', () => {
//   // Resize the video arrows to be in the right place.
//   const prev_arr = document.getElementById('vid-slide-arrow-prev');
//   const next_arr = document.getElementById('vid-slide-arrow-next');
//   console.log("foo", prev_arr.style);
// });
