# Bankist-Landing-Page

this project demostrates the usage of advance DOM:

1. Scroll to the section when clicking the btn
   
  a. getBoundingClientRect()
  b. window.scrollTo() 
  c. scrollIntoView()

3. Scroll to the section when clicking the navs
  a. It's better to add event listener to common parent element, instead of adding on many navs (higher performance)
    i. Add event listener to common parent element
    ii. Determine what element originated the event

4. Change to the corresponding content when clicking on the tabs
  a. closest(): traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.

5. Sticky navigation
  a. IntersectionObserver

6. Reveal the sections only when scroll to the sections
  a. IntersectionObserver

7. Lazy loading image: load the images only when scrolling to the images
  a. IntersectionObserver

8. Slider effect
  a. insertAdjacentHTML()
  b. translateX()
