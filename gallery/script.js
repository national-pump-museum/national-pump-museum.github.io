'use strict';

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded (event) {
  const galleryItems = [...document.querySelectorAll('.gallery-item')];

  function resizeGalleryItem (item, img) {
    let className = img.naturalHeight > img.naturalWidth?
        'gallery-item__photo-portrait':
        'gallery-item__photo-landscape';
    item.classList.add(className);
  }

  galleryItems.forEach(item => {
    const img = item.querySelector('.gallery-item__photo');
    if (img.complete) {
      resizeGalleryItem(item, img);
    } else {
      img.addEventListener('load', _ => resizeGalleryItem(item, img), false);
    }
  });
}, false);
