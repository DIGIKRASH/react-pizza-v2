import React from "react";
import { useSelector } from "react-redux";

import {
  PizzaItem,
  LoadingPizzaItem,
  Sort,
  Categories,
  Pagination,
  Search,
} from "../components";
import { filtersSliceSelector } from "../redux/slices/filtersSlice";
import {
  fetchPizzas,
  pizzasSliceSelector,
  PizzaStatus,
} from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

function Home() {
  const dispatch = useAppDispatch();
  const { activeCategory, activeSortItem, currentPage, searchValue } =
    useSelector(filtersSliceSelector);
  const { items } = useSelector(pizzasSliceSelector);

  const getPizzas = async () => {
    try {
      dispatch(
        fetchPizzas({
          activeCategory,
          activeSortItem,
          currentPage,
          searchValue,
        })
      );
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Ошибка!");
      console.log("Ошибка при получении пицц");
      console.log(error);
    }
  };

  React.useEffect(() => {
    getPizzas();
  }, [activeCategory, activeSortItem, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <div className="content__header">
        <h2 className="content__title">Все пиццы</h2>
        <Search />
      </div>
      <div className="content__items">
        {PizzaStatus.LOADING
          ? items.map((obj: any) => <PizzaItem key={obj.id} {...obj} />)
          : Array(12)
              .fill(0)
              .map((_, index) => <LoadingPizzaItem key={index} />)}
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
