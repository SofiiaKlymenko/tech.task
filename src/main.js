function makeSlider(element, inputWidth, inputCount, timeToSlide) {
    let i = 1;
    
    for(let li of element.querySelectorAll('li')) {
        li.style.position = 'relative';
        li.insertAdjacentHTML('beforeend', `<span id="counter" style="position:absolute;left:0;top:0;visibility:hidden;">${i}</span>`);
        i++;
    }

    /* конфигурация */
    let width = inputWidth; // ширина картинки
    let count = inputCount; // видимое количество изображений

    let list = element.querySelector('ul');
    let listElems = element.querySelectorAll('li');

    let position = 0; // положение ленты прокрутки
    let counter = 0; // номер прокручиваемого элемента
    
    comments.querySelectorAll('.dots i')[0].style.color = '#5DCA88';
    setInterval(changeToNext, timeToSlide);

    if (element.querySelector('.arrow-prev')) {
        element.querySelector('.arrow-prev').onclick = function() {
            changeToPrev();
        };
    }
    
    if (element.querySelector('.arrow-next')) {
        element.querySelector('.arrow-next').onclick = function() {
            changeToNext();
        };
    }

    function changeDotColor() {
        comments.querySelectorAll('.dots i').forEach((el, index) => {
            if (index === counter) {
                el.style.color = '#5DCA88';
            } else {
                el.style.color = '#8c9494';
            }
        });
    }

    function changeToPrev() {
        // сдвиг влево
        position += width*count;
        // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
        position = Math.min(position, 0);

        list.style.marginLeft = position + 'px';
    }

    function changeToNext() {

        if (position === -width * (listElems.length - count)) {
            position = 0;
            counter = 0;
            list.style.marginLeft = 0;
            changeDotColor();
            return;
        }

        // position -= width;
        position -= width*count;

        // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
        position = Math.max(position, -width * (listElems.length - count));

        list.style.marginLeft = position + 'px';

        switch(position) {
            case 0:
                counter = 0;
                break;
            case -width:
                counter = 1;
                break;
            case -width*2:
                counter = 2;
                break;
        }

        changeDotColor();
    }

}

makeSlider(carousel, 287, 3, 3000);
makeSlider(comments, 453, 1, 3000);