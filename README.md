# Bankist-Landing-Page

this project demostrates the usage of advance DOM:

1. Scroll to the section when clicking the btn
  a. getBoundingClientRect()
  b. window.scrollTo()
  c. scrollIntoView()

2. Scroll to the section when clicking the navs
  a. It's better to add event listener to common parent element, instead of adding on many navs (higher performance)
    i. Add event listener to common parent element
    ii. Determine what element originated the event

3. Change to the corresponding content when clicking on the tabs
  a. closest(): traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.

4. Sticky navigation
  a. IntersectionObserver

5. Reveal the sections only when scroll to the sections
  a. IntersectionObserver

6. Lazy loading image: load the images only when scrolling to the images
  a. IntersectionObserver

7. Slider effect
  a. insertAdjacentHTML()
  b. translateX()
