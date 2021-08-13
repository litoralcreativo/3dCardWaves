const cardContainer = document.getElementById('card-container');
const card = document.getElementById('card');
const cardDimension = {width: cardContainer.offsetWidth, height: cardContainer.offsetHeight};
const cardWidth = cardContainer.offsetWidth;
cardContainer.addEventListener('mousemove', e => {
    mousePosition.x = e.offsetX;
    mousePosition.y = e.offsetY;
    mousePosition.z = 1;
    updateCardPosition();
});
cardContainer.addEventListener('mouseout', e => {
    mousePosition.x = cardDimension.width/2;
    mousePosition.y = cardDimension.height/2;
    mousePosition.z = 0;
    updateCardPosition();
});

const updateCardPosition = () => {
    let relativeX = clamp(mousePosition.x / cardDimension.width, 0, 1);
    relativeX -= 0.5;
    relativeX *= 2;

    let relativeY = clamp(mousePosition.y / cardDimension.height, 0, 1);
    relativeY -= 0.5;
    relativeY *= 2;
    mousePosition_relative.x = relativeX;
    mousePosition_relative.y = relativeY;
    mousePosition_relative.z = mousePosition.z;
}
const mousePosition = {
    x: 0,
    y: 0,
    z: 0
}
const mousePosition_relative = {
    x: 0,
    y: 0,
    z: 0
}
const mousePosition_relative_lerped = {
    x: 0,
    y: 0,
    z: 0,
}
const clamp = (num, min, max) => {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
}
function lerp (start, end, amt){
    return (1-amt)*start+amt*end
}
function move(){    
    mousePosition_relative_lerped.x = lerp (mousePosition_relative_lerped.x, mousePosition_relative.x, 0.05);
    mousePosition_relative_lerped.y = lerp (mousePosition_relative_lerped.y, mousePosition_relative.y, 0.05);
    mousePosition_relative_lerped.z = lerp (mousePosition_relative_lerped.z, mousePosition_relative.z, 0.05);
    const x = mousePosition_relative.x * 15;
    const y = mousePosition_relative_lerped.y * -10;
    const z = mousePosition_relative_lerped.z * 50;
    const rotationString = `rotateY(${x}deg) rotateX(${y}deg) translateZ(${z}px)`;
    card.style.transform = rotationString;
}
setInterval (move,1000/60)
