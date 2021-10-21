export function loadRender(popup, isLoading) {
    const loadBtn = popup.querySelector('.popup__submit')
    if (isLoading) {
        loadBtn.textContent = 'Сохранение...';
    } else {
        loadBtn.textContent = 'Создать';
    }
}