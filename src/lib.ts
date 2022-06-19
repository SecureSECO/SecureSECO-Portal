// Create a fake asynchronous delay; Useful for testing loading states and such
export const fakeDelay = async (delay = 1000) => {
  if (import.meta.env.MODE === 'no-api') {
    await new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }
};
