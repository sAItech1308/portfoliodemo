export function initRevealEffect(stage) {
  if (!stage) return;

  const images = [...stage.querySelectorAll('.portrait')];
  const updateImageState = () => {
    const loadedImages = images.filter((image) => image.complete && image.naturalWidth > 0);
    images.forEach((image) => image.classList.toggle('is-loaded', image.complete && image.naturalWidth > 0));
    stage.classList.toggle('is-missing', loadedImages.length !== images.length);
    stage.classList.toggle('has-pair', loadedImages.length === images.length);
  };

  images.forEach((image) => {
    image.addEventListener('load', updateImageState);
    image.addEventListener('error', updateImageState);
  });
  updateImageState();

  let targetX = stage.clientWidth * 0.68;
  let targetY = stage.clientHeight * 0.42;
  let currentX = targetX;
  let currentY = targetY;
  let frameId;

  const render = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    stage.style.setProperty('--reveal-x', `${currentX}px`);
    stage.style.setProperty('--reveal-y', `${currentY}px`);

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      frameId = requestAnimationFrame(render);
    } else {
      frameId = undefined;
    }
  };

  const moveReveal = (event) => {
    const bounds = stage.getBoundingClientRect();
    targetX = event.clientX - bounds.left;
    targetY = event.clientY - bounds.top;
    if (!frameId) frameId = requestAnimationFrame(render);
  };

  stage.addEventListener('pointerenter', (event) => {
    stage.classList.add('is-active');
    moveReveal(event);
  });
  stage.addEventListener('pointermove', moveReveal);
  stage.addEventListener('pointerleave', () => stage.classList.remove('is-active'));
  stage.addEventListener('pointerdown', (event) => {
    stage.classList.add('is-active');
    moveReveal(event);
  });
}
