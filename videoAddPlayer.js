const videoPlayer = document.getElementById('videoPlayer');
const videoFileInput = document.getElementById('videoFileInput');
const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
    const file = videoFileInput.files[0];
    
    if (!file) {
        alert('Сначала выберите видеофайл');
        return;
    }
    
    // Создаем временный URL для файла
    const videoURL = URL.createObjectURL(file);
    videoPlayer.src = videoURL;
    
    // Автоматически начинаем воспроизведение
    videoPlayer.play().catch(e => {
        console.log('Автовоспроизведение не сработало:', e);
    });
    
    // Очищаем память когда видео закончится
    videoPlayer.addEventListener('ended', () => {
        URL.revokeObjectURL(videoURL);
    });
});