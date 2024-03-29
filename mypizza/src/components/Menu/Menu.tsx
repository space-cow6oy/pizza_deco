import s from './Menu.module.scss';

import { Sort } from '../Sort/Sort';
import { Navigation } from '../Navigation/Navigation';
import { Search } from '../Search/Search';

export const Menu = (
  {
    // categoryId,
    // setCategoryId,
    // sortType,
    // setSortType,
    // sortTypes,
    // searchValue,
    // setSearchValue,
  },
) => {
  return (
    <div className={s.navigation}>
      <Navigation /*categoryId={categoryId} setCategoryId={setCategoryId}*/ />
      <Search /*searchValue={searchValue} setSearchValue={setSearchValue}*/ />
      <Sort /*sortType={sortType} setSortType={setSortType} sortTypes={sortTypes}*/ />
    </div>
  );
};
