document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const container = document.querySelector(".container");
  
    const gridWidth = container.offsetWidth;
    const gridHeight = container.offsetHeight;
  
    const columns = 8;
    const rows = 3;
    const cardWidth = 120;
    const cardHeight = 120;
  
    // Calculate grid positions
    function getGridPositions(numCards) {
      const positions = [];
      let col = 0;
      let row = 0;
  
      for (let i = 0; i < numCards; i++) {
        const x = col * (gridWidth / columns) + (gridWidth / columns - cardWidth) / 2;
        const y = row * (gridHeight / rows) + (gridHeight / rows - cardHeight) / 2;
  
        positions.push({ x, y });
  
        col++;
        if (col >= columns) {
          col = 0;
          row++;
        }
      }
      return positions;
    }
  
    const gridPositions = getGridPositions(cards.length);
  
    // Set initial positions
    cards.forEach(card => {
      gsap.set(card, {
        x: gridWidth / 2 - cardWidth / 2,
        y: gridHeight / 2 - cardHeight / 2,
      });
    });
  
    // Animate cards into grid layout
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".grid-section",
        start: "top top",
        end: "+=1000", // Sticks for a while
        scrub: true,
        pin: true, // Sticks the section
      },
    });
  
    cards.forEach((card, index) => {
      timeline.to(card, {
        duration: 0.8,
        opacity: 1,
        rotate:0,
        x: gridPositions[index].x,
        y: gridPositions[index].y,
        scale: 1,
        ease: "power3.out",
        stagger: 0.1,
      });
    });
  });
  