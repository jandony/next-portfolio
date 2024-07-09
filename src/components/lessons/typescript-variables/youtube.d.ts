// VideoPlayer.tsx Youtube Variable
declare namespace YT {
    class Player {
      constructor(elementId: string | HTMLElement, options: PlayerOptions);
      playVideo(): void;
      pauseVideo(): void;
      seekTo(seconds: number, allowSeekAhead: boolean): void;
      destroy(): void;
    }
  
    interface PlayerEvent {
      target: Player;
    }
  
    interface PlayerOptions {
      height?: string;
      width?: string;
      videoId: string;
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: PlayerEvent) => void;
        onPlaybackQualityChange?: (event: PlayerEvent) => void;
        onPlaybackRateChange?: (event: PlayerEvent) => void;
        onError?: (event: PlayerEvent) => void;
        onApiChange?: (event: PlayerEvent) => void;
      };
    }
  }
  
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
  