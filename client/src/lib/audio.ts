class AudioPlayer {
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private volume: number = 0.8; // Increased default volume

  init() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
    }
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.gainNode) {
      this.gainNode.gain.value = volume;
    }
  }

  playNotification() {
    this.init();
    if (!this.audioContext || !this.gainNode) return;

    // Stop any existing sound
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
    }

    // Create and configure oscillator
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.type = 'sine';
    this.oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5 note

    // Connect and start
    this.oscillator.connect(this.gainNode);
    this.gainNode.gain.value = this.volume;

    // Play for 200ms
    this.oscillator.start();
    this.oscillator.stop(this.audioContext.currentTime + 0.2);

    // Request permission and show notification
    this.showNotification();
  }

  showNotification() {
    if (Notification.permission === "granted") {
      this.displayNotification();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          this.displayNotification();
        }
      });
    }
  }

  displayNotification() {
    const title = document.title;
    const options = {
      body: "Timer completed!",
      icon: "/favicon.ico"
    };
    new Notification(title, options);
  }
}

export const audioPlayer = new AudioPlayer();