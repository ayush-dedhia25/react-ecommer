import confetti from 'canvas-confetti';

function runFireworks() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  // Select a radom number between given range
  const randomInRange = (min, max) => Math.random() * (min, max) + min;

  // Confetti Code Loop
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    // Confetti particles count
    const particleCount = 50 * (timeLeft / duration);

    confetti(
      Object.assign({}, defaults, {
        particleCount: particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2,
        },
      })
    );

    confetti(
      Object.assign({}, defaults, {
        particleCount: particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2,
        },
      })
    );
  }, 250);
}

export default runFireworks;
