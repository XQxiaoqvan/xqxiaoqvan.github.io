import { onMounted, ref, onUnmounted } from 'vue';
import { toast, type ToastOptions } from 'vue3-toastify';

function parseTime(timeStr: string): number {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
}

let isInitialized = false;
let checkElementInterval: number | undefined;
let observer: MutationObserver | undefined;

const albumArt = ref<HTMLImageElement | null>(null);
const lyricText = ref<HTMLSpanElement | null>(null);
const progressBar = ref<HTMLProgressElement | null>(null);



export function useMusic() {
    onMounted(() => {
        if (isInitialized) return;
        isInitialized = true;

        // 标题名称
        setInterval(() => {
            const currentPlayingElement = document.querySelector('.myhknow');
            if (currentPlayingElement && currentPlayingElement.textContent && currentPlayingElement.textContent.includes('当前播放')) {
                const text = currentPlayingElement.textContent.split('>')[1]?.trim();
                const playerInfoElement = document.querySelector('.player-info');
                if (playerInfoElement) {
                    playerInfoElement.textContent = text || '音乐播放器 - 加载中';
                }

                // 封面
                // 封面
                const albumArtElement = document.querySelector('.myhkcover img');
                if (albumArtElement) {
                    const albumArtSrc = albumArtElement.getAttribute('src');
                    if (albumArt.value && albumArtSrc) {
                        albumArt.value.setAttribute('src', albumArtSrc);
                    }
                }
            }
        }, 1000); 

        // 进度条
        const checkPlayerInterval = setInterval(() => {
            const playerElement = document.getElementById('myhkplayer');
            if (playerElement) {
                clearInterval(checkPlayerInterval); 

                const observer = new MutationObserver(() => {
                    const timeElement = document.querySelector('.timestyle .myhktime');
                    if (timeElement) {
                        const timeText = timeElement.textContent;
                        if (timeText) {
                            const [currentTimeStr, totalTimeStr] = timeText.split('/');
                            const currentTime = parseTime(currentTimeStr.trim());
                            const totalTime = parseTime(totalTimeStr.trim());

                            if (progressBar.value) {
                                progressBar.value.max = totalTime;
                                progressBar.value.value = currentTime;
                            }
                        }
                    }
                });

                observer.observe(playerElement, { childList: true, subtree: true });
            }
        }, 200); 

        // 歌词检查
        const checkLyricsInterval = setInterval(() => {
            const myhkLrcElement = document.getElementById('myhkLrc');
            if (myhkLrcElement && lyricText.value) {
                clearInterval(checkLyricsInterval); 

                const lyricsObserver = new MutationObserver(() => {
                    const currentPlayingElement = myhkLrcElement.querySelector('.myhknow');
                    if (currentPlayingElement && currentPlayingElement.textContent) {
                        const lyricsTextContent = currentPlayingElement.textContent.trim();
                        if (lyricText.value) {
                            lyricText.value.innerHTML = lyricsTextContent || '没有获取到歌词';
                        }
                    } else {
                        if (lyricText.value) {
                            lyricText.value.innerHTML = '暂无歌词';
                        }
                    }
                });

                lyricsObserver.observe(myhkLrcElement, { childList: true, subtree: true });

                // 初始检查是否有内容
                const initialContent = myhkLrcElement.textContent?.trim();
                if (!initialContent) {
                    lyricText.value.innerHTML = '暂无歌词';
                }
            }
        }, 200); 

        // 提示通知
        checkElementInterval = setInterval(() => {
            const myhkTips = document.getElementById('myhkTips');
            if (myhkTips) {
                clearInterval(checkElementInterval); 

                let initialTipsContent = myhkTips.textContent || '';

                observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === "characterData" || mutation.type === "childList") {
                            const currentTipsContent = myhkTips.textContent || '';

                            if (currentTipsContent !== initialTipsContent) {
                                toast(`<i class="fa-solid fa-circle-exclamation"></i> ${currentTipsContent}`, {
                                    autoClose: 1000,
                                } as ToastOptions);

                                initialTipsContent = currentTipsContent;
                            }
                        }
                    });
                });

                const config = { childList: true, subtree: true, characterData: true };

                observer.observe(myhkTips, config);
            }
        }, 200); 

    });

    onUnmounted(() => {
        if (checkElementInterval) clearInterval(checkElementInterval);
        if (observer) observer.disconnect();
    });

    return {
        albumArt,
        lyricText,
        progressBar
    };
}