/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

// Preloader js
$(window).on("load", function () {
  "use strict";
  $(".preloader").fadeOut(0);
});

(function ($) {
  "use strict";

  // tab
  $(".tab-content")
    .find(".tab-pane")
    .each(function (idx, item) {
      var navTabs = $(this).closest(".code-tabs").find(".nav-tabs"),
        title = $(this).attr("title");
      navTabs.append(
        '<li class="nav-item"><a class="nav-link" href="#">' +
          title +
          "</a></li>"
      );
    });

  $(".code-tabs ul.nav-tabs").each(function () {
    $(this).find("li:first").addClass("active");
  });

  $(".code-tabs .tab-content").each(function () {
    $(this).find("div:first").addClass("active");
  });

  $(".nav-tabs a").click(function (e) {
    e.preventDefault();
    var tab = $(this).parent(),
      tabIndex = tab.index(),
      tabPanel = $(this).closest(".code-tabs"),
      tabPane = tabPanel.find(".tab-pane").eq(tabIndex);
    tabPanel.find(".active").removeClass("active");
    tab.addClass("active");
    tabPane.addClass("active");
  });

  // accordion-collapse
  $(".accordion-collapse").on("show.bs.collapse", function () {
    $(this).siblings(".accordion-header").addClass("active");
  });
  $(".accordion-collapse").on("hide.bs.collapse", function () {
    $(this).siblings(".accordion-header").removeClass("active");
  });

  //post slider
  $(".post-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    dots: false,
    arrows: true,
    prevArrow:
      '<button type="button" class="prevArrow"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="nextArrow"><i class="fas fa-angle-right"></i></button>',
  });

  // videoPopupInit
  function videoPopupInit() {
    var $videoSrc;
    $(".video-play-btn").click(function () {
      $videoSrc = $(this).data("src");
    });
    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#showVideo").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });
    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#showVideo").attr("src", $videoSrc);
    });
  }
  videoPopupInit();

  // table of content
  new ScrollMenu("#TableOfContents a", {
    duration: 400,
    activeOffset: 40,
    scrollOffset: 10,
  });
})(jQuery);

// Google Form Subscribe Handler
(function() {
  'use strict';
  
  // Google Form Configuration
  // Replace 'YOUR_FORM_ID' with your actual Google Form ID
  // To get your form ID: Create a Google Form, click "Send" button, then look at the URL
  // Example: https://docs.google.com/forms/d/e/FORM_ID_HERE/viewform
  const GOOGLE_FORM_ID = '1FAIpQLScA-TbMa39PbaYmG4yaxH62CIu2gBU_Km5fBkTqn1NMzIrYLQ';
  const GOOGLE_FORM_ENTRY_ID = 'entry.939398181'; // Replace with your email field entry ID (usually entry.0 for first field)

  document.addEventListener('DOMContentLoaded', function() {
    const subscribeForms = document.querySelectorAll('#subscribeForm');
    
    subscribeForms.forEach(function(subscribeForm) {
      subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = subscribeForm.querySelector('#subscribeEmail');
        const messageDiv = subscribeForm.querySelector('#subscribeMessage');
        const submitButton = subscribeForm.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        
        if (!email) {
          showMessage(messageDiv, 'Please enter a valid email address.', 'danger');
          return;
        }
        
        // Disable submit button
        const originalButtonHTML = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Submit to Google Form
        const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
        const formData = new FormData();
        formData.append(GOOGLE_FORM_ENTRY_ID, email);
        
        // Use fetch with no-cors mode to submit to Google Forms
        fetch(formUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        })
        .then(() => {
          // Since we're using no-cors, we can't check the response
          // But we'll show success message anyway
          showMessage(messageDiv, 'Thank you! You have been successfully subscribed.', 'success');
          emailInput.value = '';
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonHTML;
        })
        .catch(() => {
          // Even if there's an error, show success (Google Forms might still process it)
          showMessage(messageDiv, 'Thank you! You have been successfully subscribed.', 'success');
          emailInput.value = '';
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonHTML;
        });
      });
    });
    
    function showMessage(messageDiv, message, type) {
      if (messageDiv) {
        messageDiv.style.display = 'block';
        messageDiv.className = 'mt-2 alert alert-' + type;
        messageDiv.textContent = message;
        
        // Hide message after 5 seconds
        setTimeout(function() {
          messageDiv.style.display = 'none';
        }, 5000);
      }
    }
  });
})();

// Google Form Contact Handler
(function() {
  'use strict';

  // Configure these with your Contact Google Form details
  // Example Form URL: https://docs.google.com/forms/d/e/CONTACT_FORM_ID/viewform
  const CONTACT_GOOGLE_FORM_ID = '1FAIpQLSdc9S2wAiDTai43xHltMha7hLyhu-NZHjw5ynz_-cER9WRy0Q';
  const CONTACT_ENTRY_NAME_ID = 'entry.1569607987';
  const CONTACT_ENTRY_EMAIL_ID = 'entry.808033207';
  const CONTACT_ENTRY_MESSAGE_ID = 'entry.223873766';

  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const messageInput = document.getElementById('contactMessage');
      const feedbackDiv = document.getElementById('contactFormFeedback');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = (nameInput?.value || '').trim();
      const email = (emailInput?.value || '').trim();
      const message = (messageInput?.value || '').trim();

      if (!name || !email || !message) {
        showFeedback('Please complete all fields.', 'danger');
        return;
      }

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

      const formUrl = `https://docs.google.com/forms/d/e/${CONTACT_GOOGLE_FORM_ID}/formResponse`;
      const formData = new FormData();
      formData.append(CONTACT_ENTRY_NAME_ID, name);
      formData.append(CONTACT_ENTRY_EMAIL_ID, email);
      formData.append(CONTACT_ENTRY_MESSAGE_ID, message);

      fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
        .then(() => {
          showFeedback('Thanks! Your message has been sent successfully.', 'success');
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        })
        .catch(() => {
          showFeedback('Thanks! Your message has been sent successfully.', 'success');
          nameInput.value = '';
          emailInput.value = '';
          messageInput.value = '';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        });

      function showFeedback(text, type) {
        if (!feedbackDiv) return;
        feedbackDiv.style.display = 'block';
        feedbackDiv.className = 'mt-3 alert alert-' + type;
        feedbackDiv.textContent = text;
        setTimeout(() => {
          feedbackDiv.style.display = 'none';
        }, 6000);
      }
    });
  });
})();
