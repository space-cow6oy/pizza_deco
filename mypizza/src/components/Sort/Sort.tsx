import { useState, useRef, useEffect } from 'react';
import styles from './Sort.module.css';
import { setActiveSortType } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Sort = (/*{ sortType, setSortType, sortTypes }*/) => {
  /**------------------------------------------------------------------------------------------------
   * !                                          VISABILITY logic
   *   Создаем стейт для условного рендеринга при нажатии isVisible
   *   Далее используем useEffect тк нам нужно чтобы eventListener создавался только при первой отрисовке
   *   компонента, а не еще по одному при кадждом ререндере
   *   Создаем ссылку на элемент сортировки через useRef
   *   Создаем функцию handleClick, которая принимает event и говорим, что если при клике в этот ивент не имеет в
   *   path наш элемент useRef, то скрываем попап
   *   Далее создаем листенер на клик, который будет выполнять handleClick
   *   Но так же создаем return в useEffect'e (отрабатывает при inmount'e компонента) и кидаем туда функцию,
   *   которая вызвает removeEventListener, тк изначальный addEvent дудет работать, даже если на экране не будет
   *   компонента сортироовки (например в корзине). То есть без этого при кликах в корзине будет работать листенер
   *------------------------------------------------------------------------------------------------**/
  const [isVisible, setIsVisible] = useState(false);
  const input = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (input.current && !event.composedPath().includes(input.current)) {
        // console.log('clicked')
        setIsVisible(false);
      }
    };
    document.body.addEventListener('click', handleClick);

    return () => document.body.removeEventListener('click', handleClick);
  }, []);
  /*============================ END OF visibility ============================*/

  /**========================================================================
   * !                              SORTING logic
   *   create array of sorting types (sortTypes)
   *   import setActiveSortType action from  '../../redux/slices/filterSlice'
   *   select activeSortType from store (useSelector) (state.filter.activeSortType)
   *   create function that set ActiveSortType and close popup (setIsVisible(false))
   *   render sortTypes, create logic of onClick etc...
   *========================================================================**/
  const sortTypes = ['популярности', 'цене', 'алфавиту'];

  const activeSortType = useSelector((state: any) => state.filter.activeSortType);
  const dispatch = useDispatch();

  const changeType = (index: number) => {
    setIsVisible(false);
    dispatch(setActiveSortType(sortTypes[index]));
  };
  /*------------------------------------------ END OF Sorting ------------------------------------------*/

  return (
    <div className={styles.sort} ref={input}>
      <span className={styles.span}>
        Сортировка по:{' '}
        <span onClick={() => setIsVisible(!isVisible)} className={styles.span__dashed}>
          {activeSortType}
        </span>
      </span>

      {isVisible && (
        <ul className={styles.popup__ul}>
          {sortTypes.map((activeSortType, index) => (
            <li onClick={() => changeType(index)} className={styles.li} key={index}>
              {activeSortType}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
