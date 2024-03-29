import s from './Search.module.scss';
import { BsXLg } from 'react-icons/bs';
import { setSearchValue } from '../../redux/slices/searchSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
//@ts-ignore
import debounce from 'lodash.debounce';

export const Search = () => {
  /**------------------------------------------------------------------------------------------------
   * !                                          DEBOUNCE logic
   *   Селектим searchValue из стора, при изменении этой переменной отправляется запрос на сервер (она в useEffect)
   *   Т.к. мы не хотим отправлять новый запрос на сервер при каждом изменении в инпуте, то мы не можем использовать
   *   searchValue в качестве value для инпута
   *   Вместо этого мы создаем локальный стейт (searchtext) и передаем его в качестве value для инпута
   *   Затем создаем функцию onChangeInput, которая должна менять текст в инпуте через searchtext
   *   и через определенный лаг передавать то, что в инпуте(searchtext) в searchValue, и тогда новый запрос
   *   на сервер отправляется.
   *   Чтобы реализовать данный лаг, воспользуемся Debounce'ом из лодэша.
   *   Т.к. на каждый ререндер функционального компонениа реакт выдялает разные места в памяти, это означает,
   *   что функция makeDebounce при каждом ререндере будет менять свое место в памяти и соответственно
   *   вызываться каждый раз заново(это приводит к тому, что при каждом рендере вызывается по сути новый
   *   debounce и отрабаотывает, а если это была бы одна и та же функция в памяти, то debounce
   *   запомнил бы, что уже отрабатывал и не выполнял dispatch, то есть в наешм случае мы говорим, что debounce
   *   зависит от перерендеров (все отсальные переменные изменяются, и makeDebounce узнает об этом ввиду
   *   обращения к лексической области видимости (получается ваерхней, тк там уже из-за рендера все значения поменялись,
   *   makeDebounce ищет на уровне выше переменные при каждом ререндере и на каждом ререндере у них новые значения,
   *   поэтому makeDebounce знает о новых значениях при каждом ререндере).
   *   Однако сам makeDebounce остается при кажддом рендере одной и той же функцией в памяти и происходит
   *   ситуация, когда makeDebounce сам по себе не зависит он ререндеров. То есть при каждом ререндере при том,
   *   что все вокруг меняется, makeDebounce остается той же функцией, которая никак от ререндеров не
   *   зависит, но все вокруг makeDebounce зависит от ререндеров и меняет свое значение, в то время как для
   *   makeDebounce он остается неизменяемой функцией в то время, как все вокруг него почему-то меняется
   *   (и меняются даже переменные, значения которых принимает makeDebounce). Именно из-за того, что эти
   *   переменные меняются, а makeDebounce нет, то debounce может нормально работать (делать задержку при изменении
   *   value).
   *   Поэтому используем useCallback, который вернет неизменяемую функцию, и в массив зависимостей ничего не
   *   передадим, тк нам нужно, чтобы makeDebounce создался и потом не изменялся.
   *
   *
   *   То есть в onChangeInput меняется локальный стейт (который в инпут setSearchText(e.target.value), а
   *   потом в  makeDebounce передаем e.target.value, (теперь dispatch(setSearchValue(value)) будет вызываться только
   *   после задержки)
   *------------------------------------------------------------------------------------------------**/
  const searchValue = useSelector((state: any) => state.search.searchValue);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');

  // const makeDebounce = (value) => {
  //   debounce(
  //     (value) => {
  //       console.log('debounce', value);
  //       dispatch(setSearchValue(value));
  //     },
  //     1000,
  //   )()
  //   };

  const makeDebounce = useCallback(
    debounce((value: string) => {
      console.log('debounce', value);
      dispatch(setSearchValue(value));
    }, 1000),
    [],
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    makeDebounce(e.target.value);
  };
  /*------------------------------------------ END OF DEBOUNCE ------------------------------------------*/

  /**------------------------------------------------------------------------------------------------
   * !                                          CLEAR INPUT logic
   *   При нажатии на крестик нам нужно очищать инпут setSearchText(''), а затем оставлять фокус на инпуте.
   *   Если мы сделаем это через
   *   const input = document.querySelector("input");
   *   input.focus()
   *   То все будет работать, однако мы управляем состоянием инпута не через реакт, чего делать нельзя.
   *   Чтобы сделать это правильно, воспользуемся хуком useRef (const inputRef = useRef(), который
   *   возвращает ссылку на переменную или элемент (и она не меняется при ререндере). В нашем инпуте
   *   добавим ref=inputRef. И теперь сделаем фокус на инпуте inputRef.current.focus().
   *   Так же при очистке инпута, мы должны передать в стор пустой searchValue (сделаем это моментально
   *   без debounce)
   *------------------------------------------------------------------------------------------------**/
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    setSearchText('');
    //  const input = document.querySelector("input");
    //  input.focus()
    inputRef.current?.focus();
    dispatch(setSearchValue(''));
  };
  /*------------------------------------------ END OF CLEAR INPUT ------------------------------------------*/

  // console.log('searchValue', searchValue);

  return (
    <div className={s.search__div}>
      <input
        ref={inputRef}
        className={s.search__input}
        placeholder="поиск"
        onChange={onChangeInput}
        value={searchText /*searchValue*/}
      />
      {searchText && <BsXLg className={s.close__icon} onClick={() => clearInput()} />}
    </div>
  );
};
