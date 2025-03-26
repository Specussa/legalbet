document.querySelectorAll('.card__arrow').forEach(arrow => {
  arrow.addEventListener('click', function() {
    const description = this.closest('.card__description');
    const textElement = description.querySelector('.card__description_text');
    const lineHeight = parseFloat(getComputedStyle(textElement).lineHeight);
    const collapsedHeight = lineHeight * 5;
    const isExpanding = !description.classList.contains('active');

    if (isExpanding) {
      // 1. Подготовка к раскрытию
      description.classList.add('active');
      textElement.style.maxHeight = `${collapsedHeight}px`;
      
      // 2. Замер полной высоты
      requestAnimationFrame(() => {
        const fullHeight = textElement.scrollHeight;
        
        // 3. Анимация раскрытия
        requestAnimationFrame(() => {
          textElement.style.maxHeight = `${fullHeight}px`;
          
          // 4. После завершения анимации
          const onTransitionEnd = () => {
            textElement.style.maxHeight = 'none'; // Убираем ограничение
            textElement.removeEventListener('transitionend', onTransitionEnd);
          };
          textElement.addEventListener('transitionend', onTransitionEnd, { once: true });
        });
      });
    } else {
      // 1. Подготовка к закрытию
      const currentHeight = textElement.scrollHeight;
      textElement.style.maxHeight = `${currentHeight}px`;
      
      // 2. Даём браузеру подготовиться
      requestAnimationFrame(() => {
        // 3. Анимация закрытия
        textElement.style.maxHeight = `${collapsedHeight}px`;
        
        // 4. После завершения анимации
        const onTransitionEnd = () => {
          description.classList.remove('active');
          textElement.style.maxHeight = '';
          textElement.removeEventListener('transitionend', onTransitionEnd);
        };
        textElement.addEventListener('transitionend', onTransitionEnd, { once: true });
      });
    }
  });
});